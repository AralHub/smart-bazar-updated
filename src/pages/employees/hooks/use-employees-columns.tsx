import type { ColumnsType } from "antd/es/table"
import type { Employee } from "src/services/dashboard/employees"
import { Space } from "src/shared/ui"
import { formatPhone } from "src/shared/utils"
import { DeleteButton, EditButton } from "src/widgets/actions"

export const useEmployeesColumns = () => {
	const columns: ColumnsType<Employee> = [
		{
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			title: "FIO",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Telefon",
			dataIndex: "phone",
			key: "phone",
			render: formatPhone,
		},
		{
			title: "Lawazım",
			dataIndex: ["position", "name"],
			key: "position",
		},
		{
			title: "Tuwilgan sane",
			dataIndex: "birth_date",
			key: "birth_date",
		},
		{
			title: "Manzil",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Pasport nomeri",
			dataIndex: "pass_number",
			key: "pass_number",
		},
		{
			title: "PINFL",
			dataIndex: "tin",
			key: "tin",
		},
		{
			fixed: "right",
			width: 100,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<EditButton
						showChildren={false}
						params={record}
					/>
					<DeleteButton
						hiddenChildren={true}
						confirm={{
							onConfirm: () => void 0,
						}}
					/>
				</Space>
			),
		},
	]

	return columns
}
