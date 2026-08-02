param(
  [string]$Region = "ap-southeast-1",
  [string]$StackName = "moof-website-static",
  [string]$GitHubOwner = "moroha29",
  [string]$GitHubRepository = "moof-website",
  [string]$GitHubBranch = "main"
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
  throw "AWS CLI is required. Install it and sign in before running this script."
}

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI is required so the script can configure repository variables."
}

aws sts get-caller-identity --no-cli-pager | Out-Null
if ($LASTEXITCODE -ne 0) {
  throw "AWS authentication failed. Run 'aws login' (or configure an AWS profile) and try again."
}

gh auth status | Out-Null
if ($LASTEXITCODE -ne 0) {
  throw "GitHub authentication failed. Run 'gh auth login -h github.com' and try again."
}

$providerArn = $null
$providers = aws iam list-open-id-connect-providers --output json | ConvertFrom-Json
foreach ($provider in $providers.OpenIDConnectProviderList) {
  $details = aws iam get-open-id-connect-provider `
    --open-id-connect-provider-arn $provider.Arn `
    --output json | ConvertFrom-Json

  if ($details.Url -eq "token.actions.githubusercontent.com") {
    $providerArn = $provider.Arn
    break
  }
}

$createProvider = if ($providerArn) { "false" } else { "true" }
$existingProviderArn = if ($providerArn) { $providerArn } else { "unused" }
$templatePath = Join-Path $PSScriptRoot "aws-static-site.yml"

Write-Host "Creating or updating AWS stack '$StackName' in '$Region'..."
aws cloudformation deploy `
  --template-file $templatePath `
  --stack-name $StackName `
  --region $Region `
  --capabilities CAPABILITY_IAM `
  --no-fail-on-empty-changeset `
  --parameter-overrides `
    "GitHubOwner=$GitHubOwner" `
    "GitHubRepository=$GitHubRepository" `
    "GitHubBranch=$GitHubBranch" `
    "CreateGitHubOidcProvider=$createProvider" `
    "ExistingGitHubOidcProviderArn=$existingProviderArn"

if ($LASTEXITCODE -ne 0) {
  throw "CloudFormation deployment failed."
}

$stack = aws cloudformation describe-stacks `
  --stack-name $StackName `
  --region $Region `
  --output json | ConvertFrom-Json

$outputs = @{}
foreach ($output in $stack.Stacks[0].Outputs) {
  $outputs[$output.OutputKey] = $output.OutputValue
}

$repository = "$GitHubOwner/$GitHubRepository"
$variables = @{
  AWS_ROLE_ARN = $outputs.AwsRoleArn
  AWS_REGION = $Region
  AWS_S3_BUCKET = $outputs.BucketName
  AWS_CLOUDFRONT_DISTRIBUTION_ID = $outputs.DistributionId
  AWS_SITE_URL = $outputs.SiteUrl
}

foreach ($entry in $variables.GetEnumerator()) {
  gh variable set $entry.Key --repo $repository --body $entry.Value
  if ($LASTEXITCODE -ne 0) {
    throw "Could not set GitHub repository variable $($entry.Key)."
  }
}

Write-Host ""
Write-Host "AWS hosting is ready at $($outputs.SiteUrl)"
Write-Host "In GitHub: Actions -> Deploy website -> Run workflow -> aws"
