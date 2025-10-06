import type {
	BarSeriesOption,
	EffectScatterSeriesOption,
	LineSeriesOption,
	PieSeriesOption,
} from "echarts/charts"
import {
	BarChart,
	EffectScatterChart,
	LineChart,
	LinesChart,
	PieChart,
} from "echarts/charts"
import type {
	GeoComponentOption,
	GridComponentOption,
	LegendComponentOption,
	TitleComponentOption,
} from "echarts/components"
import {
	GeoComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent,
} from "echarts/components"
import type { ComposeOption, ECharts, SetOptionOpts } from "echarts/core"
import { getInstanceByDom, init, use as echartsUse } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { type CSSProperties, forwardRef, useEffect, useRef } from "react"
import { useDebounceEffect } from "src/shared/hooks"
import { useMenuStore } from "src/shared/store"
import { Spin } from "./"

echartsUse([
	BarChart,
	LineChart,
	PieChart,
	LinesChart,
	EffectScatterChart,

	TitleComponent,
	TooltipComponent,
	GridComponent,
	GeoComponent,
	LegendComponent,

	CanvasRenderer,
])

export type EChartsOption = ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| PieSeriesOption
	| EffectScatterSeriesOption
	| GridComponentOption
	| TitleComponentOption
	| GeoComponentOption
	| LegendComponentOption
>

export interface ChartsProps {
	option: EChartsOption
	style?: CSSProperties
	className?: string
	settings?: SetOptionOpts
	loading?: boolean
	theme?: "light" | "dark"
}

const Charts = forwardRef<ECharts, ChartsProps>(
	(
		{ className, theme, option, settings, style, loading = false, ...props },
		ref
	) => {
		const chartRef = useRef<HTMLDivElement>(null)
		const collapsed = useMenuStore((state) => state.collapsed)

		useDebounceEffect(() => {
			if (chartRef.current) {
				const chart = getInstanceByDom(chartRef.current)
				chart?.resize()
			}
		}, [collapsed, className, style, loading, option, theme])

		useEffect(() => {
			// Initialize chart
			let chart: ECharts | null = null
			if (chartRef.current !== null) {
				chart = init(chartRef.current, theme)
				if (typeof ref === "function") {
					ref(chart)
				} else if (ref) {
					ref.current = chart
				}
			}

			// Add chart resize listener
			// ResizeObserver is leading to a bit janky UX
			function resizeChart() {
				chart?.resize()
			}

			let resizeTimer: NodeJS.Timeout
			window.addEventListener("resize", () => {
				resizeChart()

				clearTimeout(resizeTimer)

				resizeTimer = setTimeout(() => {
					resizeChart()
				}, 500)
			})

			// Return cleanup function
			return () => {
				chart?.dispose()
				window.removeEventListener("resize", resizeChart)
			}
		}, [ref, theme])

		useEffect(() => {
			// Update chart
			if (chartRef.current !== null) {
				const chart = getInstanceByDom(chartRef.current)
				chart?.setOption(option, settings)
			}
		}, [option, settings, theme]) // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function
		return (
			<Spin spinning={loading}>
				<div
					style={{ width: "100%", height: 300, ...style }}
					ref={chartRef}
					className={className}
					{...props}
				/>
			</Spin>
		)
	}
)
Charts.displayName = "ChartBar"

export { Charts }
