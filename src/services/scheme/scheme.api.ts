import type { GetParams } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { schemeService } from "./scheme.service.ts"

const useGetSchemeRestroomsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => schemeService.getRestrooms(params),
		queryKey: ["scheme", "restrooms", ...Object.values(params)],
	})
}

const useGetSchemePlacesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => schemeService.getPlaces(params),
		queryKey: ["scheme", "places", ...Object.values(params)],
		enabled: !!params?.market_id,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 5000
		},
	})
}

const useGetSchemeBlocksQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => schemeService.getBlocks(params),
		queryKey: ["scheme", "blocks", ...Object.values(params)],
		enabled: !!params?.market_id,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 5000
		},
	})
}

const useCreateSchemePlacesMutation = () => {
	return useCrudMutation({
		mutationFn: schemeService.createPlaces,
		invalidate: {
			queryKey: ["scheme", "places"],
		},
	})
}

const useEditSchemePlacesMutation = () => {
	return useCrudMutation({
		mutationFn: schemeService.editPlaces,
		invalidate: {
			queryKey: ["scheme", "places"],
		},
	})
}

export {
	useGetSchemeRestroomsQuery,
	useGetSchemePlacesQuery,
	useCreateSchemePlacesMutation,
	useEditSchemePlacesMutation,
	useGetSchemeBlocksQuery,
}
