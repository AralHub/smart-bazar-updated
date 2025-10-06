import dayjs, { type Dayjs } from "dayjs"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Card, Charts } from "src/shared/ui"
import { formatPrice } from "src/shared/utils"
import { RangePickerWithNow } from "src/widgets/date-picker-with-now"
import { paymentsByDaysOption } from "./payments-by-days.option.ts"

interface PaymentsByYearBarChartProps {
	value: number[]
	title: string
	color: string[]
	loading?: boolean
	dates: [Dayjs | null, Dayjs | null]
	onChangeDates: (dates: [Dayjs | null, Dayjs | null]) => void

	categories?: (number | string)[]
	values?: number[][]
	labels?: string[]
}

const PaymentsByDaysBarChart: FC<PaymentsByYearBarChartProps> = ({
	title,
	color,
	loading,
	dates,
	onChangeDates,
	value,
	categories,
	values,
	labels,
}) => {
	const { token } = useToken()

	return (
		<>
			<Card
				title={title}
				extra={
					<RangePickerWithNow
						value={dates}
						format={"D - MMMM"}
						onChange={(value) => {
							if (value) {
								onChangeDates(value)
							}
						}}
						onToday={onChangeDates}
						allowClear={false}
					/>
				}
			>
				<Charts
					loading={loading}
					option={{
						...paymentsByDaysOption,
						color,
						xAxis: {
							type: "category",
							data: categories
								? categories
								: value?.length
									? value.map((_v, index) => index + 1)
									: Array.from({
											length: dates?.[0]?.daysInMonth() || 30,
										}).map((_v, index) => index + 1),
							axisLabel: {
								rotate: categories ? 45 : 0,
								formatter: (value) => {
									if (!isNaN(Number(value))) return value
									return dayjs(value).format("MM-DD")
								},
							},
						},
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
												: Array.from({
														length: dates?.[0]?.daysInMonth() || 30,
													}).map(() => 0),
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

export { PaymentsByDaysBarChart }
