import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { placesService } from "./places.service.ts"

const useGetPlacesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => placesService.get(params),
		queryKey: ["places", ...Object.values(params)],
	})
}

const useGetPlacesByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => placesService.getById(id),
		queryKey: ["places", id],
		enabled: !!id,
	})
}

const useCreatePlacesMutation = () => {
	return useCrudMutation({
		mutationFn: placesService.create,
		invalidate: {
			queryKey: ["places"],
		},
		invalidates: [
			{
				queryKey: ["scheme", "places"],
			},
		],
	})
}

const useEditPlacesMutation = () => {
	return useCrudMutation({
		mutationFn: placesService.edit,
		invalidate: {
			queryKey: ["places"],
		},
		onSuccessQueryClient: (queryClient, place) => {
			queryClient.refetchQueries({
				queryKey: ["places"],
			})
			queryClient.refetchQueries({
				queryKey: ["places", place?.data?.id],
			})
			queryClient.refetchQueries({
				queryKey: ["scheme", "places"],
			})
		},
		success: {
			description: "",
		},
	})
}

const useDeletePlacesMutation = () => {
	return useCrudMutation({
		mutationFn: placesService.delete,
		invalidate: {
			queryKey: ["places"],
		},
		invalidates: [
			{
				queryKey: ["scheme", "places"],
			},
		],
		success: {
			description: "",
		},
	})
}

export {
	useGetPlacesQuery,
	useGetPlacesByIdQuery,
	useCreatePlacesMutation,
	useEditPlacesMutation,
	useDeletePlacesMutation,
}
