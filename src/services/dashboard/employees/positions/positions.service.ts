import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type { Position, PositionChange } from "./positions.types.ts"

class PositionsService {
	get = async (params: GetParams = {}): Promise<Response<Position>> => {
		const response = await api.get(`/positions`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Position>> => {
		const response = await api.get(`/positions/${id}`)
		return response.data
	}

	create = async (
		form: PositionChange
	): Promise<ResponseSingleData<Position>> => {
		const response = await api.post(`/positions`, form)
		return response.data
	}

	edit = async (
		form: PositionChange
	): Promise<ResponseSingleData<Position>> => {
		const response = await api.put(`/positions/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/positions/${id}`)
		return response.data
	}
}

export const positionsService = new PositionsService()
