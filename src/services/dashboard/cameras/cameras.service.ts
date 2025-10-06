import type { GetParams, ResponseData } from "src/services/shared"
import { api } from "src/shared/api"
import type { Camera } from "./cameras.types.ts"

class CamerasService {
	get = async (params: GetParams = {}): Promise<ResponseData<Camera>> => {
		const response = await api.get(`/cameras`, { params })
		return response.data
	}
}

export const camerasService = new CamerasService()
