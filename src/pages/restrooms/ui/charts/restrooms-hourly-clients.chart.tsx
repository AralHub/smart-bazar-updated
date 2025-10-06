import { useSearch } from "@tanstack/react-router"
import { type FC, useMemo } from "react"
import { useGetRestroomsInfoQuery } from "src/services/dashboard/restrooms"
import { Card, Charts, Empty, Flex } from "src/shared/ui"
import { restroomsHourlyClientsOption } from "./restrooms-hourly-clients.option.ts"

const RestroomsHourlyClientsChart: FC = () => {
	const { date, restroom: restroom_id } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/restrooms",
	})
	const { data: restroomInfo, isLoading: restroomInfoLoading } =
		useGetRestroomsInfoQuery({
			restroom_id,
			date,
		})
	const labels = useMemo(
		// () => Object.keys(restroomInfo?.hourly_client_counts?.counts || {}),
		() => [
			"0:00-1:00",
			"1:00-2:00",
			"2:00-3:00",
			"3:00-4:00",
			"4:00-5:00",
			"5:00-6:00",
			"6:00-7:00",
			"7:00-8:00",
			"8:00-9:00",
			"9:00-10:00",
			"10:00-11:00",
			"11:00-12:00",
			"12:00-13:00",
			"13:00-14:00",
			"14:00-15:00",
			"15:00-16:00",
			"16:00-17:00",
			"17:00-18:00",
			"18:00-19:00",
			"19:00-20:00",
			"20:00-21:00",
			"21:00-22:00",
			"22:00-23:00",
			"23:00-0:00",
		],
		[restroomInfo]
	)
	const data = useMemo(
		// () => Object.values(restroomInfo?.hourly_client_counts?.counts || {}),
		() => Array.from({ length: 24 }, () => 0),
		[restroomInfo]
	)
	return (
		<>
			<Card title={"Saatlıq klientler sani"}>
				{data?.length !== 0 ? (
					<Charts
						loading={restroomInfoLoading}
						option={{
							...restroomsHourlyClientsOption,
							xAxis: {
								...restroomsHourlyClientsOption.xAxis,
								data: labels,
							},
							series: [
								{
									data,
									type: "line",
									areaStyle: {},
									smooth: true,
								},
							],
						}}
					/>
				) : (
					<Flex
						justify={"center"}
						align={"center"}
						style={{
							width: "100%",
						}}
					>
						<Empty />
					</Flex>
				)}
			</Card>
		</>
	)
}

export { RestroomsHourlyClientsChart }
