import { TOKEN } from "src/shared/constants"
import type { EChartsOption } from "src/shared/ui"

const series: {
	data: number[] | { value: number; itemStyle: { borderRadius: number[] } }[]
	type: "bar"
	barWidth: string
	name: string
}[] = [
	{
		data: Array.from({ length: 30 }).map(() => 0),
		type: "bar",
		barWidth: "50%",
		name: "Tusim summa",
	},
]
for (let i = 0; i < series.length; ++i) {
	const data = series[i].data
	for (let j = 0; j < series[i].data.length; ++j) {
		// const isStart = info.stackStart[j] === i;
		data[j] = {
			value: data[j] as number,
			itemStyle: {
				borderRadius: [TOKEN.borderRadiusSM, TOKEN.borderRadiusSM, 0, 0],
			},
		}
	}
}
export const paymentsByDaysOption: EChartsOption = {
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
		data: Array.from({ length: 30 }).map((_v, index) => index + 1),
	},
	yAxis: {
		type: "value",
	},
	series: series,
}
