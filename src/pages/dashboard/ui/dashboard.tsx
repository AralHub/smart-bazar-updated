import { useParams } from "@tanstack/react-router"
import { type FC, memo, useMemo } from "react"
import { useDatesState } from "src/pages/dashboard/hooks"
import {
	PaymentsByDaysBarChart,
	PaymentsByMonthsBarChart,
	PaymentsByYearBarChart,
} from "src/pages/dashboard/ui/charts"
import { useGetMarketsByIdQuery } from "src/services/dashboard/markets"
import { useGetStatisticsPaymentsByDateQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Col, Row } from "src/shared/ui"
import { CarDashboard } from "./car-dashboard.tsx"
import { RestroomDashboard } from "./restroom-dashboard.tsx"
import { DashboardStatistic } from "./statistics"

const MemorizeHomeStatistic = memo(DashboardStatistic)

const Dashboard: FC = () => {
	const marketId = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/dashboard",
		select: (params) => params.marketId,
	})

	const { data: market } = useGetMarketsByIdQuery(marketId)

	const { token } = useToken()

	const {
		dateByYear,
		setDateByYear,
		setDatesByDay,
		setDateByMonth,
		datesByDay,
		dateByMonth,
	} = useDatesState()

	const {
		data: paymentsByYear,
		isLoading: paymentsYearLoading,
		isFetching: paymentsYearFetching,
	} = useGetStatisticsPaymentsByDateQuery("annual", {
		market_id: marketId,
		date: dateByYear.format("YYYY"),
	})

	const {
		data: paymentsByMonthly,
		isLoading: paymentsMonthlyLoading,
		isFetching: paymentsMonthlyFetching,
	} = useGetStatisticsPaymentsByDateQuery("monthly", {
		market_id: marketId,
		date: dateByMonth.format("YYYY"),
	})

	const {
		data: paymentsByDaily,
		isLoading: paymentsDailyLoading,
		isFetching: paymentsDailyFetching,
	} = useGetStatisticsPaymentsByDateQuery("daily", {
		market_id: marketId,
		from_date: datesByDay?.[0]?.format("YYYY-MM-DD"),
		to_date: datesByDay?.[1]?.format("YYYY-MM-DD"),
	})

	const carPark = useMemo(() => {
		if (!market?.data) return
		if (
			market?.data?.shoppingCarParks === 0 &&
			market?.data?.market_car_parks_count === 0
		)
			return

		return <CarDashboard />
	}, [market?.data])

	const restroom = useMemo(() => {
		if (!market?.data) return
		if (market?.data?.restrooms_count === 0) return

		return <RestroomDashboard />
	}, [market?.data])

	return (
		<>
			<MemorizeHomeStatistic />
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				<Col
					xs={24}
					md={8}
				>
					<PaymentsByYearBarChart
						value={paymentsByYear?.data?.map((el) => el.amount || 0) || []}
						title={"Bazar orinlar jilliq tusimler"}
						color={[token.colorPrimary]}
						loading={paymentsYearLoading || paymentsYearFetching}
						date={dateByYear}
						onChangeDate={setDateByYear}
					/>
				</Col>
				<Col
					xs={24}
					md={16}
				>
					<PaymentsByMonthsBarChart
						title={"Bazar orinlar ayliq tusimler"}
						color={[token.colorPrimary]}
						value={paymentsByMonthly?.data?.map((el) => el.amount || 0) || []}
						loading={paymentsMonthlyLoading || paymentsMonthlyFetching}
						date={dateByMonth}
						onChangeDate={setDateByMonth}
					/>
				</Col>
			</Row>
			<PaymentsByDaysBarChart
				title={"Bazar orinlar kunlik tusimler"}
				color={[token.colorPrimary]}
				value={paymentsByDaily?.data?.map((el) => el.amount || 0) || []}
				categories={paymentsByDaily?.data?.map((el) => el.name || 0) || []}
				loading={paymentsDailyLoading || paymentsDailyFetching}
				dates={datesByDay}
				onChangeDates={setDatesByDay}
			/>
			{carPark}
			{restroom}
		</>
	)
}

export { Dashboard }
