import type {
	GetParams,
	ParamId,
	ResponseData,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type { District } from "./districts.types.ts"

class DistrictsService {
	get = async (params: GetParams = {}): Promise<ResponseData<District>> => {
		const response = await api.get(`/districts`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<District>> => {
		const response = await api.get(`/districts/${id}`)
		return response.data
	}
}

export const districtsService = new DistrictsService()
