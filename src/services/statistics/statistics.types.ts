export type StatisticsDashboard = {
	markets_count: number
	farmer_markets_count: number
	shopping_malls_count: number
	cattle_markets_count: number
	market_car_parks_count: number
	shopping_car_parks_count: number
	employees_count: number
	restrooms_count: number
}

// car-parks
export type StatisticsCarParks = {
	car_parks_count: number
	total_amount: number
	total_vehicle_count: number
	wanted_cars_count: number
	car_parks: StatisticsCarPark[]
	report_car_parks: StatisticsReportCarPark[]
}

export type StatisticsCarPark = {
	id: number
	name: string
	market_id: number
	district_id: number
	type: 1 | 2
	vehicles_count: number | string
	attendances_count: number | string
	amount: number
}

export type StatisticsReportCarPark = {
	id: number
	name: string
	amount: number
	report_amount: number
}

export type ReportCarParkChange = {
	car_park_id: number
	date?: string
	amount: number
}

// restrooms
export type StatisticsRestrooms = {
	restrooms_count: number
	total_amount: number
	male_visits_count: number
	female_visits_count: number
	total_visits_count: number
	restrooms: StatisticsRestroom[]
	report_restrooms: StatisticsReportRestroom[]
}

export type StatisticsRestroom = {
	id: number
	name: string
	amount: number
	male_visits: number
	female_visits: number
	total_visits: number
}

export type StatisticsReportRestroom = {
	id: number
	name: string
	amount: number
	male_visits: number
	female_visits: number
	total_visits: number
	report_amount: number
}

export type ReportRestroomChange = {
	restroom_id: number
	date?: string
	amount: number
}

export type StatisticPaymentByDate = {
	name: number | string
	amount: number

	vehicles_count?: number
	vehicles_amount?: number
	route_vehicles_count?: number
	route_vehicles_amount?: number
}

export type StatisticOverall = {
	number: number
	name: string
	amount: number
}

export type StatisticAnnualIncome = {
	year?: string
	name: number | string
	market_id: string
	payment_types: StatisticAmount[]
	services: StatisticAmount[]
	car_parks: number
	restrooms: number
	total_amount: number
}

export type StatisticAmount = {
	id: number
	name: string
	payments_sum_amount: number | string | null
}

export type StatisticGeneralAnnualIncome = {
	year?: string
	market_name: number | string
	market_id: string
	payment_types: StatisticAmount[]
	services: StatisticAmount[]
	car_parks: number
	restrooms: number
	total_amount: number
}

export type StatisticGeneralMonthlyIncome = {
	id: number
	name: string
	district_id: number
	specialty: number
	specialty_name: string
	year: string
	months: {
		name: number
		amount: number
		report_amount: number
		diff_amount: number | null
		diff_percent: number | null
	}[]
	total_amount?: number
}

export type StatisticGeneral = {
	total_amount: number
	farmer_market_count: number
	shopping_mall_count: number
}

export type StatisticGeneralComparison = {
	market_id: number
	market_name: string
	months: StatisticComparisonMonth[]
}

export type StatisticComparisonMonth = {
	name: string
	is_date: boolean
	market_id: number | null
	market_name: string | null,
	payment_types: StatisticAmount[]
	services: StatisticAmount[]
	car_parks: number
	restrooms: number
	total_amount: number
}

export type StatisticReportChange = {
	market_id: number
	date: string
	amount: number
}
