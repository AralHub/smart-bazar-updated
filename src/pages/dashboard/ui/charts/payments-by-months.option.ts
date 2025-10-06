import dayjs from "dayjs"
import { TOKEN } from "src/shared/constants"
import type { EChartsOption } from "src/shared/ui"

const months = dayjs.localeData().monthsShort()
const fullMonths = dayjs.localeData().months()

const series: {
	data: number[] | { value: number; itemStyle: { borderRadius: number[] } }[]
	type: "bar"
	barWidth: string
	name: string
}[] = [
	{
		data: Array.from({ length: 12 }).map(() => 0),
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
				borderRadius: [TOKEN.borderRadius, TOKEN.borderRadius, 0, 0],
			},
		}
	}
}
export const paymentsByMonthsOption: EChartsOption = {
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
		data: Array.from({ length: months.length }).map((_v, index) => index + 1),
		axisLabel: {
			formatter: (_v, index) => months[index],
		},
		axisPointer: {
			label: {
				formatter: (params) => fullMonths[Number(params.value) - 1],
			},
		},
	},
	yAxis: {
		type: "value",
	},
	series: series,
}
