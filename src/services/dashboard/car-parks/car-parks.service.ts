import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	CarPark,
	CarParkAttendance,
	CarParkChange,
	CarParkDaily, CarParkListAttendances,
	CarParkVehicle,
} from "./car-parks.types.ts"

class CarParksService {
	get = async (params: GetParams = {}): Promise<Response<CarPark>> => {
		const response = await api.get(`/car-parks`, { params })
		return response.data
	}

	getDaily = async (
		params: GetParams = {}
	): Promise<ResponseSingleData<CarParkDaily>> => {
		const response = await api.get(`/car-park/statistic/daily`, { params })
		return response.data
	}

	getAttendances = async (
		params: GetParams = {}
	): Promise<Response<CarParkAttendance>> => {
		const response = await api.get(`/car-park/daily/attendances`, { params })
		return response.data
	}

	getVehicles = async (
		params: GetParams = {}
	): Promise<Response<CarParkVehicle>> => {
		const response = await api.get(`/car-park/daily/vehicles`, { params })
		return response.data
	}
	
	getListAttendances = async (params: GetParams = {}): Promise<ResponseSingleData<CarParkListAttendances>> => {
		const response = await api.get(`/car-park/list/attendances`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<CarPark>> => {
		const response = await api.get(`/car-parks/${id}`)
		return response.data
	}

	create = async (
		form: CarParkChange
	): Promise<ResponseSingleData<CarPark>> => {
		const response = await api.post(`/car-parks`, form)
		return response.data
	}

	edit = async (form: CarParkChange): Promise<ResponseSingleData<CarPark>> => {
		const response = await api.put(`/car-parks/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/car-parks/${id}`)
		return response.data
	}
}

export const carParksService = new CarParksService()
