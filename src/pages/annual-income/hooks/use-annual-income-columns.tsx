import type { ProfitData } from "src/pages/annual-income/ui/tables"
import type { TableColumnsType } from "src/shared/ui"
import { formatPrice } from "src/shared/utils"

// const columns: TableColumnsType = [
// 	{
// 		title: "Режа",
// 		dataIndex: "",
// 		key: "1",
// 	},
// 	{
// 		title: "Хақиқатда тушум",
// 		dataIndex: "",
// 		key: "2",
// 	},
// 	{
// 		title: "фарқи",
// 		dataIndex: "",
// 		key: "3",
// 		children: [
// 			{
// 				title: "Сумма",
// 				dataIndex: "",
// 				key: "31",
// 			},
// 			{
// 				title: "%",
// 				dataIndex: "",
// 				key: "32",
// 			},
// 		],
// 	},
// ]

export const useAnnualIncomeColumns = () => {
	const columns: TableColumnsType<ProfitData> = [
		{
			width: 50,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			fixed: "left",
			title: "Ay",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Bazar orinlar",
			key: "market",
			children: [
				{
					title: "Dukanlar",
					dataIndex: ["market", "infra"],
					key: "infra",
					render: formatPrice,
				},
				{
					title: "Rastalar",
					dataIndex: ["market", "rasta"],
					key: "rasta",
					render: formatPrice,
				},
				{
					title: "Jayma",
					dataIndex: ["market", "block"],
					key: "block",
					render: formatPrice,
				},
			],
		},
		{
			title: "Bazar xizmetler",
			key: "services",
			children: [
				{
					title: "Táshki",
					dataIndex: ["services", "transport"],
					key: "transport",
					render: formatPrice,
				},
				{
					title: "Tárezi",
					dataIndex: ["services", "weight"],
					key: "weight",
					render: formatPrice,
				},
				{
					title: "Keshki qarawıl",
					dataIndex: ["services", "night_guard"],
					key: "night_guard",
					render: formatPrice,
				},
				{
					title: "Sklad",
					dataIndex: ["services", "store"],
					key: "store",
					render: formatPrice,
				},
				{
					title: "Mal bazar",
					dataIndex: ["services", "cattle_market"],
					key: "cattle_market",
					render: formatPrice,
				},
				{
					title: "Basqa",
					dataIndex: ["services", "other"],
					key: "other",
					render: formatPrice,
				},
			],
		},
		{
			title: "Avto turar orinlar",
			dataIndex: "car_parks",
			key: "car_parks",
			render: formatPrice,
		},
		{
			title: "Hajetxanar",
			dataIndex: "restrooms",
			key: "restrooms",
			render: formatPrice,
		},
		{
			fixed: "right",
			title: "Jámi (UZS)",
			dataIndex: "total_amount",
			key: "total_amount",
			render: (value: number) => (
				<strong style={{ whiteSpace: "nowrap" }}>{formatPrice(value)}</strong>
			),
		},
	]

	return columns
}
