import { registerMap } from "echarts/core"
import { useMemo } from "react"
import { type District } from "src/services/dashboard/districts"
import { QRSvg } from "src/shared/assets"
import type { EChartsOption } from "src/shared/ui"
import { makeDistrictRegions } from "./map-geo.utils.tsx"

registerMap("qaraqalpaqstan-respublika", { svg: QRSvg })

export const useMapGeoOption = (districts: District[]) => {
	const option: EChartsOption = useMemo(
		() => ({
			tooltip: {},
			geo: {
				map: "qaraqalpaqstan-respublika",
				roam: false,
				layoutCenter: ["50%", "50%"],
				layoutSize: "95%",
				tooltip: {
					show: true,
					confine: true,
					formatter: (params) => {
						const data = districts.find((el) => `${el.id}` === params.name)
						if (data) return data?.name
						return params.name
					},
				},
				scaleLimit: {
					min: 1,
					max: 5,
				},
				animation: true,
				itemStyle: {
					color: "#819af0",
					borderColor: "#fff",
					borderWidth: 1,
				},
				label: {
					show: false,
				},
				emphasis: {
					itemStyle: {
						color: "#213d9d",
						borderColor: "#fff",
						borderWidth: 1,
					},
					disabled: false,
					label: {
						color: "green",
						show: false,
					},
				},
				regions: [...makeDistrictRegions(districts)],
			},
		}),
		[districts]
	)

	return option
}
