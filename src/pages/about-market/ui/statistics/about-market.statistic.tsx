import { CarOutlined, ClearOutlined, TeamOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { type FC, useMemo } from "react"
import CountUp from "react-countup"
import { useGetStatisticsDashboardQuery } from "src/services/statistics"
import { Card, Col, Flex, Row, Title } from "src/shared/ui"
import { CowOutlined } from "src/shared/ui/icons"
import { TagIcon } from "src/widgets/tag-icon"

const AboutMarketStatistic: FC = () => {
	const { districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/",
	})
	const { data: dashboard } = useGetStatisticsDashboardQuery({
		district_id: districtId,
		market_id: marketId,
	})
	const statisticData = useMemo(
		() => [
			{
				title: "Xızmetkerler sanı",
				color: "blue",
				icon: <TeamOutlined />,
				count: dashboard?.data?.employees_count || 0,
			},
			{
				title: "Avto turar orinlar sanı",
				color: "cyan",
				icon: <CarOutlined />,
				count:
					(dashboard?.data?.market_car_parks_count || 0) +
					(dashboard?.data?.shopping_car_parks_count || 0),
			},
			{
				title: "Hajetxanalar sani",
				color: "lime",
				icon: <ClearOutlined />,
				count: dashboard?.data?.restrooms_count || 0,
			},
			{
				title: "Mal bazarlar sanı",
				color: "orange",
				icon: <CowOutlined />,
				count: dashboard?.data?.cattle_markets_count || 0,
			},
		],
		[
			dashboard?.data?.cattle_markets_count,
			dashboard?.data?.employees_count,
			dashboard?.data?.market_car_parks_count,
			dashboard?.data?.restrooms_count,
			dashboard?.data?.shopping_car_parks_count,
		]
	)
	return (
		<>
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				{statisticData.map((item, index) => (
					<Col
						xs={24}
						md={12}
						key={index}
					>
						<Card>
							<Flex
								gap={16}
								align={"center"}
								justify={"space-between"}
								wrap={true}
							>
								<Flex
									gap={16}
									align={"center"}
								>
									<TagIcon
										color={item.color}
										icon={item.icon}
									/>
									<Title
										level={4}
										title={item.title}
										style={{
											whiteSpace: "wrap",
											textOverflow: "ellipsis",
											overflow: "hidden",
										}}
									>
										{item.title}
									</Title>
								</Flex>
								<Title
									level={1}
									style={{ flexShrink: 0 }}
								>
									<CountUp end={item.count} />
								</Title>
							</Flex>
						</Card>
					</Col>
				))}
			</Row>
		</>
	)
}

export { AboutMarketStatistic }
