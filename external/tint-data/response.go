package tint_data

type CostEstimateResponse struct {
	Data CostEstimationData `json:"data"`
}

type CostEstimationData struct {
	Id string `json:"id"`
	Type string `json:"type"`
	Attributes CostEstimateAttributes `json:"attributes"`
}

type CostEstimateAttributes struct {
	Resources CostEstimateResources `json:"resources"`
}

type CostEstimateResources struct {
	Matched []CostEstimateResource `json:"matched"`
}

type CostEstimateResource struct {
	HourlyCost float64 `json:"hourly-cost,string"`
	ProposedMonthlyCost float64 `json:"proposed-monthly-cost,string"`
	DeltaMonthlyCost float64 `json:"delta-monthly-cost,string"`
	Prices []CostEstimateResourcePrice `json:"prices"`
	Provider string `json:"provider"`
	Type string `json:"type"`
	PriorMonthlyCost float64 `json:"prior-monthly-cost,string"`
}

type CostEstimateResourcePrice struct {
	Description string `json:"description"`
	Sku string `json:"sku"`
	Unit string `json:"unit"`
	UnitPrice string `json:"unit-price"`
	CatalogHourlyPrice float64 `json:"catalog-hourly-price,string"`
	PriorMonthlyCost float64 `json:"prior-monthly-cost,string"`
	ProposedMonthlyCost float64 `json:"proposed-monthly-cost,string"`
	DeltaMonthlyCost float64 `json:"delta-monthly-cost,string"`
}

