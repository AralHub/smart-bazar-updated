import dayjs, { type Dayjs } from "dayjs"
import { type FC, useMemo, useState } from "react"
import { useMarketsGeneralAnnualIncomeColumns } from "src/pages/markets-dashboard/hooks"
import {
	type StatisticGeneralAnnualIncome,
	useGetStatisticsGeneralAnnualIncomeQuery,
} from "src/services/statistics"
import {
	Segmented,
	Table,
	TableSummary,
	TableSummaryCell,
	TableSummaryRow,
} from "src/shared/ui"
import {
	formatNumber,
	formatPrice,
	generateExcelHeaders,
} from "src/shared/utils"
import { ExcelButton } from "src/widgets/actions"
import { RangePickerWithNow } from "src/widgets/date-picker-with-now"

const MarketsGeneralAnnualIncomeTable: FC = () => {
	const [dates, setDates] = useState<[Dayjs, Dayjs]>(() => [
		dayjs().startOf("month"),
		dayjs().endOf("month"),
	])
	const [picker, setPicker] = useState<"year" | "month" | "date">("date")

	const {
		data: generalAnnualIncome,
		isLoading,
		isFetching,
	} = useGetStatisticsGeneralAnnualIncomeQuery({
		from_date: dates?.[0]?.startOf(picker).format("YYYY-MM-DD"),
		to_date: dates?.[1]?.endOf(picker).format("YYYY-MM-DD"),
	})

	const dataSource: StatisticGeneralAnnualIncome[] = useMemo(() => {
		if (!generalAnnualIncome?.data) return []

		return generalAnnualIncome.data
	}, [generalAnnualIncome?.data])

	const totals = useMemo(() => {
		return [
			dataSource.reduce(
				(total, item) =>
					total + formatNumber(item?.payment_types?.[0]?.payments_sum_amount),
				0
			),
			dataSource.reduce(
				(total, item) =>
					total + formatNumber(item?.payment_types?.[1]?.payments_sum_amount),
				0
			),
			dataSource.reduce(
				(total, item) =>
					total + formatNumber(item?.payment_types?.[2]?.payments_sum_amount),
				0
			),
			dataSource.reduce(
				(total, item) =>
					total +
					formatNumber(
						item?.services?.reduce(
							(childTotal, childItem) =>
								childTotal + formatNumber(childItem?.payments_sum_amount),
							0
						)
					),
				0
			),
			dataSource.reduce(
				(total, item) => total + formatNumber(item?.car_parks),
				0
			),
			dataSource.reduce(
				(total, item) => total + formatNumber(item?.restrooms),
				0
			),
			dataSource.reduce(
				(total, item) => total + formatNumber(item?.total_amount),
				0
			),
		]
	}, [dataSource])

	const columns = useMarketsGeneralAnnualIncomeColumns()

	const headers = generateExcelHeaders(columns.slice(1))
	return (
		<>
			<Table
				title={"Bazarlar period daramatlar"}
				extra={[
					<Segmented
						key={"picker"}
						value={picker}
						onChange={setPicker}
						options={[
							{
								value: "year" as const,
								label: "Jilliq",
							},
							{
								value: "month" as const,
								label: "Ayliq",
							},
							{
								value: "date" as const,
								label: "Kunlik",
							},
						]}
					/>,
					<RangePickerWithNow
						key={"date"}
						picker={picker}
						value={dates}
						onChange={(value) => {
							if (!value) return
							const [start, end] = value
							if (start && end) {
								setDates([start, end])
							}
						}}
						onToday={setDates}
					/>,
					<ExcelButton
						key={"excel"}
						data={{
							data: {
								headers,
								values: dataSource.map((value) => [
									value.market_name,
									formatNumber(value?.payment_types?.[0]?.payments_sum_amount),
									formatNumber(value?.payment_types?.[1]?.payments_sum_amount),
									formatNumber(value?.payment_types?.[2]?.payments_sum_amount),
									formatNumber(
										value?.services?.reduce(
											(total, item) =>
												total + formatNumber(item?.payments_sum_amount),
											0
										)
									),
									formatNumber(value?.car_parks),
									formatNumber(value?.restrooms),
									formatNumber(value?.total_amount),
								]),
								merges: ["A1:A2", "B1:D1", "E1:E2", "F1:F2", "G1:G2", "H1:H2"],
								totals: [[`${columns?.at(-1)?.title?.toString()}`, ...totals]],
							},
							name: "Bazarlar jilliq daramatlar",
						}}
					/>,
				]}
				bordered={true}
				loading={isLoading || isFetching}
				dataSource={dataSource}
				rowKey={"id"}
				columns={columns}
				pagination={false}
				summary={() => (
					<TableSummary fixed={"bottom"}>
						<TableSummaryRow
							style={{ fontWeight: "bold", textAlign: "center" }}
						>
							<TableSummaryCell index={0}></TableSummaryCell>
							<TableSummaryCell index={1}>Jami</TableSummaryCell>
							{totals.map((total, index) => (
								<TableSummaryCell
									index={index + 2}
									key={index}
								>
									{formatPrice(total)}
								</TableSummaryCell>
							))}
						</TableSummaryRow>
					</TableSummary>
				)}
			/>
		</>
	)
}

export { MarketsGeneralAnnualIncomeTable }
