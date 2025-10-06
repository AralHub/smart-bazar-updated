import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type { Place, PlaceChange } from "./places.types.ts"

class PlacesService {
	get = async (params: GetParams = {}): Promise<Response<Place>> => {
		const response = await api.get(`/places`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Place>> => {
		const response = await api.get(`/places/${id}`)
		return response.data
	}

	create = async (form: PlaceChange): Promise<ResponseSingleData<Place>> => {
		const response = await api.post(`/places`, form)
		return response.data
	}

	edit = async (form: PlaceChange): Promise<ResponseSingleData<Place>> => {
		const response = await api.put(`/places/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/places/${id}`)
		return response.data
	}
}

export const placesService = new PlacesService()
