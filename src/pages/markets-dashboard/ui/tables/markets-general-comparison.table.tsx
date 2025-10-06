import { css, cx } from "antd-style"
import dayjs from "dayjs"
import { type FC, useMemo, useState } from "react"
import { useMarketsGeneralComparisonColumns } from "src/pages/markets-dashboard/hooks"
import {
	type StatisticComparisonMonth,
	useGetStatisticsGeneralComparisonQuery,
} from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import {
	DatePicker,
	SpaceCompact,
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

const MarketsGeneralComparisonTable: FC = () => {
	const [startDate, setStartDate] = useState(() => dayjs().subtract(1, "month"))
	const [endDate, setEndDate] = useState(() => dayjs())
	const { token } = useToken()
	
	const {
		data: comparison,
		isLoading,
		isFetching,
	} = useGetStatisticsGeneralComparisonQuery({
		date_first: startDate.format("YYYY-MM"),
		date_second: endDate.format("YYYY-MM"),
	})

	const dataSource: StatisticComparisonMonth[] = useMemo(() => {
		if (!comparison) return []

		return (
			comparison.data.flatMap((compEl) => {
				const months = compEl.months.map((childEl, childIndex) => ({
					...childEl,
					is_date: true,
					market_name:
						childIndex === 0
							? childEl.market_id === compEl.market_id
								? compEl.market_name
								: null
							: null,
				}))
				const [startMonth, endMonth] = months
				months.push({
					market_id: null,
					is_date: false,
					market_name: null,
					name: "Parqi",
					payment_types: startMonth?.payment_types?.map((item) => ({
						...item,
						payments_sum_amount:
							formatNumber(item?.payments_sum_amount) -
							formatNumber(
								endMonth?.payment_types?.find((i) => i.id === item.id)
									?.payments_sum_amount
							),
					})),
					services: startMonth?.services?.map((item) => ({
						...item,
						payments_sum_amount:
							formatNumber(item?.payments_sum_amount) -
							formatNumber(
								endMonth?.services?.find((i) => i.id === item.id)
									?.payments_sum_amount
							),
					})),
					car_parks:
						formatNumber(startMonth?.car_parks) -
						formatNumber(endMonth?.car_parks),
					restrooms:
						formatNumber(startMonth?.restrooms) -
						formatNumber(endMonth?.restrooms),
					total_amount:
						formatNumber(startMonth?.total_amount) -
						formatNumber(endMonth?.total_amount),
				})
				return months
			}) || []
		)
	}, [comparison])

	const totals = useMemo(() => {
		const startMonthData = dataSource.filter(
			(item) => item.name === startDate.format("YYYY-MM")
		)
		const endMonthData = dataSource.filter(
			(item) => item.name === endDate.format("YYYY-MM")
		)
		const startMonthTotals = [
			startMonthData.reduce(
				(total, item) =>
					total + formatNumber(item?.payment_types?.[0]?.payments_sum_amount),
				0
			),
			startMonthData.reduce(
				(total, item) =>
					total + formatNumber(item?.payment_types?.[1]?.payments_sum_amount),
				0
			),
			startMonthData.reduce(
				(total, item) =>
					total + formatNumber(item?.payment_types?.[2]?.payments_sum_amount),
				0
			),
			startMonthData.reduce(
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
			startMonthData.reduce(
				(total, item) => total + formatNumber(item?.car_parks),
				0
			),
			startMonthData.reduce(
				(total, item) => total + formatNumber(item?.restrooms),
				0
			),
			startMonthData.reduce(
				(total, item) => total + formatNumber(item?.total_amount),
				0
			),
		]
		const endMonthTotals = [
			endMonthData.reduce(
				(total, item) =>
					total + formatNumber(item?.payment_types?.[0]?.payments_sum_amount),
				0
			),
			endMonthData.reduce(
				(total, item) =>
					total + formatNumber(item?.payment_types?.[1]?.payments_sum_amount),
				0
			),
			endMonthData.reduce(
				(total, item) =>
					total + formatNumber(item?.payment_types?.[2]?.payments_sum_amount),
				0
			),
			endMonthData.reduce(
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
			endMonthData.reduce(
				(total, item) => total + formatNumber(item?.car_parks),
				0
			),
			endMonthData.reduce(
				(total, item) => total + formatNumber(item?.restrooms),
				0
			),
			endMonthData.reduce(
				(total, item) => total + formatNumber(item?.total_amount),
				0
			),
		]
		const diffMonthTotal = startMonthTotals?.map(
			(value, index) => value - formatNumber(endMonthTotals?.[index])
		)
		return [startMonthTotals, endMonthTotals, diffMonthTotal]
	}, [dataSource, endDate, startDate])

	const columns = useMarketsGeneralComparisonColumns()

	const headers = generateExcelHeaders(columns.slice(1))
	return (
		<>
			<Table<StatisticComparisonMonth>
				title={"Bazarlar tusimler parqi"}
				extra={[
					<SpaceCompact key={"date"}>
						<DatePicker
							picker={"month"}
							format={"MMMM"}
							allowClear={false}
							value={startDate}
							onChange={setStartDate}
							disabledDate={(value) => {
								return value.get("month") === endDate.get("month")
							}}
						/>
						<DatePicker
							picker={"month"}
							format={"MMMM"}
							allowClear={false}
							value={endDate}
							onChange={setEndDate}
							disabledDate={(value) => {
								return value.get("month") === startDate.get("month")
							}}
						/>
					</SpaceCompact>,
					<ExcelButton
						key={"excel"}
						data={{
							data: {
								headers,
								values: dataSource.map((item) => [
									item?.market_name,
									item?.is_date ? dayjs(item?.name).format("MMMM") : item?.name,
									item?.payment_types?.[0]?.payments_sum_amount,
									item?.payment_types?.[1]?.payments_sum_amount,
									item?.payment_types?.[2]?.payments_sum_amount,
									item?.services?.reduce(
										(total, value) =>
											total + formatNumber(value?.payments_sum_amount),
										0
									),
									item?.car_parks,
									item?.restrooms,
									item?.total_amount,
								]),
								merges: [
									"A1:A2",
									"B1:B2",
									"C1:E1",
									"F1:F2",
									"G1:G2",
									"H1:H2",
									"I1:I2",
								],
								totals: totals.map((total, index) => [
									index === 0 ? "Jami" : null,
									index === 0
										? startDate.format("MMMM")
										: index === 1
											? endDate.format("MMMM")
											: index === 2
												? "Parqi"
												: null,
									...total,
								]),
							},
							name: "Bazarlar jilliq daramatlar",
						}}
					/>,
				]}
				bordered={true}
				loading={isLoading || isFetching}
				dataSource={dataSource}
				rowKey={(_, index) => Number(index) + 1}
				columns={columns}
				pagination={false}
				summary={() => (
					<TableSummary fixed={"bottom"}>
						{totals.map((totalList, index) => (
							<TableSummaryRow
								key={index}
								style={{ fontWeight: "bold" }}
							>
								<TableSummaryCell index={0}></TableSummaryCell>
								<TableSummaryCell
									index={1}
									rowSpan={index === 0 ? 3 : 0}
								>
									{index === 0 ? "Jami" : null}
								</TableSummaryCell>
								<TableSummaryCell index={1}>
									{index === 0
										? startDate.format("MMMM")
										: index === 1
											? endDate.format("MMMM")
											: index === 2
												? "Parqi"
												: null}
								</TableSummaryCell>
								{totalList.map((total, index) => (
									<TableSummaryCell
										index={index + 2}
										key={index}
										className={cx(css`
											color: ${total <= 0 ? token.red : token.colorText}
										`)}
									>
										{formatPrice(total)}
									</TableSummaryCell>
								))}
							</TableSummaryRow>
						))}
					</TableSummary>
				)}
			/>
		</>
	)
}

export { MarketsGeneralComparisonTable }
