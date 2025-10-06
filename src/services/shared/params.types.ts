export type GetParams = {
	page?: number
	per_page?: number
	search?: string
	date?: string
	district_id?: number | string
	market_id?: number | string
	place_type_id?: number | string
	place_id?: number | string
	block_id?: number | string
	map_id?: number | string
	product_type_id?: number | string
	car_park_id?: number | string
	restroom_id?: number | string
	type?: number | string
	camera_id?: number | string
	specialty?: number | string
	number?: number | string
	cattle_market_id?: number | string
	from_date?: string
	to_date?: string
	payment_type_id?: number | string
	service_type_id?: number
	employee_id?: number | string
	
	date_first?: string
	date_second?: string
}

export type ParamId = number | string | null | undefined
