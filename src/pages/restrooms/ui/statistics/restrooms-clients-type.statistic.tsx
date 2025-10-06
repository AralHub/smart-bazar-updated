import { SmileOutlined, UserAddOutlined } from "@ant-design/icons"
import { useSearch } from "@tanstack/react-router"
import { type FC, useMemo } from "react"
import CountUp from "react-countup"
import { useGetRestroomsInfoQuery } from "src/services/dashboard/restrooms"
import { Card, Col, Flex, Row, Title } from "src/shared/ui"
import { TagIcon } from "src/widgets/tag-icon"

const RestroomsClientsTypeStatistic: FC = () => {
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
				// count: restroomInfo?.client_type_count?.count?.new || 0,
				count: 0,
				title: "Jaslar",
				icon: <SmileOutlined />,
				color: "green",
			},
			{
				// count: restroomInfo?.client_type_count?.count?.old || 0,
				count: 0,
				icon: <UserAddOutlined />,
				title: "Jası úlken",
				color: "orange",
			},
		],
		[restroomInfo]
	)

	return (
		<>
			<Row
				gutter={24}
				style={{ rowGap: 24, height: "100%" }}
			>
				{data.map((item, index) => (
					<Col
						span={24}
						key={index}
					>
						<Card style={{ height: "100%" }}>
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
								justify={"end"}
								align={"center"}
								gap={16}
							>
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

export { RestroomsClientsTypeStatistic }
