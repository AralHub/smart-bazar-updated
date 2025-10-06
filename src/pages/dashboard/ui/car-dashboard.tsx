import { useParams } from "@tanstack/react-router"
import { type FC, memo, useMemo } from "react"
import { useDatesState } from "src/pages/dashboard/hooks"
import { generateSplitAmount } from "src/pages/dashboard/utils"
import { useGetStatisticsCarParkPaymentsByDateQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Col, Row } from "src/shared/ui"
import {
	PaymentsByDaysBarChart,
	PaymentsByMonthsBarChart,
	PaymentsByYearBarChart,
} from "./charts"
import { CarDashboardStatistic } from "./statistics"

const MemorizeCarDashboardStatistic = memo(CarDashboardStatistic)

const CarDashboard: FC = () => {
	const marketId = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/dashboard",
		select: (params) => params.marketId,
	})

	const { token } = useToken()

	const {
		dateByYear,
		setDateByYear,
		dateByMonth,
		setDateByMonth,
		datesByDay,
		setDatesByDay,
	} = useDatesState()

	const {
		data: paymentsByYear,
		isLoading: paymentsYearLoading,
		isFetching: paymentsYearFetching,
	} = useGetStatisticsCarParkPaymentsByDateQuery("annual", {
		market_id: marketId,
		date: dateByYear.format("YYYY"),
	})

	const {
		data: paymentsByMonthly,
		isLoading: paymentsMonthlyLoading,
		isFetching: paymentsMonthlyFetching,
	} = useGetStatisticsCarParkPaymentsByDateQuery("monthly", {
		market_id: marketId,
		date: dateByMonth.format("YYYY"),
	})

	const {
		data: paymentsByDaily,
		isLoading: paymentsDailyLoading,
		isFetching: paymentsDailyFetching,
	} = useGetStatisticsCarParkPaymentsByDateQuery("daily", {
		market_id: marketId,
		from_date: datesByDay?.[0]?.format("YYYY-MM-DD"),
		to_date: datesByDay?.[1]?.format("YYYY-MM-DD"),
	})

	const paymentsMonthlyValues = useMemo(
		() => generateSplitAmount(paymentsByMonthly?.data),
		[paymentsByMonthly?.data]
	)

	const paymentsDailyValues = useMemo(
		() => generateSplitAmount(paymentsByDaily?.data),
		[paymentsByDaily?.data]
	)

	return (
		<>
			<MemorizeCarDashboardStatistic />
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				<Col
					xs={24}
					md={8}
				>
					<PaymentsByYearBarChart
						title={"Avto turar orinlar jilliq tusimler"}
						color={[token.cyan]}
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
						title={"Avto turar orinlar ayliq tusimler"}
						color={[token.cyan, token.blue, token.green]}
						value={paymentsByMonthly?.data?.map((el) => el.amount || 0) || []}
						values={paymentsMonthlyValues}
						labels={["Mashinlar tusim summa", "Liniya tusim summa"]}
						date={dateByMonth}
						onChangeDate={setDateByMonth}
						loading={paymentsMonthlyLoading || paymentsMonthlyFetching}
					/>
				</Col>
			</Row>
			<PaymentsByDaysBarChart
				title={"Avto turar orinlar kunlik tusimler"}
				color={[token.cyan, token.blue, token.green]}
				value={paymentsByDaily?.data?.map((el) => el.amount || 0) || []}
				categories={paymentsByDaily?.data?.map((el) => el.name || 0) || []}
				values={paymentsDailyValues}
				labels={["Mashinlar tusim summa", "Liniya tusim summa"]}
				dates={datesByDay}
				onChangeDates={setDatesByDay}
				loading={paymentsDailyLoading || paymentsDailyFetching}
			/>
		</>
	)
}

export { CarDashboard }
