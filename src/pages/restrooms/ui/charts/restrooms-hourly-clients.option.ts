import type { EChartsOption } from "src/shared/ui"

export const restroomsHourlyClientsOption: EChartsOption = {
	tooltip: {
		trigger: "axis",
	},
	grid: {
		top: "5%",
		left: "1%",
		right: "1%",
		bottom: "3%",
		containLabel: true,
	},
	xAxis: {
		type: "category",
		boundaryGap: false,
		data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	},
	yAxis: {
		type: "value",
	},
	series: [
		{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: "line",
			smooth: true,
		},
	],
}
