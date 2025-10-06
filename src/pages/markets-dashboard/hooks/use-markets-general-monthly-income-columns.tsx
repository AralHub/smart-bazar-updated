import { Link } from "@tanstack/react-router"
import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import type { StatisticGeneralMonthlyIncome } from "src/services/statistics"
import { Space, Text } from "src/shared/ui"
import { formatPrice } from "src/shared/utils"
import { EditButton } from "src/widgets/actions"

const months = dayjs.localeData().months()

export const useMarketsGeneralMonthlyIncomeColumns = () => {
	const columns: ColumnsType<StatisticGeneralMonthlyIncome> = [
		{
			width: 50,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			fixed: "left",
			title: "Bazar",
			dataIndex: "name",
			key: "name",
			render: (value: string, record) => (
				<Link
					to={"/d/$districtId/m/$marketId/annual-income"}
					params={{
						marketId: `${record?.id}`,
						districtId: `${record?.district_id}`,
					}}
				>
					{value}
				</Link>
			),
		},
		...(months.flatMap((month, index) => [
			{
				align: "center",
				title: "Reje",
				key: `plan${index + 1}`,
				render: (_v, record) => {
					const [currentMonth] = record.months.filter(
						(el) => el.name === index + 1
					)

					if (currentMonth?.report_amount)
						return (
							<Space>
								{formatPrice(currentMonth?.report_amount)}
								<EditButton
									variant={"outlined"}
									params={{
										...record,
										months: [currentMonth],
									}}
									showChildren={false}
								/>
							</Space>
						)
					return (
						<EditButton
							params={{
								...record,
								months: [currentMonth],
							}}
							showChildren={false}
							buttonType={"add"}
						/>
					)
				},
			},
			{
				title: month,
				dataIndex: index + 1,
				key: index + 1,
				render: (_v, record) =>
					formatPrice(
						record?.months.find((el) => el.name === index + 1)?.amount
					),
			},
			{
				title: "Parqi",
				key: `diff${index + 1}`,
				children: [
					{
						title: "Summa",
						key: `amount${index + 1}`,
						render: (_v, record) => {
							const month = record?.months.find((el) => el.name === index + 1)
							if (!month) return ""
							if (month?.diff_amount === null) return ""
							return (
								<Text
									style={{
										whiteSpace: "nowrap",
									}}
									type={
										month?.diff_amount > 0
											? "success"
											: month?.diff_amount < 0
												? "danger"
												: undefined
									}
								>
									{formatPrice(month?.diff_amount)}
								</Text>
							)
						},
					},
					{
						align: "center",
						title: "%",
						key: `percent${index + 1}`,
						render: (_v, record) => {
							const month = record?.months.find((el) => el.name === index + 1)
							if (!month) return ""
							if (month?.diff_percent === null) return ""
							return (
								<Text
									style={{
										whiteSpace: "nowrap",
									}}
									type={
										month?.diff_percent > 0
											? "success"
											: month?.diff_percent < 0
												? "danger"
												: undefined
									}
								>
									{Number(month?.diff_percent).toFixed(1)}%
								</Text>
							)
						},
					},
				],
			},
		]) as ColumnsType<StatisticGeneralMonthlyIncome>),
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
