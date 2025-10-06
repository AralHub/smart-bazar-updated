import type { GetParams, ResponseData } from "src/services/shared"
import { api } from "src/shared/api"
import type { ServiceType } from "./service-types.types.ts"

class ServiceTypesService {
	get = async (params: GetParams): Promise<ResponseData<ServiceType>> => {
		const response = await api.get(`/service-types`, { params })
		return response.data
	}
}

export const serviceTypesService = new ServiceTypesService()
