import type {
	GetParams,
	ParamId,
	ResponseData,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type { Map, MapChange } from "./maps.types.ts"

class MapsService {
	get = async (params: GetParams): Promise<ResponseData<Map>> => {
		const response = await api.get(`/maps`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Map>> => {
		const response = await api.get(`/maps/${id}`)
		return response.data
	}

	create = async (form: MapChange): Promise<ResponseSingleData<Map>> => {
		const response = await api.post(`/maps`, form)
		return response.data
	}

	edit = async (form: MapChange): Promise<ResponseSingleData<Map>> => {
		const response = await api.put(`/maps/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/maps/${id}`)
		return response.data
	}
}

export const mapsService = new MapsService()
