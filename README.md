<h1 align="center">Tint</h1>

<p align="center">
    <img align="center" src="assets/example.png" alt="example"/>
</p>

# What is Tint?

Its like Mint but for Terraform.

The primary goal of this project was to iterate and aggregate all of the available Organizations, Workspaces, and corresponding Runs that have been applied. Once this data is aggregated, Tint calculates the length of time those resources have been running, the total cost for each provider and dumps this data to disk in a CSV format.

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

Navigate to `http://localhost:80` in your browser. 

*Note that it might take some time to finish downloading all of your Terraform Cost Estimation data.

# Development

### Start the Frontend in Dev mode
`npm run start`

### Start the Backend
`go run cmd/main.go`
