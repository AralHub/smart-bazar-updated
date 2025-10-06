import type { Dayjs } from "dayjs"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Card, Charts } from "src/shared/ui"
import { formatPrice } from "src/shared/utils"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { paymentsByMonthsOption } from "./payments-by-months.option.ts"

interface PaymentsByYearBarChartProps {
	value: number[]
	title: string
	color: string[]
	loading?: boolean
	date: Dayjs
	onChangeDate: (date: Dayjs) => void

	values?: number[][]
	labels?: string[]
}

const PaymentsByMonthsBarChart: FC<PaymentsByYearBarChartProps> = ({
	title,
	color,
	value,
	loading,
	date,
	onChangeDate,
	values,
	labels,
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
							width: 100,
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
						...paymentsByMonthsOption,
						color,
						series:
							values && values?.length
								? values.map((el, index) => ({
										data: el,
										type: "bar",
										stack: "total",
										barWidth: "50%",
										itemStyle: {
											borderRadius: [
												index === values.length - 1 ? token.borderRadiusSM : 0,
												index === values.length - 1 ? token.borderRadiusSM : 0,
												0,
												0,
											],
										},
										name: labels ? labels[index] : `Tusim summa ${index + 1}`,
										label: {
											show: index === values.length - 1, // Только на последнем
											position: "top",
											rotate: 45,
											formatter: (params: { name: string }) => {
												const total = values[0].map((_, i) =>
													values.reduce((sum, arr) => sum + arr[i], 0)
												)
												return formatPrice(total[Number(params.name) - 1])
											},
										},
									}))
								: [
										{
											data: value?.length
												? value
												: Array.from({ length: 12 }).map(() => 0),
											type: "bar",
											itemStyle: {
												borderRadius: [
													token.borderRadiusSM,
													token.borderRadiusSM,
													0,
													0,
												],
											},
											barWidth: "50%",
											name: "Tusim summa",
										},
									],
					}}
				/>
			</Card>
		</>
	)
}

export { PaymentsByMonthsBarChart }
