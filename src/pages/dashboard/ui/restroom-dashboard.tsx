import { useParams } from "@tanstack/react-router"
import { type FC, memo } from "react"
import { useDatesState } from "src/pages/dashboard/hooks"
import { useGetStatisticsRestroomPaymentsByDateQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Col, Row } from "src/shared/ui"
import {
	PaymentsByDaysBarChart,
	PaymentsByMonthsBarChart,
	PaymentsByYearBarChart,
} from "./charts"
import { RestroomDashboardStatistic } from "./statistics"

const MemorizeRestroomDashboardStatistic = memo(RestroomDashboardStatistic)

const RestroomDashboard: FC = () => {
	const marketId = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/dashboard",
		select: (params) => params.marketId,
	})
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
	} = useGetStatisticsRestroomPaymentsByDateQuery("annual", {
		market_id: marketId,
		date: dateByYear.format("YYYY"),
	})

	const {
		data: paymentsByMonthly,
		isLoading: paymentsMonthlyLoading,
		isFetching: paymentsMonthlyFetching,
	} = useGetStatisticsRestroomPaymentsByDateQuery("monthly", {
		market_id: marketId,
		date: dateByMonth.format("YYYY"),
	})

	const {
		data: paymentsByDaily,
		isLoading: paymentsDailyLoading,
		isFetching: paymentsDailyFetching,
	} = useGetStatisticsRestroomPaymentsByDateQuery("daily", {
		market_id: marketId,
		from_date: datesByDay?.[0]?.format("YYYY-MM-DD"),
		to_date: datesByDay?.[1]?.format("YYYY-MM-DD"),
	})

	return (
		<>
			<MemorizeRestroomDashboardStatistic />
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				<Col
					xs={24}
					md={8}
				>
					<PaymentsByYearBarChart
						title={"Hájetxanalar jilliq tusimler"}
						color={[token.lime]}
						value={paymentsByYear?.data?.map((el) => el.amount || 0) || []}
						date={dateByYear}
						onChangeDate={setDateByYear}
						loading={paymentsYearLoading || paymentsYearFetching}
					/>
				</Col>
				<Col
					xs={24}
					md={16}
				>
					<PaymentsByMonthsBarChart
						title={"Hájetxanalar ayliq tusimler"}
						color={[token.lime]}
						value={paymentsByMonthly?.data?.map((el) => el.amount || 0) || []}
						loading={paymentsMonthlyLoading || paymentsMonthlyFetching}
						date={dateByMonth}
						onChangeDate={setDateByMonth}
					/>
				</Col>
			</Row>
			<PaymentsByDaysBarChart
				title={"Hájetxanalar kunlik tusimler"}
				color={[token.lime]}
				value={paymentsByDaily?.data?.map((el) => el.amount || 0) || []}
				categories={paymentsByDaily?.data?.map((el) => el.name || 0) || []}
				loading={paymentsDailyLoading || paymentsDailyFetching}
				dates={datesByDay}
				onChangeDates={setDatesByDay}
			/>
		</>
	)
}

export { RestroomDashboard }
