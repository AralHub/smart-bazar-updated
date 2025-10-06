import { TOKEN } from "src/shared/constants"
import type { EChartsOption } from "src/shared/ui"

export const mapOption: EChartsOption = {
	color: [TOKEN.green5, TOKEN.red5, TOKEN.orange5],
	tooltip: {
		trigger: "item",
	},
	legend: {
		type: "scroll",
		left: "center",
	},
	series: [
		{
			name: "Sanaw",
			type: "pie",
			radius: ["40%", "70%"],
			avoidLabelOverlap: false,
			label: {
				show: true,
				position: "center",
				fontSize: 24,
				fontWeight: "bold",
				formatter: () => "0",
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: 0, name: "Tólengen" },
				{ value: 0, name: "Tólenbegen" },
				// { value: 0, name: "Belgisiz" },
			],
		},
	],
}
