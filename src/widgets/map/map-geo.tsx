import { css, cx } from "antd-style"
import type { ECharts } from "echarts/core"
import { type FC, useEffect, useMemo, useRef } from "react"
import {
	type District,
	useGetDistrictsQuery,
} from "src/services/dashboard/districts"
import { TOKEN } from "src/shared/constants"
import { Charts } from "src/shared/ui"
import { useMapGeoOption } from "./map-geo.option"

interface MapGeoProps {
	onSelect: (map: District) => void
	value: number[]
	size?: "small" | "middle"
}

const MapGeo: FC<MapGeoProps> = ({ value, onSelect, size }) => {
	const { data: districts, isLoading, isFetching } = useGetDistrictsQuery()
	const chartRef = useRef<ECharts>(null)

	const districtsData = useMemo(() => {
		if (!districts?.data) return []

		return districts.data.map((item) => ({
			...item,
			selected: value.includes(item.id),
		}))
	}, [districts?.data, value])

	const option = useMapGeoOption(districtsData)

	useEffect(() => {
		if (chartRef.current) {
			const chart = chartRef.current
			chart.on("click", (args) => {
				const params = args as unknown as {
					name: string
					region: {
						itemStyle: {
							color: string
						}
						emphasis: {
							disabled: boolean
						}
					}
				}
				if (params?.region?.itemStyle?.color === "#213d9d") return

				const selectData = districtsData.find((el) => `${el.id}` === args.name)
				if (selectData) {
					onSelect(selectData)
				}
			})

			return () => {
				chart.off("click", () => {})
			}
		}
	}, [districtsData, onSelect])
	return (
		<>
			<Charts
				ref={chartRef}
				className={cx(
					css`
						transition: all ${TOKEN.motionDurationMid};
						min-height: calc(100vh - 64px - 48px - 48px);
						// minWidth: 1537,

						&.middle {
							min-height: calc(100vh - 64px - 100px - 48px);
						}

						canvas {
							transition: all ${TOKEN.motionDurationMid};
						}
					`,
					size
				)}
				loading={isLoading || isFetching}
				option={option}
			/>
		</>
	)
}

export { MapGeo }
