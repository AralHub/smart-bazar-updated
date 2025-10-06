import { useParams } from "@tanstack/react-router"
import { type FC, useState } from "react"
import { useEmployeesColumns } from "src/pages/employees/hooks"
import {
	type Employee,
	useGetEmployeesQuery,
} from "src/services/dashboard/employees"
import { useTablePagination } from "src/shared/hooks"
import { InputSearch, Table } from "src/shared/ui"
import { AddButton } from "src/widgets/actions"

const EmployeesTable: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/employees",
	})
	const { current, pageSize, onChange } = useTablePagination({
		current: 1,
		pageSize: 10,
	})
	const [search, setSearch] = useState("")

	const {
		data: employees,
		isLoading,
		isFetching,
	} = useGetEmployeesQuery({
		market_id: marketId,
		page: current,
		per_page: pageSize,
		search,
	})

	const columns = useEmployeesColumns()

	return (
		<>
			<Table<Employee>
				rowKey={"id"}
				title={
					<InputSearch
						value={search}
						onChange={setSearch}
					/>
				}
				loading={isLoading || isFetching}
				extra={<AddButton />}
				dataSource={employees?.data}
				columns={columns}
				pagination={{
					total: employees?.meta?.total,
					current,
					pageSize,
					onChange,
				}}
			/>
		</>
	)
}

export { EmployeesTable }
