import type { GetParams, ParamId } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { districtsService } from "./districts.service.ts"

const useGetDistrictsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => districtsService.get(params),
		queryKey: ["districts", ...Object.values(params)],
	})
}

const useGetDistrictsByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => districtsService.getById(id),
		queryKey: ["districts", "district", id],
		enabled: !!id,
	})
}

export { useGetDistrictsQuery, useGetDistrictsByIdQuery }
