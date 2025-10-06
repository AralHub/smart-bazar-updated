import { guestService } from "src/services/guest/guest.service.ts"
import type { ParamId } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"

const useGetGuestPaymentsByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => guestService.getPaymentsById(id),
		queryKey: ["guest", id],
		enabled: !!id,
	})
}

export { useGetGuestPaymentsByIdQuery }
