import {
	AppstoreAddOutlined,
	DollarOutlined,
	ProductOutlined,
} from "@ant-design/icons"
import { useParams, useSearch } from "@tanstack/react-router"
import { useResponsive } from "antd-style"
import { type FC, useMemo } from "react"
import {
	useGetSchemeBlocksQuery,
	useGetSchemePlacesQuery,
} from "src/services/scheme"
import { Badge, Card, Col, Count, Flex, Row, Space, Title } from "src/shared/ui"
import { TagIcon } from "src/widgets/tag-icon"

const filterInfra = (value: { place_type_id?: number }) =>
	value.place_type_id === 1
const filterRasta = (value: { place_type_id?: number }) =>
	value.place_type_id === 2

const MapStatistic: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/map",
	})
	const { date } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/map",
	})
	const { xs = false } = useResponsive()

	const { data: places } = useGetSchemePlacesQuery({
		market_id: marketId,
		date,
	})

	const { data: blocks } = useGetSchemeBlocksQuery({
		market_id: marketId,
		date,
	})

	const placesData = useMemo(() => places?.data || [], [places?.data])
	const blocksData = useMemo(() => blocks?.data || [], [blocks?.data])
	const placesAmountData = useMemo(
		() => placesData.filter((el) => el.is_payment_success),
		[placesData]
	)
	const blocksAmountData = useMemo(
		() => blocksData.filter((el) => el.payments_sum_amount),
		[blocksData]
	)

	const statisticData = useMemo(
		() => [
			{
				title: "Uliwma orınlar",
				color: "geekblue",
				icon: <ProductOutlined />,
				count: Number(placesData?.length) + Number(blocksData?.length) || 0,
				infraCount: placesData?.filter(filterInfra).length || 0,
				rastaCount: placesData?.filter(filterRasta).length || 0,
				jaymaCount: blocksData?.length || 0,
			},
			{
				title: "Uliwma orin tolem",
				color: "green",
				icon: <DollarOutlined />,
				count:
					(placesAmountData?.reduce(
						(total, item) => total + (Number(item?.payments_sum_amount) || 0),
						0
					) || 0) +
					(blocksAmountData?.reduce(
						(total, item) => total + (Number(item.payments_sum_amount) || 0),
						0
					) || 0),
				infraCount:
					placesAmountData
						?.filter(filterInfra)
						?.reduce(
							(total, item) => total + (Number(item?.payments_sum_amount) || 0),
							0
						) || 0,
				rastaCount:
					placesAmountData
						?.filter(filterRasta)
						?.reduce(
							(total, item) => total + (Number(item?.payments_sum_amount) || 0),
							0
						) || 0,
				jaymaCount:
					blocksAmountData?.reduce(
						(total, item) => total + (Number(item.payments_sum_amount) || 0),
						0
					) || 0,
			},
			{
				title: "Ulıwma tolengen orınlar",
				color: "cyan",
				icon: <AppstoreAddOutlined />,
				count:
					(placesAmountData?.length || 0) +
					(blocksAmountData?.reduce(
						(total, item) => total + (Number(item.payments_sum_quantity) || 0),
						0
					) || 0),
				infraCount: placesAmountData?.filter(filterInfra).length || 0,
				rastaCount: placesAmountData?.filter(filterRasta).length || 0,
				jaymaCount: blocksAmountData?.length || 0,
				jaymaPlaceCount:
					blocksAmountData?.reduce(
						(total, item) => total + (Number(item.payments_sum_quantity) || 0),
						0
					) || 0,
			},
		],
		[blocksAmountData, blocksData, placesAmountData, placesData]
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
						md={8}
						key={index}
					>
						<Card>
							<Flex
								gap={16}
								align={"center"}
								style={{ marginBottom: 24 }}
							>
								<TagIcon
									color={item.color}
									icon={item.icon}
								/>
								<Title level={4}>{item.title}</Title>
							</Flex>
							<Flex
								vertical={xs}
								justify={"space-between"}
								align={"center"}
								gap={16}
							>
								<Space
									direction={xs ? "horizontal" : "vertical"}
									wrap={true}
									style={{
										justifyContent: "center",
									}}
								>
									<Badge
										status={"processing"}
										styles={{
											indicator: {
												width: 12,
												height: 12,
											},
										}}
										color={"green"}
										text={
											<>
												Dukanlar:{" "}
												<strong>
													<Count end={item.infraCount} />
												</strong>
											</>
										}
									/>
									<Badge
										status={"processing"}
										styles={{
											indicator: {
												width: 12,
												height: 12,
											},
										}}
										color={"yellow"}
										text={
											<>
												Rastalar:{" "}
												<strong style={{ whiteSpace: "nowrap" }}>
													<Count end={item.rastaCount} />
												</strong>
											</>
										}
									/>
									<Badge
										status={"processing"}
										styles={{
											indicator: {
												width: 12,
												height: 12,
											},
										}}
										color={"cyan"}
										text={
											<>
												Jayma:{" "}
												<strong>
													<Count end={item.jaymaCount} />{" "}
													{item?.jaymaPlaceCount ? (
														<>
															(<Count end={item.jaymaPlaceCount} />)
														</>
													) : null}
												</strong>
											</>
										}
									/>
								</Space>
							</Flex>
							<Title
								level={1}
								style={{ textAlign: xs ? "center" : "end", marginBlock: 8 }}
							>
								<Count end={item.count} />
							</Title>
						</Card>
					</Col>
				))}
			</Row>
		</>
	)
}

export { MapStatistic }
