import { useSearch } from "@tanstack/react-router"
import { type FC } from "react"
import { useRestroomsAttendancesColumns } from "src/pages/restrooms/hooks"
import {
	type RestroomAttendance,
	useGetRestroomsAttendancesQuery,
} from "src/services/dashboard/restrooms"
import { Image, Table } from "src/shared/ui"

const RestroomsAttendancesTable: FC = () => {
	const { restroom } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/restrooms",
	})

	const { data: restroomsAttendances, isLoading } =
		useGetRestroomsAttendancesQuery({
			restroom_id: restroom,
		})

	const columns = useRestroomsAttendancesColumns()

	return (
		<>
			<Image.PreviewGroup>
				<Table<RestroomAttendance>
					rowKey={"id"}
					dataSource={restroomsAttendances?.data}
					columns={columns}
					loading={isLoading}
				/>
			</Image.PreviewGroup>
		</>
	)
}

export { RestroomsAttendancesTable }
