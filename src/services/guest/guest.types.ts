import type { User } from "src/services/auth"
import type { Place } from "src/services/dashboard/places"

export type GuestPayment = {
	id: number
	place_id: number
	place: Place
	seller_id: number | null
	seller: User | null
	amount: number
	payment_method: number
	payment_method_name: string
	market_id: number
	from_date: string
	to_date: string
	created_at: string
}
