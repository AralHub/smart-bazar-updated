import type { GetParams, Response } from "src/services/shared"
import { api } from "src/shared/api"
import type { Image } from "./images.types.ts"

class ImagesService {
	get = async (params: GetParams = {}): Promise<Response<Image>> => {
		const response = await api.get(`/images`, { params })
		return response.data
	}
}

export const imagesService = new ImagesService()
