import type { District } from "src/services/dashboard/districts"
import type { Market } from "src/services/dashboard/markets"
import type { ImageUrl } from "src/services/shared"

export type CattleMarket = {
	id: number
	name: string
	market_id: number
	market: Market
	district_id: number
	district: District
}

export type CattleMarketChange = {
	id?: number | string
	name: string
	district_id: number
}

export type CattleMarketPayment = {
	id: number
	map_id: null
	block_id: null
	place_id: null
	seller_id: null
	amount: number
	payment_method: number
	payment_method_name: string
	market_id: number
	market: Market
	from_date: string
	to_date: string
	category: number
	category_name: string
	items: CattlePaymentItem[]
	before_image: ImageUrl | null
	after_image: ImageUrl | null
	created_at: string
}

export type CattlePaymentItem = {
	id: number
	animal_id: number
	animal: Animal
	quantity: number
	amount: number
}

export type Animal = {
	id: number
	name: string
	price: number
	quantity_sum: number | string
	amount_sum: number | string
}
