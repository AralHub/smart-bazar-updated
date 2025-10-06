import { CalendarOutlined } from "@ant-design/icons"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useEffect, useState } from "react"
import { useGetCarParksQuery } from "src/services/dashboard/car-parks"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { Button, Col, DatePicker, Row, Select, Space } from "src/shared/ui"
import { PageHeader } from "src/widgets/page-header"
import { CarMarketDailyStatistic } from "./statistics"
// import { ParkingCameraCard } from "./cards"
import { CarMarketHistoryTable } from "./tables"

const CarMarket: FC = () => {
	const { districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/car-market",
	})
	const search = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/car-market",
	})
	const navigate = useNavigate()
	const [date, setDate] = useState(() =>
		search?.date ? dayjs(search?.date) : dayjs()
	)

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/car-market`,
			title: "Mashin bazarlar",
		},
	])

	const { data: carParks, isLoading: carParksLoading } = useGetCarParksQuery({
		type: 2,
		market_id: marketId,
		per_page: 1000,
	})

	useEffect(() => {
		const newSearch: Record<string, string | number | undefined> = {}
		if (!dayjs.isDayjs(search?.date)) {
			newSearch.date = date?.format("YYYY-MM-DD")
		}
		if (!carParks?.data?.find((el) => el.id === Number(search?.car_park))) {
			newSearch.car_park = carParks?.data?.[0]?.id
		}
		navigate({
			to: ".",
			replace: true,
			search: (prev) => ({
				...prev,
				...newSearch,
			}),
		})
	}, [carParks?.data, date, navigate, search?.car_park, search?.date])
	return (
		<>
			<PageHeader
				title={"Mashin bazarlar"}
				breadcrumbs={paths}
				extra={[
					<Space.Compact key={"Dates"}>
						<DatePicker
							allowClear={false}
							value={date}
							onChange={setDate}
						/>
						<Button
							type={"primary"}
							icon={<CalendarOutlined />}
							onClick={() => setDate(() => dayjs())}
						/>
					</Space.Compact>,
					<Select
						key={"carParks"}
						placeholder={"Mashin stoyanka"}
						value={search?.car_park}
						onChange={(value) => {
							navigate({
								to: ".",
								replace: true,
								search: (prev) => ({
									...prev,
									car_park: value,
								}),
							})
						}}
						loading={carParksLoading}
						disabled={carParksLoading}
						options={carParks?.data?.map((el) => ({
							value: el.id,
							label: el.name,
						}))}
					/>,
					// <Button
					// 	type={"primary"}
					// 	icon={<CloudDownloadOutlined />}
					// 	key={"Download"}
					// >
					// 	Juklep aliw
					// </Button>,
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
					<CarMarketDailyStatistic />
				</Col>
				<Col
					xs={24}
					md={16}
				>
					<CarMarketHistoryTable />
				</Col>
			</Row>
		</>
	)
}

export { CarMarket }
