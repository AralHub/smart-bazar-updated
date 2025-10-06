import { useSearch } from "@tanstack/react-router"
import { type FC } from "react"
import { useRestroomsPaymentsColumns } from "src/pages/restrooms-dashboard/hooks"
import {
	type StatisticsRestroom,
	useGetStatisticsRestroomsQuery,
} from "src/services/statistics"
import { Table } from "src/shared/ui"

const RestroomsPaymentsTable: FC = () => {
	const { date } = useSearch({
		from: "/_map-layout/restrooms-dashboard/",
	})
	const { data: toilets, isLoading } = useGetStatisticsRestroomsQuery({
		date,
	})
	const columns = useRestroomsPaymentsColumns()
	return (
		<>
			<Table<StatisticsRestroom>
				rowKey={"id"}
				loading={isLoading}
				title={"Tusimler boyinsha reyting"}
				dataSource={toilets?.data?.restrooms}
				columns={columns}
				pagination={{
					pageSize: 10,
				}}
			/>
		</>
	)
}

export { RestroomsPaymentsTable }
