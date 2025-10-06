import type { EChartsOption } from "src/shared/ui"

export const restroomsClientsAgeOption: EChartsOption = {
	tooltip: {
		trigger: "item",
	},
	legend: {
		top: "5%",
		left: "center",
		type: "scroll",
	},
	series: [
		{
			name: "Sani",
			type: "pie",
			radius: ["40%", "70%"],
			avoidLabelOverlap: false,
			label: {
				show: true,
				fontSize: 24,
				fontWeight: "bold",
				position: "center",
				formatter: () => "256",
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: 1048, name: "Search Engine" },
				{ value: 735, name: "Direct" },
				{ value: 580, name: "Email" },
				{ value: 484, name: "Union Ads" },
				{ value: 300, name: "Video Ads" },
			],
		},
	],
}
