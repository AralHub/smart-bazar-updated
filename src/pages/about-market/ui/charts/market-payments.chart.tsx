import { useParams } from "@tanstack/react-router"
import { useResponsive } from "antd-style"
import dayjs, { type Dayjs } from "dayjs"
import { type FC, useMemo, useState } from "react"
import { useGetMarketsByIdQuery } from "src/services/dashboard/markets"
import { useGetStatisticsOverallQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Card, Charts } from "src/shared/ui"
import { formatPrice } from "src/shared/utils"
import { RangePickerWithNow } from "src/widgets/date-picker-with-now"
import { option } from "./market-payments.option.ts"

const MarketPaymentsChart: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/",
	})
	const { xs } = useResponsive()
	const { token } = useToken()

	const { data: market } = useGetMarketsByIdQuery(marketId)

	const isNotRestrooms = useMemo(
		() => market?.data?.restrooms_count === 0,
		[market?.data?.restrooms_count]
	)
	const isNotCarParks = useMemo(
		() =>
			market?.data?.shoppingCarParks === 0 &&
			market?.data?.market_car_parks_count === 0,
		[market?.data?.shoppingCarParks, market?.data?.market_car_parks_count]
	)

	const [dates, setDate] = useState<[Dayjs | null, Dayjs | null]>([
		dayjs().startOf("month"),
		dayjs().endOf("month"),
	])

	const { data: statisticOveralls, isLoading: statisticOverallsLoading } =
		useGetStatisticsOverallQuery({
			market_id: marketId,
			from_date: dates?.[0]?.format("YYYY-MM-DD"),
			to_date: dates?.[1]?.format("YYYY-MM-DD"),
		})

	const filteredStatisticData = useMemo(
		() =>
			statisticOveralls?.data?.filter((el) => {
				if (isNotRestrooms && el?.number === 5) return el?.number !== 5
				if (isNotCarParks && el?.number === 6) return el?.number !== 6
				return el
			}) || [],
		[isNotCarParks, isNotRestrooms, statisticOveralls?.data]
	)

	const statisticTotalData = useMemo(
		() =>
			filteredStatisticData.reduce(
				(total, item) => total + (Number(item?.amount) || 0),
				0
			),
		[filteredStatisticData]
	)

	return (
		<>
			<Card
				title={"Bazar period túsimleri"}
				extra={
					<RangePickerWithNow
						format={"D - MMMM"}
						allowClear={false}
						value={dates}
						onChange={(value) => {
							if (value) {
								setDate(value)
							}
						}}
						onToday={setDate}
					/>
				}
			>
				<Charts
					loading={statisticOverallsLoading}
					style={{ height: 400 }}
					option={{
						...option,
						color: [token.colorPrimary],
						title: {
							text: `Uliwma summa: ${formatPrice(statisticTotalData)}`,
							textStyle: {
								fontSize: xs ? 14 : 20,
							},
						},
						xAxis: {
							type: "category",
							axisLabel: {
								fontWeight: "bold",
							},
							data: filteredStatisticData?.map((el) => el.name),
						},
						series: [
							{
								data: filteredStatisticData?.map((el) => el.amount || 0),
								type: "bar",
								itemStyle: {
									borderRadius: [token.borderRadius, token.borderRadius, 0, 0],
								},
								label: {
									show: true,
									fontSize: xs ? 14 : 20,
									rotate: xs ? 90 : 0,
									fontWeight: "bold",
									position: xs ? "inside" : "top",
									formatter: (params) => formatPrice(params.value),
								},
								barWidth: "60%",
								name: "Summa",
							},
						],
					}}
				/>
			</Card>
		</>
	)
}

export { MarketPaymentsChart }
