locals {
  deployment_stage        = "dev"
  service_port            = "4444"
  health_check_path       = "/health"
  secret                  = jsondecode(nonsensitive(data.kubernetes_secret.integration_secret.data.integration_secret))
  service_type            = var.stack_name == "sandbox-stack" ? "TARGET_GROUP_ONLY" : "INTERNAL"
  target_group_config     = {
    "INTERNAL" = {},
    "TARGET_GROUP_ONLY" = {
      path = "/graphqlfed",
      alb = {
        name = "czid-sandbox-web",
        listener_port = local.service_port,
      }
    }
  }
}

module "stack" {
  source           = "git@github.com:chanzuckerberg/happy//terraform/modules/happy-stack-eks?ref=jgadling/targetfixes"
  image_tag        = var.image_tag
  image_tags       = jsondecode(var.image_tags)
  stack_name       = var.stack_name
  deployment_stage = local.deployment_stage
  stack_prefix     = "/${var.stack_name}"
  k8s_namespace    = var.k8s_namespace
  additional_env_vars = {
    API_URL = "https://staging.czid.org"
  }
  services = {
    gql = merge(local.target_group_config[local.service_type], {
      name              = "gql-federation",
      aws_iam_policy_json = "{}" # Temp workaround for bug.
      desired_count     = 1,
      port              = local.service_port,
      memory            = "1500Mi",
      cpu               = "1500m",
      health_check_path = local.health_check_path
      // INTERNAL - OIDC protected ALB
      // EXTERNAL - external ALB
      // PRIVATE - cluster IP only, no ALB at all
      // TARGET_GROUP_ONLY - Only create a target group for use with an existing ALB
      service_type          = local.service_type
      platform_architecture = "amd64",
    })
  }
  tasks = {
  }
}

# If our stack name is "sandbox-stack" we want it to serve traffic for
# sandbox.czid.org/graphqlfed, so we need to give terraform some extra
# configuration info about how to do that. Otherwise, we just want to
# use a stack-name-gql.happy.sandbox.czid.org DNS name and ALB.
/*
module "alb_path_routing" {
  count             = var.stack_name != "sandbox-stack" ? 1 : 0
  source            = "./modules/alb_path_routing"
  stack_name        = var.stack_name
  k8s_service_name  = "${var.stack_name}-gql"
  k8s_namespace     = var.k8s_namespace
  deployment_stage  = local.deployment_stage
  health_check_path = local.health_check_path
  service_port      = local.service_port
  path_match        = "/graphqlfed*"
  web_lb_name       = "czid-sandbox-web"
  vpc_id            = local.secret["cloud_env"]["vpc_id"]
}
*/
