import type { EChartsOption } from "src/shared/ui"

export const paymentsByYearOption: EChartsOption = {
	tooltip: {
		trigger: "axis",
		axisPointer: {
			type: "shadow",
		},
	},
	grid: {
		top: "5%",
		left: "2%",
		right: "0",
		bottom: "0",
		containLabel: true,
	},
	xAxis: {
		type: "category",
		data: ["2025"],
	},
	yAxis: {
		type: "value",
	},
	series: [
		{
			data: [0],
			type: "bar",
			barWidth: "50%",
			name: "Tusim summa",
		},
	],
}
