import type {
	GetParams,
	ParamId,
	ResponseData,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type { PlaceType } from "./place-types.types.ts"

class PlaceTypesService {
	get = async (params: GetParams = {}): Promise<ResponseData<PlaceType>> => {
		const response = await api.get(`/place-types`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<PlaceType>> => {
		const response = await api.get(`/place-types/${id}`)
		return response.data
	}
}

export const placeTypesService = new PlaceTypesService()
