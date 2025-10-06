import {
	AppstoreAddOutlined,
	AppstoreOutlined,
	CarOutlined,
	ClearOutlined,
	DollarOutlined,
	SettingOutlined,
} from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { useResponsive } from "antd-style"
import dayjs from "dayjs"
import { type FC, useMemo, useState } from "react"
import CountUp from "react-countup"
import { useGetMarketsByIdQuery } from "src/services/dashboard/markets"
import { useGetStatisticsOverallQuery } from "src/services/statistics"
import { Card, Col, Flex, Row, Segmented, Space, Title } from "src/shared/ui"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { PageHeader } from "src/widgets/page-header"
import { TagIcon } from "src/widgets/tag-icon"

const getIcon = (id: number) => {
	switch (id) {
		case 1:
			return <AppstoreOutlined />
		case 2:
			return <AppstoreOutlined />
		case 3:
			return <AppstoreAddOutlined />
		case 4:
			return <SettingOutlined />
		case 5:
			return <ClearOutlined />
		case 6:
			return <CarOutlined />
		default:
			return <AppstoreOutlined />
	}
}

const getColor = (id: number) => {
	switch (id) {
		case 1:
			return "green" as const
		case 2:
			return "yellow" as const
		case 3:
			return "cyan" as const
		case 4:
			return "geekblue" as const
		case 5:
			return "lime" as const
		case 6:
			return "blue" as const
		default:
			return "default" as const
	}
}

const MarketPaymentsStatistic: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/",
	})
	const { xs } = useResponsive()

	const [dateType, setDateType] = useState(1)
	const [date, setDate] = useState(() => dayjs())

	const { data: market } = useGetMarketsByIdQuery(marketId)

	const isNotRestrooms = useMemo(
		() => market?.data?.restrooms_count === 0,
		[market?.data?.restrooms_count]
	)
	const isNotCarParks = useMemo(
		() =>
			market?.data?.shoppingCarParks === 0 &&
			market?.data?.market_car_parks_count === 0,
		[market?.data?.shoppingCarParks, market?.data?.market_car_parks_count]
	)

	const dates = useMemo(() => {
		if (dateType === 2)
			return {
				from_date: date?.startOf("month")?.format("YYYY-MM-DD"),
				to_date: date?.endOf("month")?.format("YYYY-MM-DD"),
			}
		if (dateType === 3)
			return {
				from_date: date?.startOf("year")?.format("YYYY-MM-DD"),
				to_date: date?.endOf("year")?.format("YYYY-MM-DD"),
			}
		return {
			from_date: date?.format("YYYY-MM-DD"),
			to_date: date?.format("YYYY-MM-DD"),
		}
	}, [date, dateType])

	const { data: statisticOveralls } = useGetStatisticsOverallQuery({
		market_id: marketId,
		...dates,
	})

	const filteredStatisticData = useMemo(
		() =>
			statisticOveralls?.data?.filter((el) => {
				if (isNotRestrooms && el?.number === 5) return el?.number !== 5
				if (isNotCarParks && el?.number === 6) return el?.number !== 6
				return el
			}) || [],
		[isNotCarParks, isNotRestrooms, statisticOveralls?.data]
	)

	const statisticData = useMemo(
		() =>
			filteredStatisticData.map((el) => ({
				title: `${el.name}`,
				color: getColor(el.number),
				icon: getIcon(el.number),
				count: Number(el?.amount) || 0,
			})),
		[filteredStatisticData]
	)

	const statisticTotalData = useMemo(
		() =>
			statisticOveralls?.data?.reduce(
				(total, item) => total + (Number(item.amount) || 0),
				0
			) || 0,
		[statisticOveralls?.data]
	)

	return (
		<>
			<PageHeader
				title={"Bazar tusimleri"}
				extra={
					<Space>
						<Segmented
							value={dateType}
							onChange={setDateType}
							options={[
								{
									value: 1,
									label: "Kunlik",
								},
								{
									value: 2,
									label: "Ayliq",
								},
								{
									value: 3,
									label: "Jilliq",
								},
							]}
						/>
						<DatePickerWithNow
							picker={
								{
									1: "date" as const,
									2: "month" as const,
									3: "year" as const,
								}[dateType] || "date"
							}
							value={date}
							onChange={setDate}
							onToday={setDate}
						/>
					</Space>
				}
			/>
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				{statisticData.map((item, index) => (
					<Col
						xs={24}
						md={filteredStatisticData.length <= 4 ? 12 : 8}
						key={index}
					>
						<Card>
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
								style={{ flexShrink: 0, textAlign: "center", marginTop: 16 }}
							>
								<CountUp end={item.count} />
							</Title>
						</Card>
					</Col>
				))}
				<Col span={24}>
					<Card>
						<Flex
							gap={16}
							vertical={xs}
							align={"center"}
							justify={"space-between"}
							wrap={true}
						>
							<Flex
								gap={16}
								align={"center"}
							>
								<TagIcon
									color={"magenta"}
									icon={<DollarOutlined />}
								/>
								<Title
									level={4}
									title={"Uliwma tusim summa"}
									style={{
										whiteSpace: "wrap",
										textOverflow: "ellipsis",
										overflow: "hidden",
									}}
								>
									Uliwma tusim summa
								</Title>
							</Flex>
							<Title
								level={1}
								style={{ flexShrink: 0 }}
							>
								<CountUp end={statisticTotalData} />
							</Title>
						</Flex>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export { MarketPaymentsStatistic }
