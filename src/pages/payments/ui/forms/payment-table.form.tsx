import { Table } from "src/shared/ui"
import { usePaymentTableColumns } from "../../hooks/use-payment-table.columns"
import type { Place } from "src/services/dashboard/places"
import type { FC } from "react"

type PaymentTableProps = {
	data?: Place[]
	isLoading: boolean
}

export const PaymentTable: FC<PaymentTableProps> = ({ data, isLoading }) => {
	const { columns } = usePaymentTableColumns()
	return (
		<Table
			columns={columns}
			dataSource={data}
			rowKey={(res) => res.id}
			pagination={false}
			loading={isLoading}
			style={{ marginBottom: "20px" }}
		/>
	)
}
