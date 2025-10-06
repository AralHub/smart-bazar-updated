import type { GetParams } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { paymentTypesService } from "./payment-types.service.ts"

const useGetPaymentTypesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => paymentTypesService.get(params),
		queryKey: ["payment-types", ...Object.values(params)],
	})
}

export { useGetPaymentTypesQuery }
