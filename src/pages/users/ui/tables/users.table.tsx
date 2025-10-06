import type { FC } from "react"
import { Table } from "src/shared/ui"
import { AddButton } from "src/widgets/actions"
import { useUsersColumns } from "../../hooks"
import { useTablePagination } from "src/shared/hooks"
import { useGetUsersQuery } from "src/services/dashboard/users"
import type { User } from "src/services/auth"

const UsersTable: FC = () => {
	const { current, onChange, pageSize } = useTablePagination({
		current: 1,
		pageSize: 10,
	})

	const {
		data: users,
		isLoading,
		isFetching,
	} = useGetUsersQuery({
		page: current,
		per_page: pageSize,
	})

	const columns = useUsersColumns()
	return (
		<>
			<Table<User>
				rowKey={"id"}
				title={"Paydalaniwshilar"}
				extra={<AddButton showChildren={true} />}
				columns={columns}
				loading={isLoading || isFetching}
				dataSource={users?.data}
				pagination={{
					current,
					onChange,
					pageSize,
					total: users?.meta?.total,
				}}
			/>
		</>
	)
}

export { UsersTable }
