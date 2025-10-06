import { useSearch } from "@tanstack/react-router"
import { type FC } from "react"
import { useParkingVehiclesColumns } from "src/pages/parking/hooks"
import {
	type CarParkVehicle,
	useGetCarParksVehiclesQuery,
} from "src/services/dashboard/car-parks"
import { useTablePagination } from "src/shared/hooks"
import { Table } from "src/shared/ui"

const ParkingVehiclesTable: FC = () => {
	const { date, car_park } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/parking",
	})
	const { current, pageSize, onChange } = useTablePagination({
		current: 1,
		pageSize: 10,
	})

	const { data: carParkVehicles, isLoading } = useGetCarParksVehiclesQuery({
		date,
		car_park_id: car_park,
		page: current,
		per_page: pageSize,
	})

	const columns = useParkingVehiclesColumns()

	return (
		<>
			<Table<CarParkVehicle>
				title={"Mashinalar topı"}
				loading={isLoading}
				dataSource={carParkVehicles?.data}
				columns={columns}
				pagination={{
					total: carParkVehicles?.meta?.total || carParkVehicles?.total,
					current,
					pageSize,
					onChange,
				}}
			/>
		</>
	)
}

export { ParkingVehiclesTable }
