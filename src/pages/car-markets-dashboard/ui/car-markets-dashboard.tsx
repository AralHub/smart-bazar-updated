import {
	ArrowLeftOutlined,
	CarOutlined,
	DollarOutlined,
	ExportOutlined,
	HomeOutlined,
} from "@ant-design/icons"
import { Link, useNavigate, useRouter, useSearch } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useEffect, useState } from "react"
import { CarMarketsWantedCarsForm } from "src/pages/car-markets-wanted-cars/ui/forms"
import { useGetStatisticsCarParksQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Button, Col, Row, Space, Tooltip } from "src/shared/ui"
import { ParkingOutlined } from "src/shared/ui/icons"
import { AddButton } from "src/widgets/actions"
import { CardCount } from "src/widgets/card-count"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { PageHeader } from "src/widgets/page-header"
import { CarMarketsPaymentsChart } from "./charts"
import { CarMarketsPaymentsForm } from "./forms"
import { CarMarketsPaymentsTable } from "./tables"

const CarMarketsDashboard: FC = () => {
	const { date } = useSearch({
		from: "/_map-layout/car-markets-dashboard/",
	})
	const navigate = useNavigate({
		from: "/car-markets-dashboard",
	})
	const { history } = useRouter()
	const { token } = useToken()
	const [currentDate, setCurrentDate] = useState(() =>
		dayjs.isDayjs(date) ? dayjs(date) : dayjs()
	)

	const { data: carParks } = useGetStatisticsCarParksQuery({
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
				title={"Avto turar orinlar statistika"}
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
						key: "/car-markets-dashboard",
						title: "Avto turar orinlar statistika",
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
						title={"Avto turar orinlar sani"}
						value={carParks?.data?.car_parks_count || 0}
						extra={
							<ParkingOutlined
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
						value={carParks?.data?.total_amount || 0}
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
						title={"Mashinalar sani"}
						value={carParks?.data?.total_vehicle_count || 0}
						extra={
							<CarOutlined
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
					<CarMarketsPaymentsTable />
				</Col>
				<Col
					xs={24}
					md={8}
				>
					<CarMarketsWantedCarsForm />
					<CardCount
						title={"Izlenip atırǵan mashinalar"}
						action={
							<div
								style={{
									width: "100%",
									paddingInline: 12,
								}}
							>
								<Button
									size={"large"}
									block={true}
									icon={<ExportOutlined />}
									type={"primary"}
									onClick={() =>
										navigate({
											to: "/car-markets-dashboard/wanted-cars",
										})
									}
								>
									Ashiw
								</Button>
							</div>
						}
						value={carParks?.data?.wanted_cars_count || 0}
						extra={
							<Space>
								<CarOutlined
									style={{
										fontSize: 32,
										color: token.colorWarning,
									}}
								/>
								<AddButton formKey={"primary"} />
							</Space>
						}
					/>
				</Col>
			</Row>
			{/*<CarMarketsDifferencesTable />*/}
			<CarMarketsPaymentsChart />
			<CarMarketsPaymentsForm />
		</>
	)
}

export { CarMarketsDashboard }
