import { type FC, useMemo } from "react"
import { useMarketsAboutColumns } from "src/pages/markets-dashboard/hooks"
import { useGetMarketsQuery } from "src/services/dashboard/markets"
import { Table } from "src/shared/ui"
import { ExcelButton } from "src/widgets/actions"

const headers = [
	[
		"Bazar",
		"Maydani",
		"Xizmetkerler sani",
		"Bazar sawda orinlar sani",
		null,
		"Avto turar orinlar sani",
		"Hajetxanalar sani",
	],
	[null, null, null, "Dukanlar", "Rastalar", null, null],
]

const merges = ["A1:A2", "B1:B2", "C1:C2", "D1:E1", "F1:F2", "G1:G2", "H1:H2"]

const MarketsAboutTable: FC = () => {
	const { data: markets, isLoading, isFetching } = useGetMarketsQuery()

	const dataSource = useMemo(
		() =>
			markets?.data?.sort((prev, next) => prev.specialty - next.specialty) ||
			[],
		[markets?.data]
	)

	const columns = useMarketsAboutColumns()
	return (
		<>
			<Table
				title={"Bazarlar haqqinda magliwmatlar"}
				extra={
					<ExcelButton
						data={{
							data: {
								headers,
								values: dataSource.map((item) => [
									item.name,
									item.area,
									item.employees_count,
									item.infra_places_count,
									item.stall_places_count,
									item.market_car_parks_count,
									item.restrooms_count,
								]),
								totals: [],
								merges: merges,
								lastNoTotal: true,
							},
							name: "Bazarlar haqqinda magliwmatlar",
						}}
					/>
				}
				rowKey={"id"}
				bordered={true}
				loading={isLoading || isFetching}
				dataSource={dataSource}
				columns={columns}
				pagination={false}
			/>
		</>
	)
}

export { MarketsAboutTable }
