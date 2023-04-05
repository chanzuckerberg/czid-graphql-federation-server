variable "vpc_id" {
  type        = string
  description = "VPC ID for the K8s cluster"
}

variable "web_lb_name" {
  type        = string
  description = "Name of the ALB we're adding a path to"
}

variable "path_match" {
  type        = string
  description = "Path to intercept for this service (recommend /mypath*)"
}

variable "service_port" {
  type        = number
  description = "Port that the EKS service is listening on"
}

variable "stack_name" {
  type        = string
  description = "Stack name"
}

variable "health_check_path" {
  type        = string
  description = "Path for healthchecks"
}

variable "deployment_stage" {
  type        = string
  description = "Deployment stage for this stack"
}

variable "k8s_namespace" {
  type        = string
  description = "K8s namespace that our service is deployed to"
}

variable "k8s_service_name" {
  type        = string
  description = "Name of our eks service"
}
