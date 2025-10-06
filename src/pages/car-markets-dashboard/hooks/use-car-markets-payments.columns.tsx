import { Link } from "@tanstack/react-router"
import type { StatisticsCarPark } from "src/services/statistics"
import type { TableColumnsType } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils"

export const useCarMarketsPaymentsColumns = () => {
	const columns: TableColumnsType<StatisticsCarPark> = [
		{
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			title: "Avto turar orni",
			dataIndex: "name",
			key: "name",
			render: (value: string, record) => (
				<Link
					to={
						record?.type === 2
							? "/d/$districtId/m/$marketId/car-market"
							: "/d/$districtId/m/$marketId/parking"
					}
					params={{
						districtId: `${record?.district_id}`,
						marketId: `${record?.market_id}`,
					}}
				>
					{value}
				</Link>
			),
		},
		{
			title: "Mashinlar sani",
			dataIndex: "vehicles_count",
			key: "vehicles_count",
		},
		{
			title: "Mashinlar qatnasiw sani",
			dataIndex: "attendances_count",
			key: "attendances_count",
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
