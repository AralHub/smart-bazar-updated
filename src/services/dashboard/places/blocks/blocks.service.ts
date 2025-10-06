import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type { Block, BlockChange } from "./blocks.types.ts"

class BlocksService {
	get = async (params: GetParams = {}): Promise<Response<Block>> => {
		const response = await api.get(`/blocks`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Block>> => {
		const response = await api.get(`/blocks/${id}`)
		return response.data
	}

	create = async (form: BlockChange): Promise<ResponseSingleData<Block>> => {
		const response = await api.post(`/blocks`, form)
		return response.data
	}

	edit = async (form: BlockChange): Promise<ResponseSingleData<Block>> => {
		const response = await api.put(`/blocks/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/blocks/${id}`)
		return response.data
	}
}

export const blocksService = new BlocksService()
