import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	Employee,
	EmployeeChange,
	EmployeePayment,
} from "./employees.types.ts"

class EmployeesService {
	get = async (params: GetParams = {}): Promise<Response<Employee>> => {
		const response = await api.get(`/employees`, { params })
		return response.data
	}

	getPayment = async (
		params: GetParams = {}
	): Promise<Response<EmployeePayment>> => {
		const response = await api.get(`/payment/employees`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Employee>> => {
		const response = await api.get(`/employees/${id}`)
		return response.data
	}

	create = async (
		form: EmployeeChange
	): Promise<ResponseSingleData<Employee>> => {
		const response = await api.post(`/employees`, form)
		return response.data
	}

	edit = async (
		form: EmployeeChange
	): Promise<ResponseSingleData<Employee>> => {
		const response = await api.put(`/employees/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/employees/${id}`)
		return response.data
	}
}

export const employeesService = new EmployeesService()
