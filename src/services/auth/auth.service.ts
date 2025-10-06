import type { QueryFunctionContext } from "@tanstack/react-query"
import type { ResponseSingleData } from "src/services/shared"
import { api } from "src/shared/api"
import type { LoginChange, LoginData, User } from "./auth.types"

class AuthService {
	getProfile = async (
		context: QueryFunctionContext
	): Promise<ResponseSingleData<User>> => {
		const response = await api.get(`/profile`, {
			signal: context.signal
		})
		return response.data
	}

	login = async (form: LoginChange): Promise<ResponseSingleData<LoginData>> => {
		const response = await api.post(`/auth/login`, form)
		return response.data
	}

	editProfile = async (
		form: Record<string, unknown>
	): Promise<ResponseSingleData<User>> => {
		const response = await api.patch(`/profile`, form)
		return response.data
	}

	logout = async (): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/auth/logout`)
		return response.data
	}
}

export const authService = new AuthService()
