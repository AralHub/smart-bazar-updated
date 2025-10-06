import type { ColumnsType } from "antd/es/table"
import type { StatisticComparisonMonth } from "src/services/statistics"
import { Text } from "src/shared/ui"
import { formatCustomDate, formatPrice } from "src/shared/utils"

export const useMarketsGeneralComparisonColumns = () => {
	const columns: ColumnsType<StatisticComparisonMonth> = [
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
			onCell: (data) =>
				data.market_name
					? {
							rowSpan: 3,
						}
					: { rowSpan: 0 },
		},
		{
			title: "Period",
			dataIndex: "name",
			key: "months",
			render: (value: string | null, record) =>
				record.is_date ? formatCustomDate(value, "MMMM") : value,
		},
		{
			title: "Bazar orinlar",
			key: "market",
			children: [
				{
					title: "Dukanlar",
					dataIndex: ["payment_types", 0, "payments_sum_amount"],
					key: "infra",
					render: (value: number) => (
						<Text type={value < 0 ? "danger" : undefined}>
							{formatPrice(value)}
						</Text>
					),
				},
				{
					title: "Rastalar",
					dataIndex: ["payment_types", 1, "payments_sum_amount"],
					key: "rasta",
					render: (value: number) => (
						<Text type={value < 0 ? "danger" : undefined}>
							{formatPrice(value)}
						</Text>
					),
				},
				{
					title: "Jayma",
					dataIndex: ["payment_types", 2, "payments_sum_amount"],
					key: "block",
					render: (value: number) => (
						<Text type={value < 0 ? "danger" : undefined}>
							{formatPrice(value)}
						</Text>
					),
				},
			],
		},
		{
			title: "Bazar xizmetler",
			dataIndex: "services",
			key: "services",
			render: (value: StatisticComparisonMonth["services"]) => {
				const total = value.reduce(
					(total, item) => total + (Number(item.payments_sum_amount) || 0),
					0
				)
				return (
					<Text type={total < 0 ? "danger" : undefined}>
						{formatPrice(total)}
					</Text>
				)
			},
		},
		{
			title: "Avto turar orinlar",
			dataIndex: "car_parks",
			key: "car_parks",
			render: (value: number) => (
				<Text type={value < 0 ? "danger" : undefined}>
					{formatPrice(value)}
				</Text>
			),
		},
		{
			title: "Hajetxanar",
			dataIndex: "restrooms",
			key: "restrooms",
			render: (value: number) => (
				<Text type={value < 0 ? "danger" : undefined}>
					{formatPrice(value)}
				</Text>
			),
		},
		{
			fixed: "right",
			title: "Jami",
			dataIndex: "total_amount",
			key: "total_amount",
			render: (value: number) => (
				<Text type={value < 0 ? "danger" : undefined}>
					{formatPrice(value)}
				</Text>
			),
		},
	]

	return columns
}
