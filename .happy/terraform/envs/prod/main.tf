locals {
  magic_stack_name  = "prod-stack"
  alb_name          = "czid-prod-web"
  deployment_stage  = "prod"
  service_type      = var.stack_name == local.magic_stack_name ? "TARGET_GROUP_ONLY" : "INTERNAL"
  routing_config    = {
    "INTERNAL" = {},
    "TARGET_GROUP_ONLY" = {
      path = "/graphqlfed*",
      alb = {
        name = local.alb_name,
        listener_port = 443,
      }
    }
  }
}


module "stack" {
  source           = "git@github.com:chanzuckerberg/happy//terraform/modules/happy-stack-eks?ref=main"
  image_tag        = var.image_tag
  image_tags       = jsondecode(var.image_tags)
  stack_name       = var.stack_name
  deployment_stage = local.deployment_stage
  stack_prefix     = "/${var.stack_name}"
  k8s_namespace    = var.k8s_namespace
  additional_env_vars = {
    API_URL = "https://czid.org"
  }
  services = {
    gql = merge(local.routing_config[local.service_type], {
      name              = "gql-federation"
      desired_count     = 1
      port              = "4444"
      memory            = "1500Mi"
      cpu               = "1500m"
      health_check_path = "/health"
      // INTERNAL - OIDC protected ALB
      // EXTERNAL - external ALB
      // PRIVATE - cluster IP only, no ALB at all
      // TARGET_GROUP_ONLY - Only create a target group for use with an existing ALB
      service_type          = local.service_type
      platform_architecture = "arm64"
    })
  }
  tasks = {
  }
}
