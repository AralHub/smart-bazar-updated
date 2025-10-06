import type { StatisticPaymentByDate } from "src/services/statistics"

export const generateSplitAmount = (data?: StatisticPaymentByDate[]) => {
	if (!data) return []
	const withVehiclesAmount =
		data.filter((item) => item?.vehicles_amount !== undefined).length > 0
	const withRouteAmount =
		data.filter((item) => item?.route_vehicles_amount !== undefined).length > 0
	if (!(withVehiclesAmount && withRouteAmount)) return []

	return [
		data?.map((el) => el.vehicles_amount || 0),
		data?.map((el) => el.route_vehicles_amount || 0),
	]
}
