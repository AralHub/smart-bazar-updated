import { carsService } from "src/services/dashboard/cars/cars.service.ts"
import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"

const useGetCarsWantedQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => carsService.getWanted(params),
		queryKey: ["cars", "wanted", ...Object.values(params)],
	})
}

const useGetCarsWantedAttendancesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => carsService.getWantedAttendances(params),
		enabled: !!params?.car_park_id,
		queryKey: ["cars", "wanted", "attendances", ...Object.values(params)],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetCarsWantedByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => carsService.getWantedById(id),
		queryKey: ["cars", "wanted", "car", id],
		enabled: !!id,
	})
}

const useCreateCarsWantedMutation = () => {
	return useCrudMutation({
		mutationFn: carsService.createWanted,
		invalidate: {
			queryKey: ["cars"],
		},
		invalidates: [
			{
				queryKey: ["statistics", "car-parks"],
			},
		],
		onSuccessQueryClient: async (queryClient) => {
			await queryClient.refetchQueries({
				queryKey: ["statistics", "car-parks"],
			})
		},
		success: {
			description: "Mashin izleniwge jiberildi",
		},
	})
}

const useEditCarsWantedMutation = () => {
	return useCrudMutation({
		mutationFn: carsService.editWanted,
		invalidate: {
			queryKey: ["cars"],
		},
		success: {
			description: "Izleniwdegi mashin ozgerdi",
		},
	})
}

const useDeleteCarsWantedMutation = () => {
	return useCrudMutation({
		mutationFn: carsService.deleteWanted,
		invalidate: {
			queryKey: ["cars"],
		},
		invalidates: [
			{
				queryKey: ["statistics", "car-parks"],
			},
		],
		onSuccessQueryClient: async (queryClient) => {
			await queryClient.refetchQueries({
				queryKey: ["statistics", "car-parks"],
			})
		},
		success: {
			description: "Mashin izleniwden oshirildi",
		},
	})
}

export {
	useGetCarsWantedQuery,
	useGetCarsWantedAttendancesQuery,
	useGetCarsWantedByIdQuery,
	useCreateCarsWantedMutation,
	useEditCarsWantedMutation,
	useDeleteCarsWantedMutation,
}
