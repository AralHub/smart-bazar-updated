import { ClearOutlined, DollarOutlined, TeamOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useState } from "react"
import { useGetStatisticsRestroomsQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Col, Row } from "src/shared/ui"
import { CardCount } from "src/widgets/card-count"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { PageHeader } from "src/widgets/page-header"

const RestroomDashboardStatistic: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/dashboard",
	})
	const [date, setDate] = useState(() => dayjs())

	const { data: restroomsStatistics } = useGetStatisticsRestroomsQuery({
		market_id: marketId,
		date: date.format("YYYY-MM-DD"),
	})

	const { token } = useToken()

	return (
		<>
			<PageHeader
				title={"Hájetxanalar statistika"}
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
						title={"Hájetxanalar sani"}
						value={restroomsStatistics?.data?.restrooms_count || 0}
						extra={
							<ClearOutlined
								style={{
									fontSize: 32,
									color: token.lime,
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
						value={restroomsStatistics?.data?.total_amount || 0}
						extra={
							<DollarOutlined
								style={{
									fontSize: 32,
									color: token.lime,
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
						title={"Adamlar sani"}
						value={restroomsStatistics?.data?.total_visits_count || 0}
						extra={
							<TeamOutlined
								style={{
									fontSize: 32,
									color: token.lime,
								}}
							/>
						}
					/>
				</Col>
			</Row>
		</>
	)
}

export { RestroomDashboardStatistic }
