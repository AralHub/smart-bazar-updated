import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, memo, useEffect, useState } from "react"
import {
	useGetSchemeBlocksQuery,
	useGetSchemePlacesQuery,
} from "src/services/scheme"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { Col, Row } from "src/shared/ui"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { PageHeader } from "src/widgets/page-header"
import { MapPieChart, PaymentsPieChart } from "./charts"
import { SchemaMap } from "./maps"
import { MapStatistic } from "./statistics"

const MemorizeSchemaMap = memo(SchemaMap)
const MemorizeMapPieChart = memo(MapPieChart)
const MemorizePaymentsPieChart = memo(PaymentsPieChart)
const MemorizeMapStatistic = memo(MapStatistic)

const Map: FC = () => {
	const { districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/map",
		select: (params) => ({
			districtId: params.districtId,
			marketId: params.marketId,
		}),
	})
	const search = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/map",
		select: (state) => ({
			date: state.date,
		}),
	})
	const navigate = useNavigate({
		from: "/d/$districtId/m/$marketId/map",
	})

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/map`,
			title: "Karta",
		},
	])

	const [date, setDate] = useState(() =>
		search?.date ? dayjs(search?.date) : dayjs()
	)

	const { data: places, isLoading: placesLoading } = useGetSchemePlacesQuery({
		market_id: marketId,
		date: search?.date,
	})

	const { data: blocks, isLoading: blocksLoading } = useGetSchemeBlocksQuery({
		market_id: marketId,
		date: search?.date,
	})

	useEffect(() => {
		if (date) {
			navigate({
				to: ".",
				replace: true,
				search: (prev) => ({
					...prev,
					date: date.format("YYYY-MM-DD"),
				}),
			})
		}
	}, [date, navigate])
	return (
		<>
			<PageHeader
				title={"Karta"}
				breadcrumbs={paths}
				extra={
					<DatePickerWithNow
						value={date}
						onChange={setDate}
						onToday={() => setDate(() => dayjs())}
					/>
				}
			/>
			<MemorizeMapStatistic />
			<Row
				gutter={24}
				style={{
					rowGap: 24,
				}}
			>
				<Col
					xs={24}
					md={12}
				>
					<MemorizeMapPieChart
						data={{
							places: places?.data || [],
							blocks: blocks?.data || [],
						}}
						loading={placesLoading || blocksLoading}
					/>
				</Col>
				<Col
					xs={24}
					md={12}
				>
					<MemorizePaymentsPieChart
						data={{
							places: places?.data || [],
							blocks: blocks?.data || [],
						}}
						loading={placesLoading || blocksLoading}
					/>
				</Col>
			</Row>
			<MemorizeSchemaMap
				data={{
					places: places?.data || [],
					blocks: blocks?.data || [],
				}}
				loading={placesLoading || blocksLoading}
			/>
		</>
	)
}

export { Map }
