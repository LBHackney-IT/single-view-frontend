provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}
terraform {
  backend "s3" {
    bucket  = "terraform-state-corporate-staging"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/single-view-root-frontend/state"
  }
}
resource "aws_s3_bucket" "frontend-bucket-staging" {
  bucket = "lbh-single-view-root-frontend-staging.hackney.gov.uk"
  acl    = "private"
  force_destroy = true

  versioning {
    enabled = true
  }
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
module "cloudfront-staging" {
  source = "github.com/LBHackney-IT/aws-hackney-common-terraform.git//modules/cloudfront/s3_distribution"
  s3_domain_name = aws_s3_bucket.frontend-bucket-staging.bucket_regional_domain_name
  origin_id = "single-view-root-frontend"
  s3_bucket_arn = aws_s3_bucket.frontend-bucket-staging.arn
  s3_bucket_id = aws_s3_bucket.frontend-bucket-staging.id
  orginin_access_identity_desc = "Single view frontend cloudfront identity"
  cname_aliases = []
  # cname_aliases = ["single-view-staging.hackney.gov.uk"]
  environment_name = "staging"
  cost_code = "B0811"
  project_name = "Single View"
  hackney_cert_arn = "arn:aws:acm:us-east-1:163959497493:certificate/97f8d5f9-f0d7-47d9-b5b5-a28e55df3eba"
  use_cloudfront_cert = false
  compress = true
}
resource "aws_ssm_parameter" "cdn" {
  name  = "/single-view/staging/root-app-url"
  type  = "String"
  value = "https://${module.cloudfront-staging.cloudfront_domain_name}"
  overwrite = true
}
