import type { EChartsOption } from "src/shared/ui"

const series: EChartsOption["series"] = [
	{
		data: [0, 0, 0, 0, 0, 0],
		type: "bar",
		name: "Summa",
	},
]

export const option: EChartsOption = {
	tooltip: {
		trigger: "axis",
		axisPointer: {
			type: "shadow",
		},
	},
	xAxis: {
		type: "category",
		data: [
			"Dukanlar",
			"Rastalar",
			"Jaymalar",
			"Basqa xizmetler",
			"Hájetxanalar",
			"Avto turar orınlar",
		],
	},
	grid: {
		top: "15%",
		left: "1%",
		bottom: 0,
		right: 0,
		containLabel: true,
	},
	yAxis: {
		type: "value",
	},
	series,
}
