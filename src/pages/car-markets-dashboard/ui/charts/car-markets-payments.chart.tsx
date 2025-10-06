import { useSearch } from "@tanstack/react-router"
import { type FC, useMemo } from "react"
import { useGetStatisticsCarParksQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Card, Charts } from "src/shared/ui"
import { AddButton } from "src/widgets/actions"
import { getCarMarketsPaymentsOption } from "./car-markets-payments.option.ts"

const CarMarketsPaymentsChart: FC = () => {
	const { date } = useSearch({
		from: "/_map-layout/car-markets-dashboard/",
	})
	const { token } = useToken()

	const { data: carParks, isLoading } = useGetStatisticsCarParksQuery({
		date,
	})

	const option = useMemo(
		() => getCarMarketsPaymentsOption(carParks?.data?.report_car_parks),
		[carParks?.data?.report_car_parks]
	)
	return (
		<>
			<Card
				loading={isLoading}
				title={"Tusimler ayırmalari"}
				extra={<AddButton />}
			>
				<Charts
					option={{
						...option,
						color: [token.geekblue, token.green],
					}}
				/>
			</Card>
		</>
	)
}

export { CarMarketsPaymentsChart }
