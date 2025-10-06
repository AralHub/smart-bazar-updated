import { DollarOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons"
import { useSearch } from "@tanstack/react-router"
import { type FC, useMemo } from "react"
import { useGetRestroomsInfoQuery } from "src/services/dashboard/restrooms"
import { Card, Col, Count, Flex, Row, Title } from "src/shared/ui"
import { formatNumber } from "src/shared/utils"
import { TagIcon } from "src/widgets/tag-icon"

const RestroomsGenderStatistic: FC = () => {
	const { date, restroom: restroom_id } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/restrooms",
	})

	const { data: restroomInfo } = useGetRestroomsInfoQuery({
		restroom_id,
		date,
	})

	const data = useMemo(
		() => [
			{
				count: formatNumber(restroomInfo?.data?.male),
				title: "Erkekler",
				icon: <ManOutlined />,
				color: "blue",
			},
			{
				count: formatNumber(restroomInfo?.data?.female),
				icon: <WomanOutlined />,
				title: "Hayallar",
				color: "pink",
			},
			{
				// count: formatNumber(restroomInfo?.data?.sum_amount),
				count: formatNumber(restroomInfo?.data?.all_count) * 1000,
				icon: <DollarOutlined />,
				title: "Tusim summa",
				color: "green",
			},
		],
		[restroomInfo]
	)

	return (
		<>
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				{data.map((item, index) => (
					<Col
						xs={24}
						md={8}
						key={index}
					>
						<Card
							style={{
								overflow: "hidden",
							}}
							styles={{
								body: {
									padding: 0,
								},
							}}
						>
							<Flex
								vertical={true}
								justify={"space-between"}
								style={{ padding: 24 }}
							>
								<Flex
									gap={16}
									align={"center"}
								>
									<TagIcon
										color={item.color}
										icon={item.icon}
									/>
									<Title level={4}>{item.title}</Title>
								</Flex>
								<Flex
									justify={"center"}
									align={"center"}
									style={{
										minHeight: 80,
									}}
								>
									<Title
										level={1}
										style={{ flexShrink: 0 }}
									>
										<Count end={item.count} />
									</Title>
								</Flex>
							</Flex>
						</Card>
					</Col>
				))}
			</Row>
		</>
	)
}

export { RestroomsGenderStatistic }
