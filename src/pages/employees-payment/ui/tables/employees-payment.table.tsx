import { useParams } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useState } from "react"
import { useEmployeesPaymentColumns } from "src/pages/employees-payment/hooks"
import { useGetEmployeesPaymentQuery } from "src/services/dashboard/employees"
import { InputSearch, Table } from "src/shared/ui"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"

const EmployeesPaymentTable: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/employees-payment/",
	})
	const [search, setSearch] = useState("")
	const [date, setDate] = useState(() => dayjs())

	const {
		data: employeesPayment,
		isLoading,
		isFetching,
	} = useGetEmployeesPaymentQuery({
		market_id: marketId,
		from_date: date.format("YYYY-MM-DD"),
		to_date: date.format("YYYY-MM-DD"),
		search,
	})

	const columns = useEmployeesPaymentColumns()
	return (
		<>
			<Table
				rowKey={"id"}
				title={
					<InputSearch
						value={search}
						onChange={setSearch}
					/>
				}
				extra={
					<DatePickerWithNow
						value={date}
						onChange={setDate}
						onToday={setDate}
					/>
				}
				dataSource={employeesPayment?.data}
				loading={isLoading || isFetching}
				columns={columns}
			/>
		</>
	)
}

export { EmployeesPaymentTable }
