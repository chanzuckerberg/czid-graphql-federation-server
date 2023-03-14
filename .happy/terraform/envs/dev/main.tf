module "stack" {
  source              = "git@github.com:chanzuckerberg/happy//terraform/modules/happy-stack-eks?ref=main"
  image_tag           = var.image_tag
  image_tags          = jsondecode(var.image_tags)
  stack_name          = var.stack_name
  deployment_stage    = "dev"
  stack_prefix        = "/${var.stack_name}"
  k8s_namespace       = "czid-dev-happy-happy-env"
  additional_env_vars = {
     API_URL = "http://dev.czid.org"
  }
  services = {
    gql = {
      name                = "gql-federation",
      desired_count       = 1,
      port                = 4444,
      memory              = "1500Mi"
      cpu                 = "1500m"
      health_check_path   = "/",
      service_type        = "INTERNAL"
      initial_delay_seconds = 60
      // INTERNAL - OIDC protected ALB
      // EXTERNAL - external ALB
      // PRIVATE - cluster IP only, no ALB at all
    }
  }
  tasks = {
  }
}
