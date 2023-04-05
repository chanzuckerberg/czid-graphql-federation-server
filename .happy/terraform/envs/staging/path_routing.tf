locals {
  secret  = jsondecode(nonsensitive(data.kubernetes_secret.integration_secret.data.integration_secret))
  vpc_id = local.secret["cloud_env"]["vpc_id"]
}

data "aws_lb" "web_lb" {
  name = local.web_lb_name
}

data "aws_lb_listener" "weblistener" {
  load_balancer_arn = data.aws_lb.web_lb.arn
  port              = 443
}

resource "aws_lb_target_group" "pathbased_targetgroup" {
  name     = "${local.deployment_stage}-pathgroup"
  port     = 80
  protocol = "HTTP"
  vpc_id   = local.vpc_id
  health_check {
    path = local.health_check_path
  }
}

resource "aws_lb_listener_rule" "graphqlfed" {
  listener_arn = data.aws_lb_listener.weblistener.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.pathbased_targetgroup.arn
  }

  condition {
    path_pattern {
      values = ["/graphqlfed*"]
    }
  }
}

resource "kubernetes_manifest" "target_group_binding" {
  manifest = {
    apiVersion = "elbv2.k8s.aws/v1beta1"
    kind       = "TargetGroupBinding"

    metadata = {
      name = "${var.stack_name}-pathgroup"
      namespace = local.k8s_namespace

    }

    spec = {
        ipAddressType = "ipv4"
        serviceRef = {
            name = "${var.stack_name}-${local.default_service_name}"
            port = local.service_port
        }
        targetGroupARN = aws_lb_target_group.pathbased_targetgroup.arn
        targetType = "instance"
        networking = {
          ingress = [{
            from = [
              {
                securityGroup = {
                  groupID = tolist(data.aws_lb.web_lb.security_groups)[0]
                }
              }
            ]
            ports = [{
              protocol = "TCP"
            }]
          }]
        }
    }
  }
}
