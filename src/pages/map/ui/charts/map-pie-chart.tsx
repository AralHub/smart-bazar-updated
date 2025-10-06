import { type FC, useMemo } from "react"
import type { SchemeBlock, SchemePlace } from "src/services/scheme"
import { Card, Charts } from "src/shared/ui"
import { mapOption } from "./map.option.ts"

interface MapPieChartProps {
	data: {
		places: SchemePlace[]
		blocks: SchemeBlock[]
	}
	loading?: boolean
}

const MapPieChart: FC<MapPieChartProps> = ({ data: places, loading }) => {
	const placesCounts = useMemo(() => {
		return {
			success:
				places.places.filter((el) => el.is_payment_success).length +
				places.blocks.filter((el) => el.payments_sum_amount).length,
			error:
				places.places.filter((el) => !el.is_payment_success).length +
				places.blocks.filter((el) => !el.payments_sum_amount).length,
			warning: 0,
		}
	}, [places])

	const data = useMemo(
		() => [
			{ value: placesCounts.success || 0, name: "Tólengen" },
			{ value: placesCounts.error || 0, name: "Tólenbegen" },
			// { value: placesCounts.warning || 0, name: "Belgisiz" },
		],
		[placesCounts.error, placesCounts.success]
	)

	return (
		<>
			<Card
				style={{ height: "100%" }}
				styles={{
					body: { height: "100%" },
				}}
			>
				<Charts
					// ref={chartRef}
					loading={loading}
					// onEvents={
					// 	{
					// 		legendselectchanged: (params) => {
					// 			const keys = generateLegends(params.selected)
					// 			const filteredData = data.filter((el) => keys.includes(el.name))
					// 			const total = filteredData.reduce(
					// 				(total, item) => total + item.value,
					// 				0
					// 			)
					// 			chartRef?.current?.getEchartsInstance()?.setOption({
					// 				series: [
					// 					{
					// 						label: {
					// 							formatter: () => `${total}`,
					// 						},
					// 					},
					// 				],
					// 			})
					// 		},
					// 	} as OnEvents
					// }
					option={{
						...mapOption,
						series: [
							{
								name: "Sanaw",
								type: "pie",
								radius: ["40%", "70%"],
								avoidLabelOverlap: false,
								label: {
									show: true,
									position: "center",
									fontSize: 24,
									fontWeight: "bold",
									formatter: () => {
										return `${
											placesCounts.success +
												placesCounts.warning +
												placesCounts.error || 0
										}`
									},
								},
								labelLine: {
									show: false,
								},
								data,
							},
						],
					}}
					style={{ height: 250 }}
				/>
			</Card>
		</>
	)
}

export { MapPieChart }
