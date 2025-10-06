import type { Market } from "src/services/dashboard/markets"

export type Block = {
	id: number
	name: string
	price: number | null
	places_count: number | null
	number_of_open_air_places: number | null
	market_id: number
	market: Market
}

export type BlockChange = {
	id?: number
	name: string
	market_id: number
}
