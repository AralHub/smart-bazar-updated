import { TOKEN } from "src/shared/constants"
import type { EChartsOption } from "src/shared/ui"

export const paymentsOption: EChartsOption = {
	color: [TOKEN.blue7, TOKEN.green5],
	tooltip: {
		trigger: "item",
	},
	legend: {
		type: "scroll",
		left: "center",
	},
	series: [
		{
			name: "Tusim pullar",
			type: "pie",
			radius: ["60%", "80%"],
			avoidLabelOverlap: false,
			label: {
				show: true,
				fontSize: 20,
				position: "center",
				formatter: () => "3,168,000 UZS",
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: 2_000_000, name: "Onlayn" },
				{ value: 3_369_000, name: "Naq" },
			],
		},
	],
}
