export type Map = {
	id: number
	name: string
	market_id: number
}

export type MapChange = {
	id?: number | string
	name: string
	market_id: number | string
}
