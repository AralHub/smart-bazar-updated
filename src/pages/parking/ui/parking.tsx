import { CalendarOutlined } from "@ant-design/icons"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useEffect, useState } from "react"
import {
	useGetCarParksListAttendancesQuery,
	useGetCarParksQuery,
} from "src/services/dashboard/car-parks"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { Button, Col, DatePicker, Row, Select, Space } from "src/shared/ui"
import { formatNumber } from "src/shared/utils"
import { ExcelButton } from "src/widgets/actions"
import { PageHeader } from "src/widgets/page-header"
import { ParkingDailyStatistic } from "./statistics"
// import { ParkingCameraCard } from "./cards"
import { ParkingHistoryTable, ParkingVehiclesTable } from "./tables"

const Parking: FC = () => {
	const { districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/parking",
	})
	const search = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/parking",
	})
	const navigate = useNavigate()
	const [date, setDate] = useState(() =>
		search?.date ? dayjs(search?.date) : dayjs()
	)

	const { data: listAttendances, isLoading: listAttendancesLoading } =
		useGetCarParksListAttendancesQuery({
			date: date.format("YYYY-MM-DD"),
			car_park_id: search?.car_park,
		})

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/parking`,
			title: "Avto turar orınlar",
		},
	])

	const { data: carParks, isLoading: carParksLoading } = useGetCarParksQuery({
		type: 1,
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
				title={"Avto turar orınlar"}
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
					<ExcelButton
						loading={listAttendancesLoading || carParksLoading}
						disabled={listAttendancesLoading || carParksLoading}
						key={"excel"}
						data={{
							data: {
								headers: [
									["№", "Kún", "Mashina nomeri", "Waqıt", "Summa", "Sani"],
								],
								values:
									listAttendances?.data?.attendances?.map((car, index) => [
										index + 1,
										car?.date,
										car?.number,
										car?.time,
										car?.amount,
										1,
									]) || [],
								totals: [
									[
										"Jami",
										null,
										null,
										null,
										formatNumber(
											listAttendances?.data?.attendances?.reduce(
												(total, item) => total + formatNumber(item?.amount),
												0
											)
										),
										formatNumber(listAttendances?.data?.attendances?.length),
									],
								],
								merges: [],
							},
							name: `${carParks?.data?.find((el) => `${el.id}` === `${search?.car_park}`)?.name || "Bazar"}_Avto turar orin_${date.format("YYYY-MM-DD")}`,
						}}
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
					<ParkingDailyStatistic />
				</Col>
				<Col
					xs={24}
					md={16}
				>
					<ParkingHistoryTable />
				</Col>
			</Row>
			<ParkingVehiclesTable />
		</>
	)
}

export { Parking }
