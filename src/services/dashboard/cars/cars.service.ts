import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	CarWanted,
	CarWantedAttendance,
	CarWantedChange,
} from "./cars.types.ts"

class CarsService {
	getWanted = async (params: GetParams = {}): Promise<Response<CarWanted>> => {
		const response = await api.get(`/wanted-cars`, { params })
		return response.data
	}

	getWantedAttendances = async (
		params: GetParams = {}
	): Promise<Response<CarWantedAttendance>> => {
		const response = await api.get(`/wanted-car/attendances`, { params })
		return response.data
	}

	getWantedById = async (
		id: ParamId
	): Promise<ResponseSingleData<CarWanted>> => {
		const response = await api.get(`/wanted-cars/${id}`)
		return response.data
	}

	createWanted = async (
		form: CarWantedChange
	): Promise<ResponseSingleData<CarWanted>> => {
		const response = await api.post(`/wanted-cars`, form)
		return response.data
	}

	editWanted = async (
		form: CarWantedChange
	): Promise<ResponseSingleData<CarWanted>> => {
		const response = await api.put(`/wanted-cars/${form.id}`, form)
		return response.data
	}

	deleteWanted = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/wanted-cars/${id}`)
		return response.data
	}
}

export const carsService = new CarsService()
