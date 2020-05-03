variable "application_id" {
  default     = "oddson"
  type        = string
  description = "The applicaiton name used in various places. Used in AWS resource names so should include chars and underscores only."
}

variable "application_title" {
  default     = "Odds on"
  type        = string
  description = "Used for informational purposes only"
}

variable "environment_type" {
  default     = "prod"
  type        = string
  description = "The environment type used in various places. Used in AWS resourse names so should include chars and underscores only."
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
  default     = "oddson.dev"
  type        = string
  description = "Root level domain uses as a base for other domains (eg. api.oddson.dev)"
}
