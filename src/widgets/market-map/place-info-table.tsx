import { useSearch } from "@tanstack/react-router"
import type { TableColumnsType } from "antd"
import { type FC, useEffect, useMemo } from "react"
import {
	type Payment,
	useGetPaymentsQuery,
} from "src/services/dashboard/payments"
import { useTablePagination } from "src/shared/hooks"
import { Table } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils"
import { CheckPrintButton } from "src/widgets/check"

interface PlaceInfoTableProps {
	data?: {
		place?: string
		block?: string
	}
}

const PlaceInfoTable: FC<PlaceInfoTableProps> = ({ data }) => {
	const { date } = useSearch({
		strict: false,
	})

	const { current, pageSize, onChange } = useTablePagination({
		current: 1,
		pageSize: 10,
	})

	const {
		data: payments,
		isFetching,
		isLoading,
		refetch,
	} = useGetPaymentsQuery(
		{
			place_id: data?.place,
			block_id: data?.block,
			page: current,
			per_page: pageSize,
			date: data?.block ? date : undefined,
		},
		{
			enabled: !!(data?.place || data?.block),
		}
	)

	const columns: TableColumnsType<Payment> = useMemo(
		() => [
			{
				title: "№",
				dataIndex: "index",
				key: "index",
				render: (_v, _r, index) => index + 1,
			},
			{
				align: "center",
				title: "Orin sani",
				dataIndex: "quantity",
				hidden: !!data?.place,
				key: "quantity",
			},
			{
				title: "Tolem pul",
				dataIndex: "amount",
				key: "amount",
				render: formatPriceWithCurrency,
			},
			{
				title: "Tolem turi",
				dataIndex: "payment_method_name",
				key: "payment_method_name",
			},
			{
				title: "Sane",
				dataIndex: "date",
				key: "date",
			},
			{
				title: "Tolengen sane",
				dataIndex: "created_at",
				key: "created_at",
			},
			{
				fixed: "right",
				align: "center",
				width: 50,
				title: "",
				key: "action",
				render: (_v, record) => (
					<>
						<CheckPrintButton data={record} />
					</>
				),
			},
		],
		[data?.place]
	)

	const dataSource = useMemo(() => {
		if (!data?.block && !data?.place) return []
		if (!payments?.data) return []
		return payments?.data
	}, [data?.block, data?.place, payments?.data])

	useEffect(() => {
		if (data?.block || data?.place) {
			refetch()
		}
	}, [data?.block, data?.place, refetch])
	return (
		<>
			<Table
				rowKey={"id"}
				size={"small"}
				dataSource={dataSource}
				loading={isFetching || isLoading}
				columns={columns}
				pagination={{
					total: payments?.meta?.total,
					current,
					pageSize,
					onChange,
				}}
			/>
		</>
	)
}

export { PlaceInfoTable }
