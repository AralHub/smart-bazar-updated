import type { GetParams } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { statisticsService } from "./statistics.service.ts"

const useGetStatisticsDashboardQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getDashboard(params),
		queryKey: ["statistics", "dashboard", ...Object.values(params)],
	})
}

const useGetStatisticsCarParksQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getCarParks(params),
		queryKey: ["statistics", "car-parks", ...Object.values(params)],
		enabled: !!params?.date,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsRestroomsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getRestrooms(params),
		queryKey: ["statistics", "restrooms", ...Object.values(params)],
		enabled: !!params?.date,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsGeneralQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getGeneral(params),
		queryKey: ["statistics", "general", ...Object.values(params)],
		enabled: !!params?.date,
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsPaymentsByDateQuery = (
	type: "annual" | "monthly" | "daily",
	params: GetParams = {}
) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getPaymentsByDate(type, params),
		queryKey: [
			"statistics",
			"payments",
			`by-${type}`,
			...Object.values(params),
		],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsCarParkPaymentsByDateQuery = (
	type: "annual" | "monthly" | "daily",
	params: GetParams = {}
) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getCarParkPaymentsByDate(type, params),
		queryKey: [
			"statistics",
			"car-parks",
			`by-${type}`,
			...Object.values(params),
		],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsRestroomPaymentsByDateQuery = (
	type: "annual" | "monthly" | "daily",
	params: GetParams = {}
) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getRestroomPaymentsByDate(type, params),
		queryKey: [
			"statistics",
			"restrooms",
			`by-${type}`,
			...Object.values(params),
		],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsOverallQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getOverall(params),
		queryKey: ["statistics", "overall", ...Object.values(params)],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsAnnualIncomeQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getAnnualIncome(params),
		queryKey: ["statistics", "annual-income", ...Object.values(params)],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsMonthlyIncomeQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getMonthlyIncome(params),
		queryKey: ["statistics", "monthly-income", ...Object.values(params)],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsGeneralAnnualIncomeQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getGeneralAnnualIncome(params),
		queryKey: [
			"statistics",
			"general",
			"annual-income",
			...Object.values(params),
		],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsGeneralMonthlyIncomeQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getGeneralMonthlyIncome(params),
		queryKey: [
			"statistics",
			"general",
			"monthly-income",
			...Object.values(params),
		],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useGetStatisticsGeneralComparisonQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => statisticsService.getGeneralComparison(params),
		queryKey: ["statistics", "general", "comparison", ...Object.values(params)],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 20_000
		},
	})
}

const useCreateReportCarParksMutation = () => {
	return useCrudMutation({
		mutationFn: statisticsService.createReportCarParks,
		invalidate: {
			queryKey: ["statistics", "car-parks"],
		},
		success: {
			description: "Summa kiritildi",
		},
	})
}

const useCreateReportRestroomsMutation = () => {
	return useCrudMutation({
		mutationFn: statisticsService.createReportRestrooms,
		invalidate: {
			queryKey: ["statistics", "restrooms"],
		},
		success: {
			description: "Summa kiritildi",
		},
	})
}

const useCreateReportGeneralsMonthlyIncomeMutation = () => {
	return useCrudMutation({
		mutationFn: statisticsService.createReportGeneralsMonthlyIncome,
		invalidate: {
			queryKey: ["statistics", "general"],
		},
		success: {
			description: "Summa kiritildi",
		},
	})
}

export {
	useGetStatisticsDashboardQuery,
	useGetStatisticsCarParksQuery,
	useGetStatisticsRestroomsQuery,
	useGetStatisticsGeneralQuery,
	useGetStatisticsOverallQuery,
	//
	useGetStatisticsPaymentsByDateQuery,
	useGetStatisticsCarParkPaymentsByDateQuery,
	useGetStatisticsRestroomPaymentsByDateQuery,
	//
	useGetStatisticsAnnualIncomeQuery,
	useGetStatisticsMonthlyIncomeQuery,
	//
	useGetStatisticsGeneralAnnualIncomeQuery,
	useGetStatisticsGeneralMonthlyIncomeQuery,
	useGetStatisticsGeneralComparisonQuery,
	//
	useCreateReportCarParksMutation,
	useCreateReportRestroomsMutation,
	useCreateReportGeneralsMonthlyIncomeMutation,
}
