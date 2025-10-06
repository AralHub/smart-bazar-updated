import { Link } from "@tanstack/react-router"
import type { ColumnsType } from "antd/es/table"
import type { Market } from "src/services/dashboard/markets"

export const useMarketsAboutColumns = () => {
	const columns: ColumnsType<Market> = [
		{
			width: 50,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			title: "Bazar",
			dataIndex: "name",
			key: "name",
			render: (value: string, record) => (
				<Link
					to={"/d/$districtId/m/$marketId"}
					params={{
						marketId: `${record?.id}`,
						districtId: `${record?.district_id}`,
					}}
				>
					{value}
				</Link>
			),
		},
		{
			align: "center",
			title: "Maydani",
			dataIndex: "area",
			key: "area",
		},
		{
			align: "center",
			title: "Xizmetkerler sani",
			dataIndex: "employees_count",
			key: "employees_count",
		},
		{
			title: "Bazar sawda orinlar sani",
			key: "places",
			children: [
				{
					align: "center",
					title: "Dukanlar",
					dataIndex: "infra_places_count",
					key: "infra_places_count",
				},
				{
					align: "center",
					title: "Rastalar",
					dataIndex: "stall_places_count",
					key: "stall_places_count",
				},
			],
		},
		{
			align: "center",
			title: "Avto turar orinlar sani",
			dataIndex: "market_car_parks_count",
			key: "market_car_parks_count",
		},
		{
			align: "center",
			title: "Hajetxanalar sani",
			dataIndex: "restrooms_count",
			key: "restrooms_count",
		},
	]

	return columns
}
