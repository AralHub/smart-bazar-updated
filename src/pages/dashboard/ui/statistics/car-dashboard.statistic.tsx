import { CarOutlined, DollarOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useState } from "react"
import { useGetStatisticsCarParksQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Col, Row } from "src/shared/ui"
import { ParkingOutlined } from "src/shared/ui/icons"
import { CardCount } from "src/widgets/card-count"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { PageHeader } from "src/widgets/page-header"

const CarDashboardStatistic: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/dashboard",
	})
	const [date, setDate] = useState(() => dayjs())

	const { data: carParksStatistics } = useGetStatisticsCarParksQuery({
		market_id: marketId,
		date: date.format("YYYY-MM-DD"),
	})

	const { token } = useToken()

	return (
		<>
			<PageHeader
				title={"Avto turar orinlar statistika"}
				extra={
					<DatePickerWithNow
						value={date}
						format={"D-MMMM, YYYY-jil"}
						onChange={setDate}
						onToday={() => setDate(() => dayjs())}
					/>
				}
			/>
			<Row
				gutter={24}
				style={{
					rowGap: 24,
				}}
			>
				<Col
					xs={24}
					md={8}
				>
					<CardCount
						title={"Avto turar orinlar sani"}
						value={carParksStatistics?.data?.car_parks_count || 0}
						extra={
							<ParkingOutlined
								style={{
									fontSize: 32,
									color: token.cyan,
								}}
							/>
						}
					/>
				</Col>
				<Col
					xs={24}
					md={8}
				>
					<CardCount
						title={"Uliwmaliq tusim"}
						value={carParksStatistics?.data?.total_amount || 0}
						extra={
							<DollarOutlined
								style={{
									fontSize: 32,
									color: token.cyan,
								}}
							/>
						}
					/>
				</Col>
				<Col
					xs={24}
					md={8}
				>
					<CardCount
						title={"Mashinalar sani"}
						value={carParksStatistics?.data?.total_vehicle_count || 0}
						extra={
							<CarOutlined
								style={{
									fontSize: 32,
									color: token.cyan,
								}}
							/>
						}
					/>
				</Col>
			</Row>
		</>
	)
}

export { CarDashboardStatistic }
