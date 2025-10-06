import type { GetParams, ParamId } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { marketsService } from "./markets.service.ts"

const useGetMarketsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => marketsService.get(params),
		queryKey: ["markets", ...Object.values(params)],
	})
}

const useGetMarketsByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => marketsService.getById(id),
		queryKey: ["markets", "market", id],
		enabled: !!id,
	})
}

export { useGetMarketsQuery, useGetMarketsByIdQuery }
