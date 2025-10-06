import type { Market } from "src/services/dashboard/markets"

export type LoginData = {
	user: User
	access_token: string
	token_type: string
}

export type LoginChange = {
	email: string
	phone: string
	password: string
	remember?: boolean
}

export type User = {
	id: number
	name: string
	phone: string | null
	market_id: number | null
	market: Market | null
	tin: string | null
	email: string
	role: number
	role_name: string
}

export type UserChange = {
	id?: number
	name: string
	email: string
	phone: string
	market_id?: number | null
	password?: string
}
