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
	url: string
	qr_code_url: string
	last_receipt: LastReceipt
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

interface LastReceipt {
	id: number
	receipt_category: number
	is_refund: number
	items: ReceiptItem[]
	received_cash: number
	received_card: number
	total_VAT: number
	time: string
	receipt_type: number
	location: {
		Latitude: number
		Longitude: number
	}
	terminal_id: string
	receipt_seq: number
	date_time: string
	fiscal_sign: string
	qr_code_url: string
	raw_response: string
}

interface ReceiptItem {
	VAT: number
	Name: string
	SPIC: string
	Other: number
	Price: number
	Amount: number
	Labels: any[]
	Barcode: string
	Voucher: number
	Discount: number
	GoodPrice: number
	OwnerType: number
	VATPercent: number
	PackageCode: string
	CommissionInfo: {
		TIN: string
	}
}
