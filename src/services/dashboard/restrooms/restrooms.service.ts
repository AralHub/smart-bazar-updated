import type {
	GetParams,
	ParamId,
	Response,
	ResponseData,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	Restroom,
	RestroomAttendance,
	RestroomChange,
	RestroomInfo,
} from "./restrooms.types.ts"

class RestroomsService {
	get = async (params: GetParams = {}): Promise<Response<Restroom>> => {
		const response = await api.get(`/restrooms`, { params })
		return response.data
	}

	getInfo = async (params: GetParams = {}): Promise<ResponseSingleData<RestroomInfo>> => {
		const response = await api.get(`/restroom/get-info`, { params })
		return response.data
	}

	getAttendances = async (
		params: GetParams = {}
	): Promise<ResponseData<RestroomAttendance>> => {
		const response = await api.get(`/restroom/get-last-attendances`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Restroom>> => {
		const response = await api.get(`/restrooms/${id}`)
		return response.data
	}

	create = async (
		form: RestroomChange
	): Promise<ResponseSingleData<Restroom>> => {
		const response = await api.post(`/restrooms`, form)
		return response.data
	}

	edit = async (
		form: RestroomChange
	): Promise<ResponseSingleData<Restroom>> => {
		const response = await api.put(`/restrooms/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/restrooms/${id}`)
		return response.data
	}
}

export const restroomsService = new RestroomsService()
