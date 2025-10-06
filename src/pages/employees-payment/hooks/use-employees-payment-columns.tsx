import { HistoryOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import type { ColumnsType } from "antd/es/table"
import type { EmployeePayment } from "src/services/dashboard/employees"
import { Button } from "src/shared/ui"
import { formatPhone, formatPrice } from "src/shared/utils"

export const useEmployeesPaymentColumns = () => {
	const columns: ColumnsType<EmployeePayment> = [
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
			title: "Tolemler sani",
			dataIndex: "payments_count",
			key: "payments_count",
		},
		{
			title: "Tolemler summa",
			dataIndex: "payments_sum_amount",
			key: "payments_sum_amount",
			render: formatPrice,
		},
		{
			align: "center",
			fixed: "right",
			width: 50,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Link
					from={"/d/$districtId/m/$marketId/employees-payment"}
					to={"./$employeeId"}
					params={{
						employeeId: `${record.id}`,
					}}
				>
					<Button
						type={"primary"}
						icon={<HistoryOutlined />}
					/>
				</Link>
			),
		},
	]

	return columns
}
