import ReactDOMServer from "react-dom/server"
import type { District } from "src/services/dashboard/districts"
import { MapGeoTooltip } from "./map-geo-tooltip.tsx"

export const makeDistrictRegions = (districts: District[]) => {
	return districts.map((district) => ({
		name: `${district?.id}`,
		selectedMode: "single",
		tooltip: {
			show: true,
			confine: true,
			formatter: (params: { name: string }) => {
				if (district) {
					const element = <MapGeoTooltip data={district} />
					return ReactDOMServer.renderToStaticMarkup(element).toString()
				}
				return params.name
			},
		},
		itemStyle: {
			color: district?.selected ? "#213d9d" : "#819af0",
			borderRadius: [0, 0, 0, 0],
			borderColor: "#fff",
		},
		emphasis: {
			itemStyle: {
				color: "#213d9d",
				borderColor: "#fff",
			},
			disabled: false,
		},
		select: {
			itemStyle: {
				color: district?.selected ? "#213d9d" : "#819af0",
			},
			label: {
				show: false,
			},
		},
	}))
}
