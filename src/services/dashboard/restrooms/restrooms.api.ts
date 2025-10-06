import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { restroomsService } from "./restrooms.service.ts"

const useGetRestroomsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => restroomsService.get(params),
		queryKey: ["restrooms", ...Object.values(params)],
	})
}

const useGetRestroomsInfoQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => restroomsService.getInfo(params),
		queryKey: ["restrooms", "info", ...Object.values(params)],
		enabled: !!params.restroom_id,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 5000
		},
	})
}

const useGetRestroomsAttendancesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => restroomsService.getAttendances(params),
		queryKey: ["restrooms", "attendances", ...Object.values(params)],
		enabled: !!params.restroom_id,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 5000
		},
	})
}

const useGetRestroomsByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => restroomsService.getById(id),
		queryKey: ["restrooms", id],
		enabled: !!id,
	})
}

const useCreateRestroomsMutation = () => {
	return useCrudMutation({
		mutationFn: restroomsService.create,
		invalidate: {
			queryKey: ["restrooms"],
		},
	})
}

const useEditRestroomsMutation = () => {
	return useCrudMutation({
		mutationFn: restroomsService.edit,
		invalidate: {
			queryKey: ["restrooms"],
		},
	})
}

const useDeleteRestroomsMutation = () => {
	return useCrudMutation({
		mutationFn: restroomsService.delete,
		invalidate: {
			queryKey: ["restrooms"],
		},
	})
}

export {
	useGetRestroomsQuery,
	useGetRestroomsInfoQuery,
	useGetRestroomsAttendancesQuery,
	useGetRestroomsByIdQuery,
	useCreateRestroomsMutation,
	useEditRestroomsMutation,
	useDeleteRestroomsMutation,
}
