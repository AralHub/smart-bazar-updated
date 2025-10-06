import {
	ArrowLeftOutlined,
	ClearOutlined,
	DollarOutlined,
	HomeOutlined,
	ManOutlined,
	TeamOutlined,
	WomanOutlined,
} from "@ant-design/icons"
import { Link, useNavigate, useRouter, useSearch } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useEffect, useState } from "react"
import { useGetStatisticsRestroomsQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Button, Col, Flex, Row, Tooltip } from "src/shared/ui"
import { CardCount } from "src/widgets/card-count"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { PageHeader } from "src/widgets/page-header"
import { RestroomsPaymentsChart } from "./charts"
import { RestroomsPaymentsForm } from "./forms"
import { RestroomsPaymentsTable } from "./tables"

const RestroomsDashboard: FC = () => {
	const { date } = useSearch({
		from: "/_map-layout/restrooms-dashboard/",
	})
	const navigate = useNavigate({
		from: "/restrooms-dashboard",
	})
	const { history } = useRouter()
	const { token } = useToken()
	const [currentDate, setCurrentDate] = useState(() =>
		dayjs.isDayjs(date) ? dayjs(date) : dayjs()
	)

	const { data: toilets } = useGetStatisticsRestroomsQuery({
		date,
	})

	useEffect(() => {
		if (dayjs.isDayjs(date)) return
		navigate({
			to: ".",
			search: {
				date: currentDate.format("YYYY-MM-DD"),
			},
			replace: true,
		})
	}, [currentDate, date, navigate])
	return (
		<>
			<PageHeader
				title={"Hájetxanalar statistika"}
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
						key: "/restrooms-dashboard",
						title: "Hájetxanalar statistika",
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
						title={"Hájetxanalar sani"}
						value={toilets?.data?.restrooms_count || 0}
						extra={
							<ClearOutlined
								style={{
									fontSize: 32,
									color: token.colorPrimary,
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
						value={toilets?.data?.total_amount || 0}
						extra={
							<DollarOutlined
								style={{
									fontSize: 32,
									color: token.colorPrimary,
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
						value={toilets?.data?.total_visits_count || 0}
						extra={
							<TeamOutlined
								style={{
									fontSize: 32,
									color: token.colorPrimary,
								}}
							/>
						}
					/>
				</Col>
			</Row>
			<Row
				gutter={24}
				style={{
					rowGap: 24,
				}}
			>
				<Col
					xs={24}
					md={16}
				>
					<RestroomsPaymentsTable />
				</Col>
				<Col
					xs={24}
					md={8}
				>
					<Flex
						vertical={true}
						gap={24}
					>
						<CardCount
							title={"Erkekler sani"}
							value={toilets?.data?.male_visits_count || 0}
							extra={
								<ManOutlined
									style={{
										fontSize: 32,
										color: token.colorPrimary,
									}}
								/>
							}
						/>
						<CardCount
							title={"Hayallar sani"}
							value={toilets?.data?.female_visits_count || 0}
							extra={
								<WomanOutlined
									style={{
										fontSize: 32,
										color: token.colorPrimary,
									}}
								/>
							}
						/>
					</Flex>
				</Col>
			</Row>
			<RestroomsPaymentsForm />
			<RestroomsPaymentsChart />
		</>
	)
}

export { RestroomsDashboard }
