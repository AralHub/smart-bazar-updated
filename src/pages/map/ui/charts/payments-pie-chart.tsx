import { type FC, useMemo } from "react"
import type { SchemeBlock, SchemePlace } from "src/services/scheme"
import { Card, Charts } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils"
import { paymentsOption } from "./payments.option.ts"

interface PaymentsPieChartProps {
	data: {
		places: SchemePlace[]
		blocks: SchemeBlock[]
	}
	loading?: boolean
}

const PaymentsPieChart: FC<PaymentsPieChartProps> = ({
	data: places,
	loading,
}) => {
	const placesPayments = useMemo(() => {
		const filteredPlaces = places.places.filter((el) => el.is_payment_success)
		const filteredBlocks = places.blocks.filter((el) => el.payments_sum_amount)

		const totalOnlinePrice = filteredPlaces
			.filter((el) => el.payment?.payment_method !== 1)
			.reduce(
				(total, place) => total + (Number(place.payments_sum_amount) || 0),
				0
			)
		const totalOfflinePrice =
			filteredPlaces
				.filter((el) => el.payment?.payment_method === 1)
				.reduce(
					(total, place) => total + (Number(place.payments_sum_amount) || 0),
					0
				) +
			filteredBlocks.reduce(
				(total, block) => total + (Number(block.payments_sum_amount) || 0),
				0
			)
		return {
			online: totalOnlinePrice,
			offline: totalOfflinePrice,
		}
	}, [places])

	const data = useMemo(
		() => [
			{ value: placesPayments.online, name: "Onlayn" },
			{ value: placesPayments.offline, name: "Naq" },
		],
		[placesPayments.offline, placesPayments.online]
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
					// 							formatter: () => `${formatPriceWithCurrency(total)}`,
					// 						},
					// 					},
					// 				],
					// 			})
					// 		},
					// 	} as OnEvents
					// }
					option={{
						...paymentsOption,
						series: [
							{
								name: "Tusim pullar",
								type: "pie",
								radius: ["60%", "80%"],
								avoidLabelOverlap: false,
								label: {
									show: true,
									fontSize: 20,
									position: "center",
									formatter: () =>
										formatPriceWithCurrency(
											placesPayments.offline + placesPayments.online
										),
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

export { PaymentsPieChart }
