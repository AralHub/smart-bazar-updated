import { useSearch } from "@tanstack/react-router"
import { type FC } from "react"
import { useCarMarketsPaymentsColumns } from "src/pages/car-markets-dashboard/hooks"
import {
	type StatisticsCarPark,
	useGetStatisticsCarParksQuery,
} from "src/services/statistics"
import { Table } from "src/shared/ui"

const CarMarketsPaymentsTable: FC = () => {
	const { date } = useSearch({
		from: "/_map-layout/car-markets-dashboard/",
	})
	const { data: carParks, isLoading } = useGetStatisticsCarParksQuery({
		date,
	})

	const columns = useCarMarketsPaymentsColumns()
	return (
		<>
			<Table<StatisticsCarPark>
				rowKey={"id"}
				loading={isLoading}
				title={"Tusimler boyinsha reyting"}
				dataSource={carParks?.data?.car_parks}
				columns={columns}
				pagination={{
					pageSize: 10,
				}}
			/>
		</>
	)
}

export { CarMarketsPaymentsTable }
