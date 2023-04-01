locals {
  k8s_namespace    = "czid-staging-happy-happy-env"
  target_group_arn = "arn:aws:elasticloadbalancing:us-west-2:732052188396:targetgroup/testing-deleteme/303f245750c9948a"
}

module "stack" {
  source           = "git@github.com:chanzuckerberg/happy//terraform/modules/happy-stack-eks?ref=main"
  image_tag        = var.image_tag
  image_tags       = jsondecode(var.image_tags)
  stack_name       = var.stack_name
  deployment_stage = "staging"
  stack_prefix     = "/${var.stack_name}"
  k8s_namespace    = local.k8s_namespace
  additional_env_vars = {
    API_URL = "https://sandbox.czid.org"
  }
  services = {
    gql = {
      name              = "gql-federation",
      desired_count     = 1,
      port              = 4444,
      memory            = "1500Mi",
      cpu               = "1500m",
      health_check_path = "/health",
      // INTERNAL - OIDC protected ALB
      // EXTERNAL - external ALB
      // PRIVATE - cluster IP only, no ALB at all
      service_type      = "INTERNAL",
      platform_architecture = "amd64",
    }
  }
  tasks = {
  }
}

resource "kubernetes_manifest" "custom_target_group" {
  manifest = {
    apiVersion = "elbv2.k8s.aws/v1beta1"
    kind = "TargetGroupBinding"
    metadata = {
        name = "testtargetgroupstaging1"
        namespace = local.k8s_namespace
        labels = {
          "ingress.k8s.aws/stack" = "service-staging-stack-gql-testme"
        }
    }
    spec = {
        serviceRef = {
            name = "${var.stack_name}-gql"
            port = 4444
        }
        targetGroupARN = local.target_group_arn
    }
  }
}
