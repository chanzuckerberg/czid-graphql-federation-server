locals {
  service_name = "${var.stack_name}-gql"
  health_check_path = "/"
  success_codes = "200-499"
  tags_string = "foo=bar,baz=asdf"
  ingress_name = "${local.deployment_stage}-gql-pathserver"
  secret  = jsondecode(nonsensitive(data.kubernetes_secret.integration_secret.data.integration_secret))
  subnets = local.secret["cloud_env"]["private_subnets"]
  vpc_id = local.secret["cloud_env"]["vpc_id"]
  existing_alb_arn = "arn:aws:elasticloadbalancing:us-west-2:732052188396:loadbalancer/app/czid-sandbox-web/fda7ce576a2adb3c"
  gql_arn = "arn:aws:elasticloadbalancing:us-west-2:732052188396:loadbalancer/app/k8s-czidstag-stagingg-c54ce9cf98/7805bc568cd12b60"
  labels = {
    app                            = local.service_name
    "app.kubernetes.io/name"       = var.stack_name
    "app.kubernetes.io/component"  = local.service_name
    "app.kubernetes.io/part-of"    = var.stack_name
    "app.kubernetes.io/managed-by" = "happy"
  }
  ingress_annotations = {
    "kubernetes.io/ingress.class"                    = "alb"
    "alb.ingress.kubernetes.io/backend-protocol"     = "HTTP"
    "alb.ingress.kubernetes.io/healthcheck-path"     = local.health_check_path
    "alb.ingress.kubernetes.io/healthcheck-protocol" = "HTTP"

    # This ALB is http-only but that's ok since it's only going to be accessible via an NLB
    "alb.ingress.kubernetes.io/listen-ports"         = jsonencode([{ HTTP = 80 }])
    "alb.ingress.kubernetes.io/scheme"               = "internal"

    "alb.ingress.kubernetes.io/subnets"                 = join(",", local.subnets)
    "alb.ingress.kubernetes.io/success-codes"           = local.success_codes
    "alb.ingress.kubernetes.io/tags"                    = local.tags_string
    "alb.ingress.kubernetes.io/target-group-attributes" = "deregistration_delay.timeout_seconds=60"
    "alb.ingress.kubernetes.io/target-type"             = "instance"
  }
}


resource "kubernetes_ingress_v1" "ingress" {
  metadata {
    name        = "${local.ingress_name}-alb"
    namespace   = local.k8s_namespace
    annotations = local.ingress_annotations
    labels      = local.labels
  }

  spec {
    rule {
      http {
        path {
          path = "/*"
          backend {
            service {
              name = local.service_name
              port {
                number = local.service_port
              }
            }
          }
        }
      }
    }
  }
}


resource "aws_lb" "gql_nlb" {
  name               = "${local.ingress_name}-nlb"
  internal           = true
  load_balancer_type = "network"
  subnets            = local.subnets

  enable_deletion_protection = false

  tags = {
    Environment = "production"
  }
}

# Create NLB target group that forwards traffic to alb
# https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_CreateTargetGroup.html
resource "aws_lb_target_group" "nlb_tg" {
    name         = "${local.ingress_name}-nlb-tg"
    port         = 80
    protocol     = "TCP"
    vpc_id       = local.vpc_id
    target_type  = "alb"
}

# Create target group attachment
# More details: https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_TargetDescription.html
# https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_RegisterTargets.html
resource "aws_lb_target_group_attachment" "nlb_tg_attachment" {
    target_group_arn = aws_lb_target_group.nlb_tg.arn
    # target_id        = kubernetes_ingress_v1.ingress.status[0].load_balancer[0].ingress[0].hostname
    # TODO, this is currently hardcoded and fragile. We may need to do something smarter to get the ALB ARN from k8s ingress.
    target_id        = local.gql_arn
    port             = 80
}
