import { mapsService } from "src/services/dashboard/places/maps/maps.service.ts"
import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"

const useGetMapsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => mapsService.get(params),
		queryKey: ["maps", ...Object.values(params)],
	})
}

const useGetMapsByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => mapsService.getById(id),
		queryKey: ["maps", id],
		enabled: !!id,
	})
}

const useCreateMapsMutation = () => {
	return useCrudMutation({
		mutationFn: mapsService.create,
		invalidate: {
			queryKey: ["maps"],
		},
	})
}

const useEditMapsMutation = () => {
	return useCrudMutation({
		mutationFn: mapsService.edit,
		invalidate: {
			queryKey: ["maps"],
		},
	})
}

const useDeleteMapsMutation = () => {
	return useCrudMutation({
		mutationFn: mapsService.delete,
		invalidate: {
			queryKey: ["maps"],
		},
	})
}

export {
	useGetMapsQuery,
	useGetMapsByIdQuery,
	useCreateMapsMutation,
	useEditMapsMutation,
	useDeleteMapsMutation,
}
