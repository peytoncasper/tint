<h1 align="center">Tint</h1>

<p align="center">
    <img align="center" src="assets/example.png" alt="example"/>
</p>


# Configuration

Tint requires two environment variables to be set which allow it to authenticate against a Terraform instance. 
The Terraform API Token can be obtained at a user level or at an organization level from within the Terraform Enterprise/Terraform Cloud UI.

1. `TERRAFORM_URL=https://app.terraform.io`
2. `TERRAFORM_TOKEN=token_goes_here`

# Installation

1. `npm run build`
2. `go install cmd/main.go`
3. `./main`

# Try it Out

Navigate to `http://localhost:80` in your browser. Note that it might take some time to finish indexing all of your Terraform Cost Estimation data.