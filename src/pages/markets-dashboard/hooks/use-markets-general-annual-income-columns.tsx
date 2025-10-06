import type { ColumnsType } from "antd/es/table"
import type { StatisticGeneralAnnualIncome } from "src/services/statistics"
import { formatPrice } from "src/shared/utils"

export const useMarketsGeneralAnnualIncomeColumns = () => {
	const columns: ColumnsType<StatisticGeneralAnnualIncome> = [
		{
			width: 50,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			title: "Bazar",
			dataIndex: "market_name",
			key: "market_name",
		},
		{
			title: "Bazar orinlar",
			key: "market",
			children: [
				{
					title: "Dukanlar",
					dataIndex: ["payment_types", 0, "payments_sum_amount"],
					key: "infra",
					render: formatPrice,
				},
				{
					title: "Rastalar",
					dataIndex: ["payment_types", 1, "payments_sum_amount"],
					key: "rasta",
					render: formatPrice,
				},
				{
					title: "Jayma",
					dataIndex: ["payment_types", 2, "payments_sum_amount"],
					key: "block",
					render: formatPrice,
				},
			],
		},
		{
			title: "Bazar xizmetler",
			dataIndex: "services",
			key: "services",
			render: (value: StatisticGeneralAnnualIncome["services"]) =>
				formatPrice(
					value.reduce(
						(total, item) => total + (Number(item.payments_sum_amount) || 0),
						0
					)
				),
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
			title: "Jami",
			dataIndex: "total_amount",
			key: "total_amount",
			render: formatPrice,
		},
	]

	return columns
}
