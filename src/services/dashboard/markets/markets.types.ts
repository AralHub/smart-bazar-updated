import type { District } from "src/services/dashboard/districts"

export type Market = {
	id: number
	name: string
	full_name: string
	district_id: number
	district: District
	address?: string
	bank_details: string
	phone?: string
	area: string
	specialty: number
	specialty_name: string
	header_name: string
	tin: string
	places_quantity?: number
	restrooms_count: number
	market_car_parks_count: number
	infra_places_count: number
	stall_places_count: number
	employees_count: number

	cattle_markets_count: number
	shoppingCarParks: number
}
