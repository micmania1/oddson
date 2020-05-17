variable "application_id" {
  default     = "oddson"
  type        = string
  description = "Used in AWS resource names so should include chars and underscores only."
}

variable "application_title" {
  default     = "Odds on"
  type        = string
  description = "The title of the application."
}

variable "environment_type" {
  default     = "default"
  type        = string
  description = "Used in AWS resourse names so should include chars and underscores only."
}

variable "aws_region" {
  default     = "us-east-1"
  type        = string
  description = "Which AWS region to host the application."
}

variable "aws_profile" {
  default     = "default"
  type        = string
  description = "Choose which profile used to perform terraform commands"
}

variable "domain" {
  type    = string
  default = "oddson.dev"
}

variable "web_domains" {
  type    = list(string)
  default = []
}

variable "api_domains" {
  type        = list(string)
  description = "The API domain must be unique within an AWS account. This domain must be a subdomain of the root domain variable."
  default     = []
}
