import { useParams, useSearch } from "@tanstack/react-router"
import type { ECharts } from "echarts/core"
import { type FC, useEffect, useMemo, useRef } from "react"
import { cattleOption } from "src/pages/cattle-market/ui/charts/cattle.option.ts"
import { useGetCattleMarketsAnimalsQuery } from "src/services/dashboard/cattle-markets"
import { Card, Charts } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils"

const data = [
	{ value: 0, name: "Siyir" },
	{ value: 0, name: "Baspaq" },
	{ value: 0, name: "Eshki" },
	{ value: 0, name: "Ilaq" },
	{ value: 0, name: "Qoy" },
	{ value: 0, name: "Qozi" },
]

const CattlePieChart: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/cattle-market",
	})
	const { cattle_market } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/cattle-market",
	})
	const chartRef = useRef<ECharts>(null)

	const { data: animals, isLoading } = useGetCattleMarketsAnimalsQuery({
		market_id: marketId,
		cattle_market_id: cattle_market,
	})

	const animalsData = useMemo(() => {
		if (!animals?.data) return data

		return animals?.data?.map((el) => ({
			value: Number(el.amount_sum) || 0,
			name: el.name,
		}))
	}, [animals?.data])

	useEffect(() => {
		const chart = chartRef.current
		if (chart) {
			chart.on("legendselectchanged", (args) => {
				const params = args as {
					name: string
					selected: Record<string, boolean>
					type: string
				}
				const keys = Object.entries(params.selected)
					.filter(([, value]) => value)
					.map((el) => el[0])
				const filteredData = animalsData.filter((el) => keys.includes(el.name))
				const total = filteredData.reduce(
					(total, item) => total + item.value,
					0
				)
				chartRef?.current?.setOption({
					series: [
						{
							label: {
								formatter: () => `${formatPriceWithCurrency(total)}`,
							},
						},
					],
				})
			})
		}
		return () => {
			chart?.off("legendselectchanged", () => {})
		}
	}, [animalsData])
	return (
		<>
			<Card loading={isLoading}>
				<Charts
					loading={isLoading}
					style={{
						height: 350,
					}}
					ref={chartRef}
					option={{
						...cattleOption,
						series: [
							{
								name: "Tusim pullar",
								type: "pie",
								radius: ["60%", "80%"],
								avoidLabelOverlap: false,
								label: {
									show: true,
									position: "center",
									formatter: () =>
										formatPriceWithCurrency(
											animalsData.reduce((total, item) => total + item.value, 0)
										),
									fontSize: 21,
									fontWeight: "bold",
								},
								labelLine: {
									show: false,
								},
								data: animalsData,
							},
						],
					}}
				/>
			</Card>
		</>
	)
}

export { CattlePieChart }
