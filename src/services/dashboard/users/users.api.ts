import type { GetParams, ParamId } from "src/services/shared"
import { usersService } from "./users.service"
import { useCrudMutation, useCrudQuery } from "src/shared/api"

const useGetUsersQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => usersService.get(params),
		queryKey: ["users", ...Object.values(params)],
	})
}

const useGetUsersByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => usersService.getById(id),
		queryKey: ["users", "by-id", id],
		enabled: !!id,
	})
}

const useCreateUsersMutation = () => {
	return useCrudMutation({
		mutationFn: usersService.create,
		mutationKey: ["users", "create"],
		invalidate: {
			queryKey: ["users"],
		},
		success: {},
	})
}

const useEditUsersMutation = () => {
	return useCrudMutation({
		mutationFn: usersService.edit,
		mutationKey: ["users", "edit"],
		invalidate: {
			queryKey: ["users"],
		},
		success: {},
	})
}

const useDeleteUsersMutation = () => {
	return useCrudMutation({
		mutationFn: usersService.delete,
		mutationKey: ["users", "delete"],
		invalidate: {
			queryKey: ["users"],
		},
		success: {},
	})
}

export {
	useGetUsersQuery,
	useGetUsersByIdQuery,
	useCreateUsersMutation,
	useEditUsersMutation,
	useDeleteUsersMutation,
}
