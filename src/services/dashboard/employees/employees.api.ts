import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { employeesService } from "./employees.service.ts"

const useGetEmployeesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => employeesService.get(params),
		queryKey: ["employees", ...Object.values(params)],
	})
}

const useGetEmployeesPaymentQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => employeesService.getPayment(params),
		queryKey: ["employees", "payment", ...Object.values(params)],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetEmployeesByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => employeesService.getById(id),
		queryKey: ["employees", "employee", id],
		enabled: !!id,
	})
}

const useCreateEmployeesMutation = () => {
	return useCrudMutation({
		mutationFn: employeesService.create,
		invalidate: {
			queryKey: ["employees"],
		},
	})
}

const useEditEmployeesMutation = () => {
	return useCrudMutation({
		mutationFn: employeesService.edit,
		invalidate: {
			queryKey: ["employees"],
		},
	})
}

const useDeleteEmployeesMutation = () => {
	return useCrudMutation({
		mutationFn: employeesService.delete,
		invalidate: {
			queryKey: ["employees"],
		},
	})
}

export {
	useGetEmployeesQuery,
	useGetEmployeesPaymentQuery,
	useGetEmployeesByIdQuery,
	useCreateEmployeesMutation,
	useEditEmployeesMutation,
	useDeleteEmployeesMutation,
}
