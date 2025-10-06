import type {
	GetParams,
	ParamId,
	ResponseData,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type { Market } from "./markets.types.ts"

class MarketsService {
	get = async (params: GetParams = {}): Promise<ResponseData<Market>> => {
		const response = await api.get(`/markets`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Market>> => {
		const response = await api.get(`/markets/${id}`)
		return response.data
	}
}

export const marketsService = new MarketsService()
