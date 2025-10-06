import {
	ArrowLeftOutlined,
	DollarOutlined,
	HomeOutlined,
	ProductOutlined,
	ShopOutlined,
} from "@ant-design/icons"
import { Link, useRouter, useSearch } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useState } from "react"
import { useGetStatisticsGeneralQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Button, Col, Row, Tooltip } from "src/shared/ui"
import { CardCount } from "src/widgets/card-count"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { PageHeader } from "src/widgets/page-header"
import { MarketPlanForm } from "./forms"
import {
	MarketsAboutTable,
	MarketsGeneralAnnualIncomeTable,
	MarketsGeneralComparisonTable,
	MarketsGeneralMonthlyIncomeTable,
} from "./tables"

const MarketsDashboard: FC = () => {
	const { date } = useSearch({
		from: "/_map-layout/markets-dashboard/",
	})
	const { history } = useRouter()
	const [currentDate, setCurrentDate] = useState(() =>
		dayjs.isDayjs(date) ? dayjs(date) : dayjs()
	)

	const { data: general } = useGetStatisticsGeneralQuery({
		date: currentDate.format("YYYY-MM-DD"),
	})

	const { token } = useToken()

	return (
		<>
			<PageHeader
				title={"Bazarlar statistika"}
				breadcrumbs={[
					{
						key: "/",
						title: (
							<Link to={"/"}>
								<HomeOutlined /> Bas bet
							</Link>
						),
					},
					{
						key: "/markets-dashboard",
						title: "Bazarlar statistika",
					},
				]}
				extra={[
					<Tooltip
						title={"Artqa"}
						key={"back"}
					>
						<Button
							type={"primary"}
							onClick={() => history.back()}
							icon={<ArrowLeftOutlined />}
						/>
					</Tooltip>,
					<DatePickerWithNow
						allowClear={false}
						key={"date"}
						size={"large"}
						value={currentDate}
						onChange={setCurrentDate}
						onToday={setCurrentDate}
					/>,
				]}
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
						title={"Diyxan bazarlar sani"}
						value={general?.data?.farmer_market_count || 0}
						extra={
							<ShopOutlined
								style={{
									fontSize: 32,
									color: token.purple,
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
						value={general?.data?.total_amount || 0}
						extra={
							<DollarOutlined
								style={{
									fontSize: 32,
									color: token.purple,
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
						title={"Sawda kompleksler sani"}
						value={general?.data?.shopping_mall_count || 0}
						extra={
							<ProductOutlined
								style={{
									fontSize: 32,
									color: token.purple,
								}}
							/>
						}
					/>
				</Col>
			</Row>
			<MarketsAboutTable />
			<MarketsGeneralAnnualIncomeTable />
			<MarketsGeneralMonthlyIncomeTable />
			<MarketPlanForm />
			<MarketsGeneralComparisonTable />
		</>
	)
}

export { MarketsDashboard }
