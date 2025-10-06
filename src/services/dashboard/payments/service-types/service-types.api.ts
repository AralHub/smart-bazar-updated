import type { GetParams } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { serviceTypesService } from "./service-types.service.ts"

const useGetServiceTypesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => serviceTypesService.get(params),
		queryKey: ["service-types", ...Object.values(params)],
	})
}

export { useGetServiceTypesQuery }
