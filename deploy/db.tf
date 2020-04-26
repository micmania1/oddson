resource "aws_dynamodb_table" "table" {
    name = "${var.application_id}_${var.environment_type}"
    billing_mode = "PROVISIONED"
    read_capacity = 5
    write_capacity = 5
    hash_key = "uuid"

    attribute {
        name = "uuid"
        type = "S"
    }
}
