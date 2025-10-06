import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { positionsService } from "./positions.service.ts"

const useGetPositionsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => positionsService.get(params),
		queryKey: ["positions", ...Object.values(params)]
	})
}

const useGetPositionsByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => positionsService.getById(id),
		queryKey: ["positions", id],
		enabled: !!id
	})
}

const useCreatePositionsMutation = () => {
	return useCrudMutation({
		mutationFn: positionsService.create,
		invalidate: {
			queryKey: ["positions"]
		}
	})
}

const useEditPositionsMutation = () => {
	return useCrudMutation({
		mutationFn: positionsService.edit,
		invalidate: {
			queryKey: ["positions"]
		}
	})
}

const useDeletePositionsMutation = () => {
	return useCrudMutation({
		mutationFn: positionsService.delete,
		invalidate: {
			queryKey: ["positions"]
		}
	})
}

export {
	useGetPositionsQuery,
	useGetPositionsByIdQuery,
	useCreatePositionsMutation,
	useEditPositionsMutation,
	useDeletePositionsMutation
}
