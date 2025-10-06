import dayjs from "dayjs"
import { type FC, useMemo, useState } from "react"
import { useMarketsGeneralMonthlyIncomeColumns } from "src/pages/markets-dashboard/hooks"
import {
	type StatisticGeneralMonthlyIncome,
	useGetStatisticsGeneralMonthlyIncomeQuery,
} from "src/services/statistics"
import {
	Table,
	TableSummary,
	TableSummaryCell,
	TableSummaryRow,
} from "src/shared/ui"
import { formatPrice, generateExcelHeaders } from "src/shared/utils"
import { ExcelButton } from "src/widgets/actions"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"

function calculateDiff(oldValue: number, newValue: number) {
	const diff = newValue - oldValue
	const percent = oldValue === 0 ? 0 : (diff / oldValue) * 100

	return { diff, percent }
}

const MarketsGeneralMonthlyIncomeTable: FC = () => {
	const [date, setDate] = useState(() => dayjs())

	const {
		data: annualIncome,
		isLoading,
		isFetching,
	} = useGetStatisticsGeneralMonthlyIncomeQuery({
		date: date.format("YYYY"),
	})

	const dataSource: StatisticGeneralMonthlyIncome[] = useMemo(() => {
		const sortedData =
			annualIncome?.data?.sort(
				(prev, next) => prev.specialty - next.specialty
			) || []

		return sortedData.map((el) => ({
			...el,
			year: date.format("YYYY"),
			total_amount: el?.months?.reduce(
				(total, month) => total + (Number(month?.amount) || 0),
				0
			),
			months: el.months.map((month) => ({
				...month,
				diff_amount: month?.report_amount
					? calculateDiff(Number(month.report_amount), Number(month.amount))
							.diff
					: null,
				diff_percent: month?.report_amount
					? calculateDiff(Number(month.report_amount), Number(month.amount))
							.percent
					: null,
			})),
		}))
	}, [annualIncome?.data, date])

	const totals = useMemo(() => {
		const monthsData = dataSource.map((el) => el.months)
		const result = Array.from({ length: 12 }).flatMap((_, i) => {
			const month = i + 1

			const reportAmount = monthsData.reduce((sum, group) => {
				const item = group.find((el) => el.name === month)
				return sum + (item?.report_amount ?? 0)
			}, 0)
			const amount = monthsData.reduce((sum, group) => {
				const item = group.find((el) => el.name === month)
				return sum + (item?.amount ?? 0)
			}, 0)

			const { diff, percent } = calculateDiff(reportAmount, amount)
			return [reportAmount, amount, diff, percent]
		})
		result.push(
			dataSource.reduce((total, item) => total + (item?.total_amount || 0), 0)
		)
		return result
	}, [dataSource])

	const columns = useMarketsGeneralMonthlyIncomeColumns()

	const headers = generateExcelHeaders(columns.slice(1))
	return (
		<>
			<Table
				title={"Bazarlar jilliq daramatlar"}
				extra={[
					<DatePickerWithNow
						key={"date"}
						picker={"year"}
						value={date}
						onChange={setDate}
						onToday={setDate}
					/>,
					<ExcelButton
						key={"excel"}
						data={{
							data: {
								headers,
								values: dataSource.map((el) => [
									el.name,
									...Array.from({ length: 12 })
										.map((_, index) => index + 1)
										.flatMap((name) => [
											el?.months?.find((el) => el?.name === name)
												?.report_amount || 0,
											el?.months?.find((el) => el?.name === name)?.amount || 0,
											el?.months?.find((el) => el?.name === name)
												?.diff_amount || 0,
											el?.months?.find((el) => el?.name === name)
												?.diff_percent || 0,
										]),
									el?.total_amount || 0,
								]),
								merges: [
									"A1:A2",
									"B1:B2",
									"C1:C2",
									"D1:E1",

									"F1:F2",
									"G1:G2",
									"H1:I1",

									"J1:J2",
									"K1:K2",
									"L1:M1",

									"N1:N2",
									"O1:O2",
									"P1:Q1",

									"R1:R2",
									"S1:S2",
									"T1:U1",

									"V1:V2",
									"W1:W2",
									"X1:Y1",

									"Z1:Z2",
									"AA1:AA2",
									"AB1:AC1",

									"AD1:AD2",
									"AE1:AE2",
									"AF1:AG1",

									"AH1:AH2",
									"AI1:AI2",
									"AJ1:AK1",

									"AL1:AL2",
									"AM1:AM2",
									"AN1:AO1",

									"AP1:AP2",
									"AQ1:AQ2",
									"AR1:AS1",

									"AT1:AT2",
									"AU1:AU2",
									"AV1:AW1",
								],
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
						<TableSummaryRow style={{ fontWeight: "bold" }}>
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

export { MarketsGeneralMonthlyIncomeTable }
