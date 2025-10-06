import { useParams } from "@tanstack/react-router"
import { css, cx } from "antd-style"
import dayjs from "dayjs"
import { type FC, useMemo } from "react"
import type { ProfitData } from "src/pages/annual-income/ui/tables"
import { useMonthlyIncomeColumns } from "src/pages/monthly-income/hooks"
import { useGetStatisticsMonthlyIncomeQuery } from "src/services/statistics"
import {
	Table,
	TableSummary,
	TableSummaryCell,
	TableSummaryRow,
} from "src/shared/ui"
import { formatPrice } from "src/shared/utils"
import { ExcelButton } from "src/widgets/actions"

const headers = [
	[
		"Kun",
		"Bazar orinlar",
		null,
		null,
		"Bazar xizmetler",
		null,
		null,
		null,
		null,
		null,

		"Avto turar orinlar",
		"Hajetxanar",
		"Jámi",
	],
	[
		null,
		"Dukanlar",
		"Rastalar",
		"Jayma",
		"Táshki",
		"Tárezi",
		"Keshki qarawıl",
		"Sklad",
		"Mal bazar",
		"Basqa",
		null,
		null,
		null,
	],
]

const merges = ["A1:A2", "B1:D1", "E1:J1", "K1:K2", "L1:L2", "M1:M2"]

const summaryStyle = cx(css`
	font-weight: bold;
`)

const MonthlyIncomeTable: FC = () => {
	const { marketId, monthDate } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/annual-income/$monthDate",
	})

	const date = useMemo(() => dayjs(monthDate), [monthDate])

	const {
		data: monthlyIncome,
		isLoading,
		isFetching,
	} = useGetStatisticsMonthlyIncomeQuery({
		from_date: date.startOf("month").format("YYYY-MM-DD"),
		to_date: date.endOf("month").format("YYYY-MM-DD"),
		market_id: marketId,
	})

	const dataSource: ProfitData[] = useMemo(() => {
		if (!monthlyIncome?.data) return []

		return monthlyIncome.data.map((item) => ({
			key: item.name,
			name: dayjs(item.name).get("date").toString(),
			market: {
				infra: Number(item.payment_types?.[0]?.payments_sum_amount) || 0,
				rasta: Number(item.payment_types?.[1]?.payments_sum_amount) || 0,
				block: Number(item.payment_types?.[2]?.payments_sum_amount) || 0,
			},
			services: {
				transport:
					Number(item.services.find((e) => e.id === 1)?.payments_sum_amount) ||
					0,
				weight:
					Number(item.services.find((e) => e.id === 2)?.payments_sum_amount) ||
					0,
				night_guard:
					Number(item.services.find((e) => e.id === 3)?.payments_sum_amount) ||
					0,
				store:
					Number(item.services.find((e) => e.id === 5)?.payments_sum_amount) ||
					0,
				cattle_market:
					Number(item.services.find((e) => e.id === 4)?.payments_sum_amount) ||
					0,
				other:
					item.services
						.filter((e) => ![1, 2, 3, 4, 5].includes(e.id))
						.reduce(
							(total, value) =>
								total + (Number(value.payments_sum_amount) || 0),
							0
						) || 0,
			},
			car_parks: item.car_parks,
			restrooms: item.restrooms,
			total_amount: item.total_amount,
		})) as ProfitData[]
	}, [monthlyIncome?.data])

	const totals = useMemo(
		() => [
			dataSource.reduce((total, item) => total + item.market.infra, 0),
			dataSource.reduce((total, item) => total + item.market.rasta, 0),
			dataSource.reduce((total, item) => total + item.market.block, 0),
			dataSource.reduce((total, item) => total + item.services.transport, 0),
			dataSource.reduce((total, item) => total + item.services.weight, 0),
			dataSource.reduce((total, item) => total + item.services.night_guard, 0),
			dataSource.reduce((total, item) => total + item.services.store, 0),
			dataSource.reduce(
				(total, item) => total + item.services.cattle_market,
				0
			),
			dataSource.reduce((total, item) => total + item.services.other, 0),
			dataSource.reduce((total, item) => total + item.car_parks, 0),
			dataSource.reduce((total, item) => total + item.restrooms, 0),
			dataSource.reduce((total, item) => total + item.total_amount, 0),
		],
		[dataSource]
	)

	const columns = useMonthlyIncomeColumns()
	return (
		<>
			<Table<ProfitData>
				title={`${date.format("MMMM")} - bazar túsimleri haqqında`}
				extra={
					<ExcelButton
						key={"excel"}
						data={{
							data: {
								headers,
								merges,
								values: dataSource.map((item) => [
									item.name,
									item.market.infra,
									item.market.rasta,
									item.market.block,
									item.services.transport,
									item.services.weight,
									item.services.night_guard,
									item.services.store,
									item.services.cattle_market,
									item.services.other,
									item.car_parks,
									item.restrooms,
									item.total_amount,
								]),
								totals: [["Jami", ...totals]],
							},
							name: `${date.format("MMMM")} - bazar túsimleri haqqında`,
						}}
					/>
				}
				loading={isLoading || isFetching}
				bordered={true}
				columns={columns}
				dataSource={dataSource}
				pagination={false}
				summary={() => (
					<TableSummary fixed={"bottom"}>
						<TableSummaryRow>
							<TableSummaryCell
								index={1}
								className={summaryStyle}
							>
								Jámi
							</TableSummaryCell>
							{totals.map((total, index) => (
								<TableSummaryCell
									index={2 + index}
									key={index}
									className={summaryStyle}
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

export { MonthlyIncomeTable }
