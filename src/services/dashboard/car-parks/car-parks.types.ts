import type { Market } from "src/services/dashboard/markets"

export type CarPark = {
	id: number
	name: string
	type: 1 | 2
	type_name: string
	market_id: number
	market: Market
}

export type CarParkChange = {
	id?: number | string
	name: string
	market_id: number
}

export type CarParkDaily = {
	attendances_count: number
	vehicles_count: number
	total_amount: number
	attendances_count_by_time: unknown[]
}

export type CarParkListAttendances = {
	total: number
	attendances: CarParkAttendance[]
}

export type CarParkAttendance = {
	id: number
	vehicle_id: number
	parking_id: number
	number: string
	date_time: string
	date: string
	time: string
	filename: string
	folder: string
	direction: string
	created_at: string
	updated_at: string
	is_exception: number
	in_route_line: number
	url_path: string
	amount: number
}

export type CarParkVehicle = {
	id: number
	number: string
	is_exception: boolean
	in_route_line: boolean
	attendances_count: number
	oldest_attendance: CarParkAttendance
}
