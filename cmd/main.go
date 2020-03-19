package main

import (
	"github.com/go-chi/chi"
	"github.com/hashicorp/go-tfe"
	"log"
	"net/http"
	"tint/external/tint-data"
	"tint/internal/environment"
	"tint/internal/router"
)

func main() {
	env := environment.New()

	config := &tfe.Config{
		Address: env.TerraformUrl,
		Token: env.TerraformToken,
	}

	data, err := tint_data.Initialize(config)
	if err != nil {
		log.Fatal("Failed to load data, shutting down. ", err)
	}

	tint_data.Save(data)

	r := chi.NewRouter()
	r.Mount("/", router.FileServerRouter("/"))
	r.Mount("/analysis", router.AnalysisRouter(data))

	err = http.ListenAndServe(":80", r)
	if err != nil {
		log.Fatal("Tint failed to start: ", err)
	}
}
