import { useSearch } from "@tanstack/react-router"
import { type FC, useMemo } from "react"
import { useGetStatisticsRestroomsQuery } from "src/services/statistics"
import { useToken } from "src/shared/hooks"
import { Card, Charts } from "src/shared/ui"
import { AddButton } from "src/widgets/actions"
import { getRestroomsPaymentsOption } from "./restrooms-payments.option.ts"

const RestroomsPaymentsChart: FC = () => {
	const { date } = useSearch({
		from: "/_map-layout/restrooms-dashboard/",
	})
	const { token } = useToken()

	const { data: restrooms, isLoading } = useGetStatisticsRestroomsQuery({
		date,
	})

	const option = useMemo(
		() => getRestroomsPaymentsOption(restrooms?.data?.report_restrooms),
		[restrooms?.data?.report_restrooms]
	)
	return (
		<>
			<Card
				title={"Tusimler ayırmalari"}
				extra={<AddButton />}
			>
				<Charts
					loading={isLoading}
					option={{
						...option,
						color: [token.geekblue, token.green],
					}}
				/>
			</Card>
		</>
	)
}

export { RestroomsPaymentsChart }
