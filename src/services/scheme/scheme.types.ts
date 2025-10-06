import type { User } from "src/services/auth"
import type { Block } from "src/services/dashboard/places/blocks"
import type { PlaceType } from "src/services/dashboard/places/place-types"

export type SchemeRestroom = {
	id: number
	name: string
	market_id: number
	position_x: number
	position_y: number
	width: number
	height: number
}

export type SchemePlace = {
	id: number
	market_id: number
	place_type_id?: number
	place_type?: PlaceType
	product_type_id?: number | null
	block_id: number
	block: Block
	name: string
	seller_id: number | null
	seller: User
	price: number | null
	payments_count: number
	payment: SchemePlacePayment | null
	payments_sum_amount: number | null
	month_payments_count: number
	is_payment_success: boolean
	area: string
	is_rent: boolean
}

export type SchemeBlock = {
	id: number
	name: string
	price: number | null
	market_id: number
	places_count: number
	number_of_open_air_places: number | null
	payments_count: number
	payments_sum_amount: number
	payments_sum_quantity: number
}

export type SchemePlacePayment = {
	id: number
	place_id: number
	seller_id: number | null
	amount: number
	payment_method: number
	payment_method_name: string
	market_id: number
	from_date: string
	to_date: string
}

export type SchemePlaceChange = {
	id?: number | string
	market_id?: number | string
	place_type_id?: number | string
	product_type_id?: number | string
	// block_id: number
	name: string
	position_x: number
	position_y: number
	width?: number
	height?: number
	rotation?: number
	// seller_id: any
}
