import type { Camera } from "src/services/dashboard/cameras"

export type Image = {
	id: number
	camera_id: number
	camera: Camera
	date_time: string
	date: string
	time: string
	filename: string
	direction: string
	folder: string
	url_path: string
}
