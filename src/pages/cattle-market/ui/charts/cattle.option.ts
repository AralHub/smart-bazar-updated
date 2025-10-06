import { TOKEN } from "src/shared/constants"
import type { EChartsOption } from "src/shared/ui"

export const cattleOption: EChartsOption = {
	color: [
		TOKEN.geekblue6,
		TOKEN.geekblue3,
		TOKEN.orange6,
		TOKEN.orange3,
		TOKEN.green6,
		TOKEN.green3,
	],
	tooltip: {
		trigger: "item",
	},
	legend: {
		// type: "scroll",
		left: "center",
	},
	series: [
		{
			name: "Tusim pullar",
			type: "pie",
			radius: ["50%", "70%"],
			avoidLabelOverlap: false,
			label: {
				show: true,
				position: "center",
				formatter: () => "3,052,800 UZS",
				fontSize: 21,
				fontWeight: "bold",
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: 0, name: "Mallar" },
				{ value: 0, name: "Eshkiler" },
				{ value: 0, name: "Qoylar" },
			],
		},
	],
}
