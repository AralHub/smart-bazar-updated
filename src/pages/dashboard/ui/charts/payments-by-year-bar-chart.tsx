import type { Dayjs } from "dayjs"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Card, Charts } from "src/shared/ui"
import { formatPrice } from "src/shared/utils"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { paymentsByYearOption } from "./payments-by-year.option.ts"

interface PaymentsByYearBarChartProps {
	title: string
	color: string[]
	value: number[]
	loading?: boolean
	date: Dayjs
	onChangeDate: (date: Dayjs) => void
}

const PaymentsByYearBarChart: FC<PaymentsByYearBarChartProps> = ({
	title,
	color,
	value,
	date,
	onChangeDate,
	loading,
}) => {
	const { token } = useToken()

	return (
		<>
			<Card
				title={title}
				extra={
					<DatePickerWithNow
						picker={"year"}
						value={date}
						format={"YYYY"}
						style={{
							width: 80,
						}}
						onChange={onChangeDate}
						onToday={onChangeDate}
						allowClear={false}
					/>
				}
			>
				<Charts
					loading={loading}
					option={{
						...paymentsByYearOption,
						color,
						xAxis: {
							type: "category",
							data: [date.format("YYYY")],
						},
						series: [
							{
								data: value?.length ? value : [0],
								type: "bar",
								itemStyle: {
									borderRadius: [token.borderRadius, token.borderRadius, 0, 0],
								},
								barWidth: "50%",
								name: "Tusim summa",
								label: {
									show: true,
									formatter: (params) => {
										return formatPrice(params?.data)
									},
								},
							},
						],
					}}
				/>
			</Card>
		</>
	)
}

export { PaymentsByYearBarChart }
