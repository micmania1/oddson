# Deployments

We're using terraform to provision AWS resources and a mix of terraform and AWS CLI commands to complete the deployment process.

## Deploying to production

When a commit is merged into master it will trigger a CircleCI build. The build will run unit/integration tests against each service, deploy a test environment and run end-to-end tests against it. Assuming the tests pass, then a production deployment will automatically be triggered.

## Deploying your own environment

If we make changes to terraform, then we will likely need to test them before merging into the master branch. Before you can deploy you'll need to do a few things:

* Create an AWS account and [configure it locally](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
* Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-macos.html)
* Install [Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html)
* Create a [Terraform Cloud](https://www.terraform.io/docs/cloud/index.html) account and set an organisation name

### Terraform

#### Setup

To setup Terraform you'll need to login to terraform cloud. You can do this by running `terraform login` from the deploy directory and it will guide you through the process.

Then you can initialise terraform locally using `terraform init -backend-config="organization=<your-organisation>"`.

#### State management

When you provision infrastructure, terraform will maintain a state file so that it knows which resources its managing. By default this will create a local state file, but since we're using CircleCI we need to persist the state file somewhere. For remote state storage we're using Terraform Cloud.

While this solves the CircleCI problem, it also protects you during development. If something goes wrong with your state file (eg. accidental deletion) then all of the created resources will become orphaned in the cloud. You'll need to go through and manually delete each resource, which means you need a solid understanding of what Terraform has created.

#### Workspaces

Terraform has a concept of workspaces which allows you to maintain separate state files. We use workspaces to distinguish between a test environment or a production environment. Each environment/workspace is a complete isolated build of the infrastrcture and application.

You will be given a default workspace out-of-the-box but you can also create a new workspace if you want to run multiple environments. All workspace names will be prefixed with `oddson_` in Terraform Cloud as defined in [provider.tf](provider.tf)

### Deploying

Since we've configured Terraform Cloud, the default action is to try and run `terraform apply` in the cloud environment. To configure this to run locally, which is required for us, login to Terraform cloud web interface and set your workspace execution mode to local. This can be done in Settings > General.

When you have everything setup you should able to deploy your own environment by running `./deploy.sh` from the `deply` directory.

This will run terraform as its primary command, but also some other actions to support it and complete the deployment. This is a high level view of what `./deploy.sh` will do:

* Create a production build of the API service - this is required prior to running terraform since terraform deploys this as a resource
* `terraform apply` - This will create the layout of the infrastructure (roles, database, api, web)
* Create a production build of the web service - this uses terraform outputs to configure production URLs in the build process
* Deploy web service to S3 using aws cli commands (aws s3 sync)
* Diplsplay Terraform outputs


## Destroying an environment

When you've finished with your environment you can run `terraform destroy`. The will completely destroy any resources which terraform has created.


## AWS Costs

You will incurr AWS costs for usage. This is normally a few cents (close to free) or a couple of dollars if you're doing anything heavy but might be more if you do anything... questionable.

## Domains

By default terraform is configured to create domains for oddson.dev. This will setup a hosted zone in Route53 and add DNS records for the web and API services. It will also provision SSL certificates using AWS Certificate Manager and setup the CNAME record for validation of the certificates in the Route53 zone.

The domain will be configured for each workspace meaning you will have multiple hosted zones named oddson.dev if you're using multiple workspaces. Each hosted zone has their own set of nameservers. This means that the hosted zone only becomes active when the oddson.dev domain is pointed at those nameservers, which is a manual task.

This allows is to completely reproduce production infrastructure.

### Domains for my environments

Although Route53 resources are created for oddson.dev per workspace, they're not actually used unless you point the domain at them.

Separate AWS domains are also provided and you can see those in the output of the `./deply.sh` command:

```
api_url = https://<cf-code>.execute-api.us-east-1.amazonaws.com/<environment_type>
website_url = https://<cf-code>.cloudfront.net
```


### Using a custom domain

If you want to set oddson up on your domain you can configure this through the existing terraform setup. To do this create a `terraform.tfvars` file inside the deploy folder with the following content:

```
domain="my-custom-domain.com"
```

You can optionally create a json version of the file at `terraform.tfvars.json`:

```
{
  "domain": "my-custom-domain.com"
}
```

These files are ignored from git. You can see a full list of configurable variables in [variables.tf](variables.tf).


## SSL Configuration

SSL certificates are configured through Terraform using AWS Certificate Manager. Like Let's Encrypt, it verifies the domain based on CNAME records. When it creates the certificates it will give you CNAME records to configure and then terraform will wait until these are validated.

SSL certificates are confgured per environment (or per workspace) which means you will have multiple AWS Certificate Manager resources for oddson.dev SSL certificates. Since we're using oddson.dev for all environments, it will attempt to validate CNAME records on that domain for oddsdon.dev, www.oddson.dev and api.oddson.dev. The CNAME records should always be the same regardless of who creates the certificate. oddson.dev already has the CNAME records added so these will be validated pretty quickly during this process.

### Custom domains

When setting up a domain for the first time Terraform will create the Route53 hosted zone for it and automatically configure the CNAME records. However, since the domain is not yet pointing to that hosted zone, the SSL validation will fail.

To allow the validation to succeed you will need to point the domain to the nameservers for that hosted zone while terraform is running, or manually setup this CNAME recrds on the existing domain so that the SSL verfication can succeed. SSL verification attempts to verify for 45 minutes before failing. If it fails, you can re-run terraform but this time the CNAME records will already be in place for verification.
