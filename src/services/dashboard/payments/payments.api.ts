import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { paymentsService } from "./payments.service.ts"

const useGetPaymentsQuery = (
	params: GetParams = {},
	options: { enabled?: boolean } = {}
) => {
	return useCrudQuery({
		queryFn: () => paymentsService.get(params),
		queryKey: ["payments", ...Object.values(params)],
		refetchInterval: 20_000,
		...options,
	})
}

const useGetPaymentsByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => paymentsService.getById(id),
		queryKey: ["payments", "payment", id],
		enabled: !!id,
	})
}

const useCreatePaymentsMutation = () => {
	return useCrudMutation({
		mutationFn: paymentsService.create,
		success: {
			description: "Tolendi",
		},
		invalidate: {
			queryKey: ["payments"],
		},
	})
}

const useEditPaymentsMutation = () => {
	return useCrudMutation({
		mutationFn: paymentsService.edit,
		invalidate: {
			queryKey: ["payments"],
		},
	})
}

const useDeletePaymentsMutation = () => {
	return useCrudMutation({
		mutationFn: paymentsService.delete,
		invalidate: {
			queryKey: ["payments"],
		},
	})
}

export {
	useGetPaymentsQuery,
	useGetPaymentsByIdQuery,
	useCreatePaymentsMutation,
	useEditPaymentsMutation,
	useDeletePaymentsMutation,
}
