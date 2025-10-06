import type { TableColumnsType } from "antd"
import type { User } from "src/services/auth"
import { formatPhone } from "src/shared/utils"

export const useUsersColumns = () => {
	const columns: TableColumnsType<User> = [
		{
			width: 50,
			title: "№",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			title: "F.A.A",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Telefon nomer",
			dataIndex: "phone",
			key: "phone",
			render: formatPhone,
		},
		{
			title: "Bazar",
			dataIndex: ["market", "name"],
			key: "market",
		},
	]

	return columns
}
