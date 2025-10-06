import { useSearch } from "@tanstack/react-router"
import { type FC, useMemo } from "react"
import { useGetRestroomsInfoQuery } from "src/services/dashboard/restrooms"
import { Card, Charts, type EChartsOption } from "src/shared/ui"
import { restroomsClientsAgeOption } from "./restrooms-clients-age.option.ts"

const RestroomsClientsAgeChart: FC = () => {
	const { date, restroom: restroom_id } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/restrooms",
	})

	const { data: restroomInfo } = useGetRestroomsInfoQuery({
		restroom_id,
		date,
	})

	const data = useMemo(() => {
		if (!restroomInfo) return []
		const list: {
			name: string
			value: number
		}[] = []
		for (const [key, value] of Object.entries(
			// restroomInfo?.client_age_count?.count || {}
			{} as Record<string, number>
		)) {
			list.push({
				name: key,
				value,
			})
		}
		return list
	}, [restroomInfo])

	const option: EChartsOption = useMemo(
		() => ({
			...restroomsClientsAgeOption,
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
						formatter: () =>
							`${data.reduce((total, item) => total + item.value, 0)}`,
					},
					labelLine: {
						show: false,
					},
					data,
				},
			],
		}),
		[data]
	)

	return (
		<>
			<Card
				title={"klientlerdiń jasi sani"}
				style={{
					height: "100%",
				}}
				styles={{
					body: {
						height: "calc(100% - 56px)",
					},
				}}
			>
				<Charts
					style={{
						height: "100%",
					}}
					// onEvents={{
					// 	legendselectchanged: (params: {
					// 		name: string
					// 		selected: Record<string, boolean>
					// 		type: string
					// 	}) => {
					// 		const keys = Object.entries(params.selected)
					// 			.filter(([_, value]) => value)
					// 			.map((el) => el[0])
					// 		const filteredData = data.filter((el) => keys.includes(el.name))
					// 		const total = filteredData.reduce(
					// 			(total, item) => total + item.value,
					// 			0
					// 		)
					// 		const chart = chartRef.current?.getEchartsInstance?.()
					// 		if (chart) {
					// 			chart.setOption({
					// 				series: [
					// 					{
					// 						label: {
					// 							formatter: () => `${total}`,
					// 						},
					// 					},
					// 				],
					// 			})
					// 		}
					// 	},
					// }}
					option={option}
				/>
			</Card>
		</>
	)
}

export { RestroomsClientsAgeChart }
