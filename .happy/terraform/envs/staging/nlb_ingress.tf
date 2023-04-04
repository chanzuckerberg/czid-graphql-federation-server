locals {
  service_name = "${var.stack_name}-gql"
  health_check_path = "/"
  success_codes = "200-499"
  tags_string = "foo=bar,baz=asdf"
  ingress_name = "${local.deployment_stage}-gql-pathserver"
  secret  = jsondecode(nonsensitive(data.kubernetes_secret.integration_secret.data.integration_secret))
  subnets = local.secret["cloud_env"]["private_subnets"]
  vpc_id = local.secret["cloud_env"]["vpc_id"]
}

resource "aws_lb_target_group" "pathbased_targetgroup" {
  name     = "${local.deployment_stage}-pathgroup"
  port     = 80
  protocol = "HTTP"
  vpc_id   = local.vpc_id
  health_check = {
    path = "/health"
}

resource "kubernetes_manifest" "test-crd6" {
  manifest = {
    apiVersion = "elbv2.k8s.aws/v1beta1"
    kind       = "TargetGroupBinding"

    metadata = {
      name = "mytestbinding6"
      namespace = local.k8s_namespace

    }

    spec = {
        ipAddressType = "ipv4"
        serviceRef = {
            name = "staging-stack-gql"
            port = 4444
        }
        targetGroupARN = aws_lb_target_group.pathbased_targetgroup.arn
        targetType = "instance"
    }
  }
}
