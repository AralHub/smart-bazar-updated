import { useParams } from "@tanstack/react-router"
import { useMemo } from "react"
import { useGetCamerasQuery } from "src/services/dashboard/cameras"
import type { SchemeBlock, SchemePlace } from "src/services/scheme"
import { useMarketMap } from "src/shared/hooks"
import { type EChartsOption } from "src/shared/ui"
import {
	checkMapExists,
	makeBlockRegions,
	makeCameraRegions,
	makeTakenRegions,
} from "./market-map.utils.tsx"

export const useMarketMapOption = (
	data?: {
		places?: SchemePlace[]
		blocks?: SchemeBlock[]
	},
	tabKey?: string | number
) => {
	const { marketId } = useParams({
		strict: false,
	})
	const map = useMarketMap()

	const selectedMap = useMemo(() => {
		if (!tabKey) return map
		if (!map?.items) return map
		if (map?.items.length === 0) return map

		return map?.items?.find((el) => Number(el.id) === Number(tabKey))
	}, [map, tabKey])

	const { data: cameras } = useGetCamerasQuery({
		market_id: marketId,
	})
	const option: EChartsOption | undefined = useMemo(() => {
		if (!selectedMap?.svg) return
		if (!checkMapExists(selectedMap.name)) return

		return {
			tooltip: {},
			geo: {
				map: selectedMap.name,
				roam: true,
				layoutCenter: ["50%", "50%"],
				layoutSize: "95%",
				tooltip: {
					show: false,
					confine: true,
					formatter: (params) => {
						if (params.name.startsWith("c")) {
							return `Camera - ${params.name}`
						}
						return params.name
					},
				},
				scaleLimit: {
					min: 1,
					max: 100,
				},
				itemStyle: {
					color: "#AEAEAE",
					borderColor: "#fff",
					borderWidth: 1,
				},
				label: {
					show: false,
				},
				emphasis: {
					itemStyle: {
						color: "#DFDFDF",
						borderColor: "#fff",
						borderWidth: 1,
					},
					disabled: true,
					label: {
						color: "green",
						show: false,
					},
				},
				regions: [
					...makeTakenRegions(data?.places || []),
					...makeBlockRegions(data?.blocks || []),
					...makeCameraRegions(cameras?.data || []),
				],
			},
		} as EChartsOption
	}, [cameras?.data, data, selectedMap?.name, selectedMap?.svg])

	return option
}
