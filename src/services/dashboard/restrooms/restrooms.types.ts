import type { Market } from "src/services/dashboard/markets"

export type Restroom = {
	id: number
	name: string
	market_id: number
	market: Market
	district_id: number
}

export type RestroomChange = {
	id?: number
	name: string
	market_id: number
}

export type RestroomInfo = {
	male: number
	female: number
	all_count: number
	sum_amount: number
}

export type RestroomAttendance = {
	id: number
	device_id: number
	date: string
	organization_id: number
	image_url: string
	score: number
	gender: "FEMALE" | "MALE"
}
