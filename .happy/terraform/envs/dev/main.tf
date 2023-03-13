module "stack" {
  source              = "git@github.com:chanzuckerberg/happy//terraform/modules/happy-stack-eks?ref=main"
  image_tag           = var.image_tag
  image_tags          = jsondecode(var.image_tags)
  stack_name          = var.stack_name
  deployment_stage    = "dev"
  stack_prefix        = "/${var.stack_name}"
  k8s_namespace       = "czid-dev-happy-happy-env"
  services = {
    czid = {
      name                = "gql-federation",
      desired_count       = 2,
      port                = 4444,
      memory              = "100Mi"
      cpu                 = "100m"
      health_check_path   = "/",
      service_type        = "PRIVATE"
    }
  }
  tasks = {
  }
}
