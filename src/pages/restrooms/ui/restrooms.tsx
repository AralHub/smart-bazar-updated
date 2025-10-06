import { CalendarOutlined } from "@ant-design/icons"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useEffect, useState } from "react"
import { useGetRestroomsQuery } from "src/services/dashboard/restrooms"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { Button, DatePicker, Select, Space } from "src/shared/ui"
import { PageHeader } from "src/widgets/page-header"
import { RestroomsHourlyClientsChart } from "./charts"
import { RestroomsGenderStatistic } from "./statistics"
import { RestroomsAttendancesTable } from "./tables"

const Restrooms: FC = () => {
	const { districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/restrooms",
	})
	const navigate = useNavigate()
	const search = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/restrooms",
	})
	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/restrooms`,
			title: "Hájetxanalar",
		},
	])

	const {
		data: restrooms,
		isLoading,
		isFetching,
	} = useGetRestroomsQuery({
		market_id: marketId,
	})
	const [date, setDate] = useState(() =>
		search?.date ? dayjs(search?.date) : dayjs()
	)

	useEffect(() => {
		navigate({
			to: ".",
			replace: true,
			search: (prev) => ({
				...prev,
				date: date.format("YYYY-MM-DD"),
				restroom: restrooms?.data?.at(0)?.id,
			}),
		})
	}, [date, navigate, restrooms?.data])
	return (
		<>
			<PageHeader
				title={"Hájetxanalar"}
				extra={[
					<Space.Compact key={"Date"}>
						<DatePicker
							value={date}
							onChange={setDate}
							defaultValue={dayjs("2025-04-22")}
						/>
						<Button
							type={"primary"}
							icon={<CalendarOutlined />}
							onClick={() => setDate(() => dayjs())}
						/>
					</Space.Compact>,
					<Select
						key={"Restrooms"}
						loading={isLoading || isFetching}
						placeholder={"Hájetxanani saylan"}
						value={search?.restroom}
						onChange={(value) => {
							navigate({
								to: ".",
								replace: true,
								search: (prev) => ({
									...prev,
									restroom: value,
								}),
							})
						}}
						disabled={isLoading}
						options={restrooms?.data?.map((el) => ({
							value: el.id,
							label: el.name,
						}))}
					/>,
				]}
				breadcrumbs={paths}
			/>
			<RestroomsGenderStatistic />
			<RestroomsHourlyClientsChart />
			<RestroomsAttendancesTable />
		</>
	)
}

export { Restrooms }
