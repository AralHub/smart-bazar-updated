import type { User } from "src/services/auth"
import type { Market } from "src/services/dashboard/markets"
import type { Block } from "./blocks"
import type { PlaceType } from "./place-types"
import type { ProductType } from "./product-types"

export type Place = {
	id: number
	market_id: number
	market: Market
	place_type_id: number
	place_type: PlaceType
	product_type_id: number
	product_type: ProductType
	seller_id: number
	seller: User
	block_id: number
	block: Block
	name: string
	latest_payment: LatestPayment
}

export type PlaceChange = {
	id?: number | string
	market_id?: number | string
	place_type_id?: number
	product_type_id?: number
	block_id?: number
	name: string
	is_rent: boolean
	price: number
}

export type LatestPayment = {
	id: number
	block_id: number
	place_id: number
	seller_id?: number
	amount: number
	payment_method: number
	payment_method_name: string
	payment_type_id: number
	service_type_id: number
	employee_id: number
	product_type_id: number
	employee: {
		id: number
		market_id: number
		position_id: number
		name: string
		phone: string
		address?: string
		birth_date: string
		pass_number?: number
		tin?: null
	}
	market_id: 1
	quantity?: number
	date: string
	category?: string
	category_name?: string
	created_at: string
}
