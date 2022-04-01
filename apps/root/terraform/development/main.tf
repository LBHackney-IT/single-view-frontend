provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}
terraform {
  backend "s3" {
    bucket  = "terraform-state-corporate-development"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/single-view-root-frontend/state"
  }
}
resource "aws_s3_bucket" "frontend-bucket-development" {
  bucket = "lbh-single-view-root-frontend-development.hackney.gov.uk"
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
module "cloudfront-development" {
  source = "github.com/LBHackney-IT/aws-hackney-common-terraform.git//modules/cloudfront/s3_distribution"
  s3_domain_name = aws_s3_bucket.frontend-bucket-development.bucket_regional_domain_name
  origin_id = "single-view-root-frontend"
  s3_bucket_arn = aws_s3_bucket.frontend-bucket-development.arn
  s3_bucket_id = aws_s3_bucket.frontend-bucket-development.id
  orginin_access_identity_desc = "Single view root frontend cloudfront identity"
  cname_aliases = []
  # cname_aliases = ["single-view-development.hackney.gov.uk"]
  environment_name = "development"
  cost_code = "B0811"
  project_name = "Single View"
  hackney_cert_arn = "arn:aws:acm:us-east-1:467644390825:certificate/116f2c69-af89-46ac-9f2d-5d2db329f57a"
  use_cloudfront_cert = false
  compress = true
}
resource "aws_ssm_parameter" "cdn" {
  name  = "/single-view/development/root-app-url"
  type  = "String"
  value = "https://${module.cloudfront-development.cloudfront_domain_name}"
  overwrite = true
}
