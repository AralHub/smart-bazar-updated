import type { AxiosError } from "axios"

export type Response<T> = {
	data: T[]
	links: Links
	meta: Meta
	total?: number
}

export type ResponseData<T> = {
	data: T[]
}

export type ResponseSingleData<T> = {
	data: T
}

export type ResponseError = AxiosError<{
	message: string
}>

export type Links = {
	first: string
	last: string
	prev: string | null
	next: string | null
}

export type Meta = {
	current_page: number
	from: number
	last_page: number
	links: Link[]
	path: string
	per_page: number
	to: number
	total: number
}

export type Link = {
	url?: string
	label: string
	active: boolean
}
