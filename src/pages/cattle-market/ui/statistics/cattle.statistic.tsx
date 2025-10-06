import { useParams, useSearch } from "@tanstack/react-router"
import { type FC, useMemo } from "react"
import CountUp from "react-countup"
import { useGetCattleMarketsAnimalsQuery } from "src/services/dashboard/cattle-markets"
import { Card, Col, Divider, Flex, Row, Space, Title } from "src/shared/ui"
import { CowFilled, GoatFilled, SheepFilled } from "src/shared/ui/icons"
import { TagIcon } from "src/widgets/tag-icon"

const CattleStatistic: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/cattle-market",
	})
	const { cattle_market } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/cattle-market",
	})

	const { data: animals } = useGetCattleMarketsAnimalsQuery({
		market_id: marketId,
		cattle_market_id: cattle_market,
	})

	const animalsData = useMemo(() => {
		if (!animals?.data) return []
		const cowData = animals?.data?.slice(0, 2)
		const goatData = animals?.data?.slice(2, 4)
		const sheepData = animals?.data?.slice(4, 6)
		return [
			cowData.map((el) => ({
				title: el.name,
				color: "blue",
				icon: <CowFilled />,
				count: Number(el.quantity_sum) || 0,
			})),
			goatData.map((el) => ({
				title: el.name,
				color: "orange",
				icon: <GoatFilled />,
				count: Number(el.quantity_sum) || 0,
			})),
			sheepData.map((el) => ({
				title: el.name,
				color: "green",
				icon: <SheepFilled />,
				count: Number(el.quantity_sum) || 0,
			})),
		]
	}, [animals?.data])

	// const options: EChartsOption[] = (["blue", "orange", "green"] as const).map(
	// 	(el) => ({
	// 		color: [token[el]],
	// 		tooltip: {
	// 			trigger: "axis",
	// 		},
	// 		xAxis: {
	// 			type: "category",
	// 			show: false,
	// 			data: ["Dú", "Si", "Sá", "Pi", "Ju", "Sh", "Ek"],
	// 		},
	// 		grid: {
	// 			top: "1%",
	// 			left: 0,
	// 			right: 0,
	// 			bottom: 0,
	// 		},
	// 		yAxis: {
	// 			type: "value",
	// 			show: false,
	// 		},
	// 		series: [
	// 			{
	// 				data: Array.from({ length: 7 }).map(() => 0),
	// 				type: "line",
	// 				smooth: true,
	// 			},
	// 		],
	// 	})
	// )
	return (
		<>
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				{animalsData.map((items, index) => (
					<Col
						xs={24}
						md={8}
						key={index}
					>
						<Card>
							<Space
								direction={"vertical"}
								split={<Divider />}
								styles={{
									item: { width: "100%" },
								}}
								style={{
									width: "100%",
								}}
							>
								{items?.map((item, index) => (
									<Flex
										key={index}
										gap={16}
										align={"center"}
									>
										<TagIcon
											color={item.color}
											size={index > 0 ? "small" : undefined}
											icon={item.icon}
											style={{
												fontSize: index > 0 ? 36 : 48,
											}}
										/>
										<Flex
											vertical={true}
											style={{
												width: "100%",
											}}
										>
											<Title level={4}>{item.title}</Title>

											<Title
												level={index > 0 ? 2 : 1}
												style={{ flexShrink: 0, textAlign: "end" }}
											>
												<CountUp end={item.count} />
											</Title>
										</Flex>
									</Flex>
								))}
							</Space>
						</Card>
					</Col>
				))}
			</Row>
		</>
	)
}

export { CattleStatistic }
