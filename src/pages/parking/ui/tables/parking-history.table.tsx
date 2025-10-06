import { useSearch } from "@tanstack/react-router"
import { type FC } from "react"
import { useParkingHistoryColumns } from "src/pages/parking/hooks"
import {
	type CarParkAttendance,
	useGetCarParksAttendancesQuery,
} from "src/services/dashboard/car-parks"
import { useTablePagination } from "src/shared/hooks"
import { Table } from "src/shared/ui"

const ParkingHistoryTable: FC = () => {
	const { date, car_park } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/parking",
	})
	const { current, pageSize, onChange } = useTablePagination({
		current: 1,
		pageSize: 10,
	})

	const { data: carParkAttendances, isLoading } =
		useGetCarParksAttendancesQuery({
			date,
			car_park_id: car_park,
			page: current,
			per_page: pageSize,
		})

	const columns = useParkingHistoryColumns()

	return (
		<>
			<Table<CarParkAttendance>
				rowKey={"id"}
				title={"Kúnlik barıw tariyxı"}
				loading={isLoading}
				dataSource={carParkAttendances?.data}
				columns={columns}
				scroll={{
					y: 851,
				}}
				pagination={{
					total: carParkAttendances?.meta?.total || carParkAttendances?.total,
					current,
					pageSize,
					onChange,
				}}
			/>
		</>
	)
}

export { ParkingHistoryTable }
