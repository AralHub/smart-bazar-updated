import type { Dayjs } from "dayjs"
import type { Employee } from "src/services/dashboard/employees"
import type { Market } from "src/services/dashboard/markets"
import type { ServiceType } from "src/services/dashboard/payments/service-types"
import type { Place } from "src/services/dashboard/places"
import type { Block } from "src/services/dashboard/places/blocks"
import type { PaymentType } from "./payment-types"

export type Payment = {
	id: number
	place_id: number
	place: Place
	block_id: number
	block: Block
	seller_id: number | null
	amount: number
	payment_method: number
	payment_method_name: string
	payment_type_id: number
	payment_type: PaymentType
	service_type_id: number | null
	service_type: ServiceType | null
	employee_id: number
	employee: Employee
	quantity: number
	market_id: number
	market: Market
	date: string
	created_at: string
	is_refund: boolean
}

export type PaymentChange = {
	id?: number
	place_id: number
	amount: number
	date: string | Dayjs
	quantity: number

	market_id?: number | string
	service_type_id: number
	payment_type_id: number
	block_id: number
	place_type_id: number
	product_type_id: number
}
