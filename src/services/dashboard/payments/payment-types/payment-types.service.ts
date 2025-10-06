import type { GetParams, ResponseData } from "src/services/shared"
import { api } from "src/shared/api"
import type { PaymentType } from "./payment-types.types.ts"

class PaymentTypesService {
	get = async (params: GetParams): Promise<ResponseData<PaymentType>> => {
		const response = await api.get(`/payment-types`, { params })
		return response.data
	}
}

export const paymentTypesService = new PaymentTypesService()
