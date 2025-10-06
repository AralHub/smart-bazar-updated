import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { carParksService } from "./car-parks.service.ts"

const useGetCarParksQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => carParksService.get(params),
		queryKey: ["car-parks", ...Object.values(params)],
	})
}

const useGetCarParksDailyQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => carParksService.getDaily(params),
		queryKey: ["car-parks", "daily", ...Object.values(params)],
		enabled: !!params?.car_park_id,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 5000
		},
	})
}

const useGetCarParksAttendancesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => carParksService.getAttendances(params),
		queryKey: ["car-parks", "attendances", ...Object.values(params)],
		enabled: !!params?.car_park_id,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 5000
		},
	})
}

const useGetCarParksVehiclesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => carParksService.getVehicles(params),
		queryKey: ["car-parks", "vehicles", ...Object.values(params)],
		enabled: !!params?.car_park_id,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 5000
		},
	})
}

const useGetCarParksListAttendancesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => carParksService.getListAttendances(params),
		queryKey: ["car-parks", "list", ...Object.values(params)],
		enabled: !!params?.car_park_id && !!params?.date,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 5000
		},
	})
}

const useGetCarParksByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => carParksService.getById(id),
		queryKey: ["car-parks", "car-park", id],
		enabled: !!id,
	})
}

const useCreateCarParksMutation = () => {
	return useCrudMutation({
		mutationFn: carParksService.create,
		invalidate: {
			queryKey: ["car-parks"],
		},
	})
}

const useEditCarParksMutation = () => {
	return useCrudMutation({
		mutationFn: carParksService.edit,
		invalidate: {
			queryKey: ["car-parks"],
		},
	})
}

const useDeleteCarParksMutation = () => {
	return useCrudMutation({
		mutationFn: carParksService.delete,
		invalidate: {
			queryKey: ["car-parks"],
		},
	})
}

export {
	useGetCarParksQuery,
	useGetCarParksDailyQuery,
	useGetCarParksAttendancesQuery,
	useGetCarParksVehiclesQuery,
	useGetCarParksListAttendancesQuery,
	useGetCarParksByIdQuery,
	useCreateCarParksMutation,
	useEditCarParksMutation,
	useDeleteCarParksMutation,
}
