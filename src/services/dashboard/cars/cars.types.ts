export type CarWanted = {
	id: number
	number: string
}

export type CarWantedChange = {
	id?: number
	number: string
}

export type CarWantedAttendance = {
	id: number
	vehicle_id: number
	parking_id: number
	number: string
	date_time: string
	date: string
	time: string
	folder: string | null
	filename: string
	direction: string
	created_at: string
	updated_at: string
	url: string
}
