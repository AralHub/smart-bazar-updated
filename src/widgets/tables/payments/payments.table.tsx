import { useParams } from "@tanstack/react-router"
import type { Dayjs } from "dayjs"
import { type FC, useState } from "react"
import {
	type Payment,
	useGetPaymentsQuery,
} from "src/services/dashboard/payments"
import { useGetPaymentTypesQuery } from "src/services/dashboard/payments/payment-types"
import { useTablePagination } from "src/shared/hooks"
import { Flex, Table, Tabs } from "src/shared/ui"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { usePaymentsColumns } from "./payments.columns.tsx"
import { AddButton } from "src/widgets/actions/index.ts"

interface PaymentsTableProps {
	employeeId?: string
}

const PaymentsTable: FC<PaymentsTableProps> = ({ employeeId }) => {
	const { marketId } = useParams({
		strict: false,
	})
	const { current, pageSize, onChange } = useTablePagination({
		current: 1,
		pageSize: 10,
	})
	const [date, setDate] = useState<Dayjs>()
	const [paymentType, setPaymentType] = useState("")

	const { data: paymentTypes, isLoading: paymentTypesLoading } =
		useGetPaymentTypesQuery({
			market_id: marketId,
		})

	const {
		data: payments,
		isLoading,
		isFetching,
	} = useGetPaymentsQuery({
		market_id: marketId,
		page: current,
		per_page: pageSize,
		payment_type_id: paymentType,
		date: date?.format("YYYY-MM-DD"),
		employee_id: employeeId,
	})

	const columns = usePaymentsColumns(paymentType, !!employeeId)

	return (
		<>
			<Table<Payment>
				subExtra={
					<Flex
						vertical
						gap={10}
					>
						<Tabs
							tabBarExtraContent={
								<Flex gap={10}>
									<DatePickerWithNow
										format={"D-MMMM, YYYY-jil"}
										allowClear={true}
										value={date}
										onChange={setDate}
										onToday={setDate}
									/>
									<AddButton />
								</Flex>
							}
							style={{
								width: "100%",
							}}
							onChange={setPaymentType}
							activeKey={paymentType}
							items={[
								{
									key: "",
									label: paymentTypesLoading ? "Juklenmekte..." : "Hammesi",
								},
								...(paymentTypes?.data?.map((el) => ({
									key: `${el.id}`,
									label: el.name,
								})) || []),
							]}
						/>
					</Flex>
				}
				rowKey={"id"}
				loading={isLoading || isFetching}
				dataSource={payments?.data}
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

export { PaymentsTable }
