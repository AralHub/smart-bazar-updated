import type { User, UserChange } from "src/services/auth"
import type { GetParams, ParamId, Response, ResponseSingleData } from "src/services/shared"
import { api } from "src/shared/api"

class UsersService {
	get = async (params: GetParams = {}): Promise<Response<User>> => {
		const response = await api.get(`/users`, { params })
		return response.data
	}
	
	getById = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.get(`/users/${id}`)
		return response.data
	}
	
	create = async (form: UserChange): Promise<ResponseSingleData<void>> => {
	const response = await api.post(`/users`, form)
	return response.data
	}
	
	edit = async (form: UserChange): Promise<ResponseSingleData<void>> => {
		const response = await api.put(`/users/${form.id}`, form)
		return response.data
	}
	
	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/users/${id}`)
		return response.data
	}
}

export const usersService = new UsersService()
