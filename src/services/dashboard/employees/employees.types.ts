import type { Market } from "src/services/dashboard/markets"
import type { Position } from "./positions"

export type Employee = {
	id: number
	market_id: number
	market: Market
	position_id: number
	position: Position
	name: string
	phone: string
	birth_date: string
	address: string
	pass_number: string
	tin: string
}

export type EmployeePayment = {
	id: number
	market_id: number
	market: Market
	position_id: number
	position: Position
	name: string
	phone: string
	birth_date: string
	address: string
	pass_number: string
	tin: string
	payments_count: number
	payments_sum_amount: number | string
}

export type EmployeeChange = {
	id?: number
	market_id?: number | string
	position_id: number
	name: string
	phone: string
}
