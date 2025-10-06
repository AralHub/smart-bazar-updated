import type { GuestPayment } from "src/services/guest/guest.types.ts"
import type { ParamId, ResponseSingleData } from "src/services/shared"
import { classic } from "src/shared/api"

class GuestService {
	getPaymentsById = async (
		id: ParamId
	): Promise<ResponseSingleData<GuestPayment>> => {
		const response = await classic.get(`/guest/payments/${id}`)
		return response.data
	}
}

export const guestService = new GuestService()
