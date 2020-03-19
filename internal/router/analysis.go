package router

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi"
	"log"
	"math"
	"net/http"
	"time"
	"tint/external/tint-data"
)

type Success struct {
	Data interface{} `json:"data"`
}

func AnalysisRouter(data []*tint_data.Record) http.Handler {
	r := chi.NewRouter()

	r.Get("/providerBreakdown", func(w http.ResponseWriter, r *http.Request) {
		providerBreakdown(w, r, data)
	})
	r.Get("/workspaceBreakdown", func(w http.ResponseWriter, r *http.Request) {
		workspaceBreakdown(w, r, data)
	})
	r.Get("/organizationBreakdown", func(w http.ResponseWriter, r *http.Request) {
		organizationBreakdown(w, r, data)
	})
	r.Get("/costTrend", func(w http.ResponseWriter, r *http.Request) {
		costTrend(w, r, data)
	})
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		records(w, r, data)
	})

	return r
}

func providerBreakdown(w http.ResponseWriter, r *http.Request, data []*tint_data.Record) {
	breakdown := make(map[string]float64)

	for _, record := range data {
		for k, v := range record.ProviderCostBreakdown {
			breakdown[k] = breakdown[k] + v.TotalCost
		}
	}

	bodyString, err := json.Marshal(breakdown)
	if err != nil {
		log.Print("Error marshaling response: ", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, err = w.Write(bodyString)
}

func workspaceBreakdown(w http.ResponseWriter, r *http.Request, data []*tint_data.Record) {
	breakdown := make(map[string]float64)

	for _, record := range data {
		for k, v := range record.ProviderCostBreakdown {
			breakdown[record.WorkspaceName] = breakdown[k] + v.TotalCost
		}
	}

	bodyString, err := json.Marshal(breakdown)
	if err != nil {
		log.Print("Error marshaling response: ", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, err = w.Write(bodyString)
}

func organizationBreakdown(w http.ResponseWriter, r *http.Request, data []*tint_data.Record) {
	breakdown := make(map[string]float64)

	for _, record := range data {
		for k, v := range record.ProviderCostBreakdown {
			breakdown[record.OrganizationName] = breakdown[k] + v.TotalCost
		}
	}

	bodyString, err := json.Marshal(breakdown)
	if err != nil {
		log.Print("Error marshaling response: ", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, err = w.Write(bodyString)
}

func costTrend(w http.ResponseWriter, r *http.Request, data []*tint_data.Record) {
	trendData := make(map[string]float64)

	var currentDay time.Time
	for _, record := range data {
		totalCost := 0.0
		for _, provider := range record.ProviderCostBreakdown {
			totalCost += provider.TotalCost
		}

		if currentDay.IsZero() {
			currentDay = record.StartTime
		} else {
			diff := math.Floor(record.StartTime.Sub(currentDay).Hours() / 24)
			for i := 0.0; i <= diff; i++ {
				currentDay = currentDay.Add(24 * time.Hour)
				trendData[fmt.Sprintf("%d-%d-%d", currentDay.Year(), currentDay.Month(), currentDay.Day())] = 0.0
			}
		}
		trendData[fmt.Sprintf("%d-%d-%d", currentDay.Year(), currentDay.Month(), currentDay.Day())] = totalCost
	}


	bodyString, err := json.Marshal(trendData)
	if err != nil {
		log.Print("Error marshaling response: ", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, err = w.Write(bodyString)
}

func records(w http.ResponseWriter, r *http.Request, data []*tint_data.Record) {
	bodyString, err := json.Marshal(data)
	if err != nil {
		log.Print("Error marshaling response: ", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, err = w.Write(bodyString)
}