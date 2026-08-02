# Optional AWS deployment

The deployment workflow has a manual `deploy_target` dropdown:

- `github-pages` publishes to the existing GitHub Pages site.
- `aws` publishes the same static artifact to a private S3 bucket behind CloudFront.

Selecting a target changes where that workflow run publishes. It does not delete the other copy, so switching back is safe.

## One-time AWS setup

The AWS path uses GitHub OIDC. GitHub receives short-lived credentials for one narrowly scoped IAM role; no permanent AWS access keys are stored in GitHub.

1. Sign in with the AWS CLI:

   ```powershell
   aws login
   ```

2. From the repository root, run:

   ```powershell
   .\infra\setup-aws.ps1
   ```

   The default region is Singapore (`ap-southeast-1`). The script creates or updates the `moof-website-static` CloudFormation stack, detects an existing GitHub OIDC provider when present, and configures these GitHub repository variables:

   - `AWS_ROLE_ARN`
   - `AWS_REGION`
   - `AWS_S3_BUCKET`
   - `AWS_CLOUDFRONT_DISTRIBUTION_ID`
   - `AWS_SITE_URL`

3. Open **GitHub → Actions → Deploy website → Run workflow**, then select `aws`.

The first CloudFront deployment can take several minutes. The stack output and `AWS_SITE_URL` variable contain the generated `cloudfront.net` URL.

## Optional base path

AWS deploys at the root by default, so the designs are available at `/a/` through `/e/`. If the distribution must serve beneath a path, create an `AWS_BASE_PATH` repository variable such as `/moof-website` before building.

## Custom domain

The initial stack deliberately uses the free CloudFront domain and certificate. Connecting a custom domain also requires DNS records and an ACM certificate issued in `us-east-1`. Changing the deployment target does not change public DNS; point the desired domain at CloudFront only when AWS should receive production traffic.

## Cleanup

The S3 bucket is retained if the CloudFormation stack is deleted to protect deployed files. Empty and delete that bucket separately only when the AWS copy is no longer needed.
