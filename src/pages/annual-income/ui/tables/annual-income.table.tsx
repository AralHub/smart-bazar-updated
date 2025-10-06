import { useNavigate, useParams } from "@tanstack/react-router"
import { css, cx } from "antd-style"
import dayjs from "dayjs"
import { type FC, useMemo, useState } from "react"
import { useAnnualIncomeColumns } from "src/pages/annual-income/hooks"
import { useGetStatisticsAnnualIncomeQuery } from "src/services/statistics"
import {
	Table,
	TableSummary,
	TableSummaryCell,
	TableSummaryRow,
} from "src/shared/ui"
import { formatPrice } from "src/shared/utils"
import { ExcelButton } from "src/widgets/actions"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"

export interface ProfitData {
	key: string | number
	name: string
	total_amount: number
	change?: number
	market: {
		infra: number
		rasta: number
		block: number
	}
	services: {
		transport: number
		weight: number
		night_guard: number
		store: number
		cattle_market: number
		other: number
	}
	car_parks: number
	restrooms: number
}

const months: Record<number, string> = {
	1: "Yanvar",
	2: "Fevral",
	3: "Mart",
	4: "Aprel",
	5: "May",
	6: "Iyun",
	7: "Iyul",
	8: "Avgust",
	9: "Sentyabr",
	10: "Oktyabr",
	11: "Noyabr",
	12: "Dekabr",
}

const headers = [
	[
		"Ay",
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

const AnnualIncomeTable: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/annual-income/",
	})
	const navigate = useNavigate({
		from: "/d/$districtId/m/$marketId/annual-income",
	})

	const [date, setDate] = useState(() => dayjs())

	const {
		data: annualIncome,
		isLoading,
		isFetching,
	} = useGetStatisticsAnnualIncomeQuery({
		date: date.format("YYYY"),
		market_id: marketId,
	})

	const dataSource: ProfitData[] = useMemo(() => {
		if (!annualIncome?.data) return []

		return annualIncome.data.map((item) => ({
			key: item.name,
			name: months[Number(item.name)],
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
	}, [annualIncome?.data])

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

	const columns = useAnnualIncomeColumns()
	return (
		<>
			<Table<ProfitData>
				title={`${date.format("YYYY")}-jıldıń bazar túsimleri haqqında`}
				extra={[
					<DatePickerWithNow
						key={"date"}
						picker={"year"}
						format={"YYYY-jil"}
						value={date}
						onToday={setDate}
						onChange={setDate}
					/>,
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
							name: `${date.format("YYYY")}-jıldıń bazar túsimleri haqqında`,
						}}
					/>,
				]}
				loading={isLoading || isFetching}
				bordered={true}
				columns={columns}
				dataSource={dataSource}
				pagination={false}
				onRow={(data) => ({
					onClick: () => {
						navigate({
							to: "./$monthDate",
							params: {
								monthDate: `${date.format("YYYY")}-${String(data.key).padStart(2, "0")}`,
							},
						})
					},
					style: {
						cursor: "pointer",
					},
				})}
				summary={() => (
					<TableSummary fixed={"bottom"}>
						<TableSummaryRow>
							<TableSummaryCell index={0}></TableSummaryCell>
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

export { AnnualIncomeTable }
