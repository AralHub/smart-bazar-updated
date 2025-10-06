import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { blocksService } from "./blocks.service.ts"

const useGetBlocksQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => blocksService.get(params),
		queryKey: ["blocks", ...Object.values(params)]
	})
}

const useGetBlocksByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => blocksService.getById(id),
		queryKey: ["blocks", id],
		enabled: !!id
	})
}

const useCreateBlocksMutation = () => {
	return useCrudMutation({
		mutationFn: blocksService.create,
		invalidate: {
			queryKey: ["blocks"]
		}
	})
}

const useEditBlocksMutation = () => {
	return useCrudMutation({
		mutationFn: blocksService.edit,
		invalidate: {
			queryKey: ["blocks"]
		}
	})
}

const useDeleteBlocksMutation = () => {
	return useCrudMutation({
		mutationFn: blocksService.delete,
		invalidate: {
			queryKey: ["blocks"]
		}
	})
}

export {
	useGetBlocksQuery,
	useGetBlocksByIdQuery,
	useCreateBlocksMutation,
	useEditBlocksMutation,
	useDeleteBlocksMutation
}
