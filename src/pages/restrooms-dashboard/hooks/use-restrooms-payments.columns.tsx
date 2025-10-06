import type { StatisticsRestroom } from "src/services/statistics"
import type { TableColumnsType } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils"

export const useRestroomsPaymentsColumns = () => {
	const columns: TableColumnsType<StatisticsRestroom> = [
		{
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			title: "Hájetxana orni",
			dataIndex: "name",
			key: "name",
			// render: (value: string, record) => (
			// 	<Link
			// 		to={"/r/$regionId/m/$marketId/toilets"}
			// 		params={{
			// 			marketId: `${record?.market_id}`,
			// 			regionId: `${record?.district_id}`,
			// 		}}
			// 	>
			// 		{value}
			// 	</Link>
			// ),
		},
		{
			title: "Adamlar sani",
			dataIndex: "total_visits",
			key: "total_visits",
		},
		{
			title: "Erkekler sani",
			dataIndex: "male_visits",
			key: "male_visits",
		},
		{
			title: "Hayallar sani",
			dataIndex: "female_visits",
			key: "female_visits",
		},
		{
			title: "Summa",
			dataIndex: "amount",
			key: "amount",
			render: formatPriceWithCurrency,
		},
	]

	return columns
}
