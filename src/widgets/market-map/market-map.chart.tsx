import type { ECharts } from "echarts/core"
import { type CSSProperties, type FC, useEffect, useRef } from "react"
import { Charts, type EChartsOption } from "src/shared/ui"

export interface MarketMapChartProps {
	loading?: boolean
	style?: CSSProperties
	option: EChartsOption
	onClick?: (params: {
		name: string
		region: {
			tooltip?: {
				show: boolean
			}
		}
	}) => void
}

const MarketMapChart: FC<MarketMapChartProps> = ({
	option,
	loading,
	style,
	onClick,
}) => {
	const mapChart = useRef<ECharts>(null)

	useEffect(() => {
		if (mapChart.current) {
			const chart = mapChart.current
			chart.on("click", (args) => {
				const params = args as unknown as {
					name: string
					region: {
						tooltip?: {
							show: boolean
						}
					}
				}
				onClick?.(params)
			})

			return () => {
				chart.off("click", () => {})
			}
		}
	}, [onClick])
	return (
		<>
			<Charts
				loading={loading}
				ref={mapChart}
				option={option}
				style={style}
			/>
		</>
	)
}

export { MarketMapChart }
