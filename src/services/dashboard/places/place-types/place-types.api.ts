import type { GetParams, ParamId } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { placeTypesService } from "./place-types.service.ts"

const useGetPlaceTypesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => placeTypesService.get(params),
		queryKey: ["place-types", ...Object.values(params)]
	})
}

const useGetPlaceTypesByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => placeTypesService.getById(id),
		queryKey: ["place-types", id],
		enabled: !!id
	})
}

export { useGetPlaceTypesQuery, useGetPlaceTypesByIdQuery }
