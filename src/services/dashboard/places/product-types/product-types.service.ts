import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type { ProductType } from "./product-types.types.ts"

class ProductTypesService {
	get = async (params: GetParams = {}): Promise<Response<ProductType>> => {
		const response = await api.get(`/product-types`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<ProductType>> => {
		const response = await api.get(`/product-types/${id}`)
		return response.data
	}
}

export const productTypesService = new ProductTypesService()
