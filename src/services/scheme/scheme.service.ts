import type { GetParams, ResponseData } from "src/services/shared"
import { api } from "src/shared/api"
import type {
	SchemeBlock,
	SchemePlace,
	SchemePlaceChange,
	SchemeRestroom,
} from "./scheme.types.ts"

class SchemeService {
	getRestrooms = async (
		params: GetParams = {}
	): Promise<ResponseData<SchemeRestroom>> => {
		const response = await api.get(`/scheme/restrooms`, { params })
		return response.data
	}

	getPlaces = async (
		params: GetParams = {}
	): Promise<ResponseData<SchemePlace>> => {
		const response = await api.get(`/scheme/places`, { params })
		return response.data
	}

	getBlocks = async (
		params: GetParams = {}
	): Promise<ResponseData<SchemeBlock>> => {
		const response = await api.get(`/scheme/blocks`, {
			params: {
				...params,
				type: 4,
			},
		})
		return response.data
	}

	createPlaces = async (
		form: SchemePlaceChange[]
	): Promise<ResponseData<SchemePlace>> => {
		const response = await api.post(`/scheme/places`, {
			places: form,
		})
		return response.data
	}

	editPlaces = async (
		form: SchemePlaceChange[]
	): Promise<ResponseData<SchemePlace>> => {
		const response = await api.put(`/scheme/places`, {
			places: form,
		})
		return response.data
	}
}

export const schemeService = new SchemeService()
