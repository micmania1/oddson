resource "aws_dynamodb_table" "oddson_challenges" {
    name = "oddson_challenges"
    billing_mode = "PROVISIONED"
    read_capacity = 5
    write_capacity = 5
    hash_key = "uuid"

    attribute {
        name = "uuid"
        type = "S"
    }
}
