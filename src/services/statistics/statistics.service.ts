import type {
	GetParams,
	ResponseData,
	ResponseSingleData,
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	ReportCarParkChange,
	ReportRestroomChange,
	StatisticAnnualIncome,
	StatisticGeneral,
	StatisticGeneralAnnualIncome,
	StatisticGeneralComparison,
	StatisticGeneralMonthlyIncome,
	StatisticOverall,
	StatisticPaymentByDate,
	StatisticReportChange,
	StatisticsCarParks,
	StatisticsDashboard,
	StatisticsRestrooms,
} from "./statistics.types.ts"

class StatisticsService {
	getDashboard = async (
		params: GetParams = {}
	): Promise<ResponseSingleData<StatisticsDashboard>> => {
		const response = await api.get(`/statistic/dashboard`, { params })
		return response.data
	}

	getCarParks = async (
		params: GetParams = {}
	): Promise<ResponseSingleData<StatisticsCarParks>> => {
		const response = await api.get(`/statistic/car-parks/daily`, { params })
		return response.data
	}

	getRestrooms = async (
		params: GetParams = {}
	): Promise<ResponseSingleData<StatisticsRestrooms>> => {
		const response = await api.get(`/statistic/restrooms/daily`, { params })
		return response.data
	}

	getGeneral = async (
		params: GetParams = {}
	): Promise<ResponseSingleData<StatisticGeneral>> => {
		const response = await api.get(`/statistic/general/daily/income`, {
			params,
		})
		return response.data
	}

	getPaymentsByDate = async (
		type: "annual" | "monthly" | "daily",
		params: GetParams = {}
	): Promise<ResponseData<StatisticPaymentByDate>> => {
		const response = await api.get(`/statistic/payment/${type}/report`, {
			params,
		})
		return response.data
	}

	getCarParkPaymentsByDate = async (
		type: "annual" | "monthly" | "daily",
		params: GetParams = {}
	): Promise<ResponseData<StatisticPaymentByDate>> => {
		const response = await api.get(`/statistic/car-park/${type}/report`, {
			params,
		})
		return response.data
	}

	getRestroomPaymentsByDate = async (
		type: "annual" | "monthly" | "daily",
		params: GetParams = {}
	): Promise<ResponseData<StatisticPaymentByDate>> => {
		const response = await api.get(`/statistic/restroom/${type}/report`, {
			params,
		})
		return response.data
	}

	getOverall = async (
		params: GetParams = {}
	): Promise<ResponseData<StatisticOverall>> => {
		const response = await api.get(`/statistic/overall`, {
			params,
		})
		return response.data
	}

	getAnnualIncome = async (
		params: GetParams = {}
	): Promise<ResponseData<StatisticAnnualIncome>> => {
		const response = await api.get(`/statistic/annual-income`, {
			params,
		})
		return response.data
	}

	getMonthlyIncome = async (
		params: GetParams = {}
	): Promise<ResponseData<StatisticAnnualIncome>> => {
		const response = await api.get(`/statistic/daily-income`, {
			params,
		})
		return response.data
	}

	getGeneralAnnualIncome = async (
		params: GetParams = {}
	): Promise<ResponseData<StatisticGeneralAnnualIncome>> => {
		const response = await api.get(`/statistic/general/annual-income`, {
			params,
		})
		return response.data
	}

	getGeneralMonthlyIncome = async (
		params: GetParams = {}
	): Promise<ResponseData<StatisticGeneralMonthlyIncome>> => {
		const response = await api.get(`/statistic/general/monthly/income`, {
			params,
		})
		return response.data
	}

	getGeneralComparison = async (
		params: GetParams = {}
	): Promise<ResponseData<StatisticGeneralComparison>> => {
		const response = await api.get(`/statistic/general/comparison`, {
			params,
		})
		return response.data
	}

	createReportCarParks = async (
		form: ReportCarParkChange
	): Promise<ResponseSingleData<StatisticsCarParks>> => {
		const response = await api.post(`/statistic/car-parks/report`, form)
		return response.data
	}

	createReportRestrooms = async (
		form: ReportRestroomChange
	): Promise<ResponseSingleData<StatisticsRestrooms>> => {
		const response = await api.post(`/statistic/restrooms/report`, form)
		return response.data
	}

	createReportGeneralsMonthlyIncome = async (
		form: StatisticReportChange
	): Promise<ResponseSingleData<StatisticGeneralAnnualIncome>> => {
		const response = await api.post(`/statistic/reports`, form)
		return response.data
	}
}

export const statisticsService = new StatisticsService()
