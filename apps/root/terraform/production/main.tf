provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}
terraform {
  backend "s3" {
    bucket  = "terraform-state-disaster-recovery"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/single-view-root-frontend/state"
  }
}
resource "aws_s3_bucket" "frontend-bucket-production" {
  bucket = "lbh-single-view-root-frontend-dr-testing.hackney.gov.uk"
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
module "cloudfront-production" {
  source = "github.com/LBHackney-IT/aws-hackney-common-terraform.git//modules/cloudfront/s3_distribution"
  s3_domain_name = aws_s3_bucket.frontend-bucket-production.bucket_regional_domain_name
  origin_id = "single-view-root-frontend"
  s3_bucket_arn = aws_s3_bucket.frontend-bucket-production.arn
  s3_bucket_id = aws_s3_bucket.frontend-bucket-production.id
  orginin_access_identity_desc = "Single View root frontend cloudfront identity"
  cname_aliases = ['single-view.hackney.gov.uk'] # add alias in
  environment_name = "production"
  cost_code = "B0811"
  project_name = "Single View"
  use_cloudfront_cert = false
  hackney_cert_arn = "arn:aws:acm:us-east-1:851725205572:certificate/5d6ef76b-51f3-4c68-ad64-f8c82e16f194"
  compress = true
}
resource "aws_ssm_parameter" "cdn" {
  name  = "/single-view/production/root-app-url"
  type  = "String"
  value = "https://${module.cloudfront-production.cloudfront_domain_name}"
  overwrite = true
}
