import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	Payment,
	PaymentChange,
	PaymentReceiptChange,
} from "./payments.types.ts"

class PaymentsService {
	get = async (params: GetParams = {}): Promise<Response<Payment>> => {
		const response = await api.get(`/payments`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Payment>> => {
		const response = await api.get(`/payments/${id}`)
		return response.data
	}

	create = async (
		form: PaymentChange
	): Promise<ResponseSingleData<Payment>> => {
		const response = await api.post(`/payments`, form)
		return response.data
	}

	createReceipt = async (
		form: PaymentReceiptChange
	): Promise<ResponseSingleData<Payment>> => {
		const response = await api.post("/receipts", form)
		return response.data
	}

	edit = async (
		form: Record<string, unknown>
	): Promise<ResponseSingleData<Payment>> => {
		const response = await api.put(`/payments/${form.id}`, form)
		return response.data
	}

	delete = async (id: number): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/payments/${id}`)
		return response.data
	}

	deleteReceipt = async (id: number): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/receipts/${id}`)
		return response.data
	}
}

export const paymentsService = new PaymentsService()
