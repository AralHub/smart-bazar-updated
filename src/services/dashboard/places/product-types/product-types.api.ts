import type { GetParams, ParamId } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { productTypesService } from "./product-types.service.ts"

const useGetProductTypesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => productTypesService.get(params),
		queryKey: ["product-types", ...Object.values(params)]
	})
}

const useGetProductTypesByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => productTypesService.getById(id),
		queryKey: ["product-types", id],
		enabled: !!id
	})
}

export { useGetProductTypesQuery, useGetProductTypesByIdQuery }
