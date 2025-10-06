import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { cattleMarketsService } from "./cattle-markets.service.ts"

const useGetCattleMarketsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => cattleMarketsService.get(params),
		queryKey: ["cattle-markets", ...Object.values(params)],
	})
}

const useGetCattleMarketsPaymentsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => cattleMarketsService.getPayments(params),
		queryKey: ["cattle-markets", "payments", ...Object.values(params)],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 10_000
		},
	})
}

const useGetCattleMarketsAnimalsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => cattleMarketsService.getAnimals(params),
		queryKey: ["cattle-markets", "animals", ...Object.values(params)],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 10_000
		},
	})
}

const useGetCattleMarketsByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => cattleMarketsService.getById(id),
		queryKey: ["cattle-markets", id],
		enabled: !!id,
	})
}

const useCreateCattleMarketsMutation = () => {
	return useCrudMutation({
		mutationFn: cattleMarketsService.create,
		invalidate: {
			queryKey: ["cattle-markets"],
		},
	})
}

const useEditCattleMarketsMutation = () => {
	return useCrudMutation({
		mutationFn: cattleMarketsService.edit,
		invalidate: {
			queryKey: ["cattle-markets"],
		},
	})
}

const useDeleteCattleMarketsMutation = () => {
	return useCrudMutation({
		mutationFn: cattleMarketsService.delete,
		invalidate: {
			queryKey: ["cattle-markets"],
		},
	})
}

export {
	useGetCattleMarketsQuery,
	useGetCattleMarketsPaymentsQuery,
	useGetCattleMarketsAnimalsQuery,
	useGetCattleMarketsByIdQuery,
	useCreateCattleMarketsMutation,
	useEditCattleMarketsMutation,
	useDeleteCattleMarketsMutation,
}
