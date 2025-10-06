import type { StatisticsReportCarPark } from "src/services/statistics"
import type { EChartsOption } from "src/shared/ui"

export const getCarMarketsPaymentsOption = (
	data?: StatisticsReportCarPark[]
): EChartsOption => {
	return {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
		},
		grid: {
			left: "1%",
			right: "2%",
			bottom: "1%",
			top: "10%",
			containLabel: true,
		},
		xAxis: [
			{
				type: "category",
				data: data?.map((el) => el?.name),
				axisTick: {
					alignWithLabel: true,
				},
			},
		],
		yAxis: [
			{
				type: "value",
			},
		],
		series: [
			{
				name: "Systema summasi",
				type: "bar",
				barWidth: "30%",
				itemStyle: {
					borderRadius: [8, 8, 0, 0],
				},
				data: data?.map((el) => el.amount),
			},
			{
				name: "Bazardin summasi",
				type: "bar",
				barWidth: "30%",
				itemStyle: {
					borderRadius: [8, 8, 0, 0],
				},
				data: data?.map((el) => el.report_amount),
			},
		],
	}
}
