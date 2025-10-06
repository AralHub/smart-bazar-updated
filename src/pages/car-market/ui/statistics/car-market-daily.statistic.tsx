import {
	CarFilled,
	DollarCircleFilled,
	RetweetOutlined,
} from "@ant-design/icons"
import { useSearch } from "@tanstack/react-router"
import { useResponsive } from "antd-style"
import { type FC, useMemo } from "react"
import { useGetCarParksDailyQuery } from "src/services/dashboard/car-parks"
import { useToken } from "src/shared/hooks"
import { Card, Col, Count, Flex, Row, Title } from "src/shared/ui"

const CarMarketDailyStatistic: FC = () => {
	const { date, car_park } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/car-market",
	})
	const { md } = useResponsive()

	const { data: carParkingDaily } = useGetCarParksDailyQuery({
		date,
		car_park_id: car_park,
	})
	const { token } = useToken()

	const carParkingStatistics = useMemo(() => {
		return [
			{
				title: "Bir kúndegi jámi summa",
				icon: (
					<Flex gap={8}>
						<RetweetOutlined style={{ fontSize: 20 }} />
						<DollarCircleFilled
							style={{ color: token.colorPrimary, fontSize: 24 }}
						/>
					</Flex>
				),
				value: carParkingDaily?.data?.total_amount || 0,
			},
			{
				title: "Bir kúndegi mashinalar aǵımı",
				icon: (
					<Flex gap={8}>
						<RetweetOutlined style={{ fontSize: 20 }} />
						<CarFilled style={{ color: token.colorPrimary, fontSize: 24 }} />
					</Flex>
				),
				value: carParkingDaily?.data?.attendances_count || 0,
			},
			{
				title: "Bir kúndegi mashinalar sanı",
				icon: <CarFilled style={{ color: token.colorPrimary, fontSize: 24 }} />,
				value: carParkingDaily?.data?.vehicles_count || 0,
			},
		]
	}, [
		carParkingDaily?.data?.attendances_count,
		carParkingDaily?.data?.total_amount,
		carParkingDaily?.data?.vehicles_count,
		token.colorPrimary,
	])

	return (
		<>
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				{carParkingStatistics.map((item, index) => (
					<Col
						key={index}
						span={24}
					>
						<Card
							title={item.title}
							extra={item.icon}
						>
							<Flex
								justify={"center"}
								align={"center"}
								style={{ aspectRatio: 3 / 2 }}
							>
								<Title style={{ fontSize: md ? 58 : 48 }}>
									<Count end={item?.value} />
								</Title>
							</Flex>
						</Card>
					</Col>
				))}
			</Row>
		</>
	)
}

export { CarMarketDailyStatistic }
