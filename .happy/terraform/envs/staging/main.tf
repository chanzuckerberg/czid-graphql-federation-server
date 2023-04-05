locals {
  k8s_namespace    = "czid-staging-happy-happy-env"
  deployment_stage = "staging"
  service_port = "4444"
  health_check_path = "/health"
  secret  = jsondecode(nonsensitive(data.kubernetes_secret.integration_secret.data.integration_secret))
}

module "stack" {
  source           = "git@github.com:chanzuckerberg/happy//terraform/modules/happy-stack-eks?ref=main"
  image_tag        = var.image_tag
  image_tags       = jsondecode(var.image_tags)
  stack_name       = var.stack_name
  deployment_stage = local.deployment_stage
  stack_prefix     = "/${var.stack_name}"
  k8s_namespace    = local.k8s_namespace
  additional_env_vars = {
    API_URL = "https://sandbox.czid.org"
  }
  services = {
    gql = {
      name              = "gql-federation",
      desired_count     = 1,
      port              = local.service_port,
      memory            = "1500Mi",
      cpu               = "1500m",
      health_check_path = local.health_check_path
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

module alb_path_routing {
  source = "./modules/alb_path_routing"
  stack_name = var.stack_name
  k8s_service_name = "${var.stack_name}-gql"
  k8s_namespace = local.k8s_namespace
  deployment_stage = local.deployment_stage
  health_check_path = local.health_check_path
  service_port = local.service_port
  path_match = "/graphqlfed*"
  web_lb_name = "czid-staging-web"
  vpc_id = local.secret["cloud_env"]["vpc_id"]
}
