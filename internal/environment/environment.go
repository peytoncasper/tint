package environment

import (
	"log"
	"os"
)

type Env struct {
	TerraformUrl string `json:"terraform_url"`
	TerraformToken string `json:"terraform_token"`
}


func New() Env {
	var terraformURL string
	var terraformToken string

	if terraformURL = os.Getenv("TERRAFORM_URL"); terraformURL == "" {
		log.Fatal("Terraform URL not specified. Ensure that TERRAFORM_URL is set.")
	}

	if terraformToken = os.Getenv("TERRAFORM_TOKEN"); terraformToken == "" {
		log.Fatal("Terraform API Token not specified. Ensure that TERRAFORM_TOKEN is set.")
	}

	return Env{
		TerraformUrl:   terraformURL,
		TerraformToken: terraformToken,
	}
}