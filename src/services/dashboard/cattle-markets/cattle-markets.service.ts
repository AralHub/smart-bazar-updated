import type {
	GetParams,
	ParamId,
	Response,
	ResponseData,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	Animal,
	CattleMarket,
	CattleMarketChange,
	CattleMarketPayment,
} from "./cattle-markets.types.ts"

class CattleMarketsService {
	get = async (params: GetParams = {}): Promise<Response<CattleMarket>> => {
		const response = await api.get(`/cattle-markets`, { params })
		return response.data
	}

	getPayments = async (
		params: GetParams = {}
	): Promise<Response<CattleMarketPayment>> => {
		const response = await api.get(`/cattle-market/payments`, { params })
		return response.data
	}

	getAnimals = async (
		params: GetParams = {}
	): Promise<ResponseData<Animal>> => {
		const response = await api.get(`/animals`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<CattleMarket>> => {
		const response = await api.get(`/cattle-markets/${id}`)
		return response.data
	}

	create = async (
		form: CattleMarketChange
	): Promise<ResponseSingleData<CattleMarket>> => {
		const response = await api.post(`/cattle-markets`, form)
		return response.data
	}

	edit = async (
		form: CattleMarketChange
	): Promise<ResponseSingleData<CattleMarket>> => {
		const response = await api.put(`/cattle-markets/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/cattle-markets/${id}`)
		return response.data
	}
}

export const cattleMarketsService = new CattleMarketsService()
