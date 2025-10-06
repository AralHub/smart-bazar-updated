import {
	CarOutlined,
	ClearOutlined,
	EnvironmentFilled,
	ProductOutlined,
	ShopOutlined,
} from "@ant-design/icons"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useResponsive } from "antd-style"
import dayjs from "dayjs"
import { type FC, type ReactNode, useCallback, useMemo } from "react"
import { useGetCarParksQuery } from "src/services/dashboard/car-parks"
import { useGetCattleMarketsQuery } from "src/services/dashboard/cattle-markets"
import { useGetDistrictsQuery } from "src/services/dashboard/districts"
import { useGetMarketsQuery } from "src/services/dashboard/markets"
import { useGetRestroomsQuery } from "src/services/dashboard/restrooms"
import { mapIconData } from "src/shared/data"
import { useToken } from "src/shared/hooks"
import { Card, Flex, List, ListItem } from "src/shared/ui"
import { CowOutlined } from "src/shared/ui/icons"
import { CardTagMeta } from "src/widgets/card-tag-meta"

type ListData = {
	id: number
	icon: ReactNode
	title: string
	district_id?: number
	market_id?: number
	is_car_market?: number
	description: string
}

const MapDistrictList: FC = () => {
	const navigate = useNavigate()
	const { token } = useToken()
	const { xs, md } = useResponsive()
	const { variant, district } = useSearch({
		from: "/_map-layout/",
	})

	const { data: districts, isLoading: districtsLoading } = useGetDistrictsQuery(
		{}
	)

	const { data: markets, isLoading: marketsLoading } = useGetMarketsQuery({
		specialty:
			variant && [1, 2].includes(Number(variant)) ? variant : undefined,
		district_id: district,
	})

	const { data: parkings, isLoading: parkingsLoading } = useGetCarParksQuery({
		per_page: 1000,
		page: 1,
		district_id: district,
	})

	const { data: toilets, isLoading: toiletsLoading } = useGetRestroomsQuery({
		per_page: 1000,
		page: 1,
		district_id: district,
	})

	const { data: animals, isLoading: animalsLoading } = useGetCattleMarketsQuery(
		{
			per_page: 1000,
			page: 1,
			district_id: district,
		}
	)

	const listData: ListData[] = useMemo(() => {
		const mapItems =
			districts?.data?.map((district) => ({
				id: district.id,
				icon: mapIconData[district.id] || <EnvironmentFilled />,
				title: district.name,
				description: `Diyqan bazarlari: ${district.markets_count}`,
			})) || []

		if (!variant) return mapItems
		if ([1, 2].includes(variant))
			return (
				markets?.data?.map((market) => ({
					id: market.id,
					icon: variant === 2 ? <ProductOutlined /> : <ShopOutlined />,
					district_id: market.district_id,
					title: market.name,
					description: market?.district?.name,
				})) || []
			)
		if (variant === 3)
			return (
				parkings?.data?.map((parking) => ({
					id: parking.id,
					icon: <CarOutlined />,
					district_id: parking?.market?.district_id,
					market_id: parking?.market_id,
					is_car_market: parking?.type === 2,
					title: parking.name,
					description: parking?.market?.name,
				})) || []
			)

		if (variant === 4)
			return (
				animals?.data?.map((animal) => ({
					id: animal.id,
					icon: <CowOutlined />,
					district_id: animal?.district_id,
					market_id: animal?.market_id,
					title: animal.name,
					description: animal?.district?.name,
				})) || []
			)
		if (variant === 5)
			return (
				toilets?.data?.map((toilet) => ({
					id: toilet.id,
					icon: <ClearOutlined />,
					district_id: toilet?.district_id,
					market_id: toilet?.market_id,
					title: toilet.name,
					description: toilet?.market?.name,
				})) || []
			)

		return mapItems
	}, [
		animals?.data,
		districts?.data,
		markets?.data,
		parkings?.data,
		toilets?.data,
		variant,
	])

	const onSelectItem = useCallback(
		(item: ListData) => {
			const today = dayjs().format("YYYY-MM-DD")
			if (!variant) {
				navigate({
					to: ".",
					search: (prev) => ({
						...prev,
						district: item.id,
					}),
				})
				return
			}
			if ([1, 2].includes(variant)) {
				navigate({
					to: "/d/$districtId/m/$marketId/dashboard",
					params: {
						districtId: `${item.district_id}`,
						marketId: `${item.id}`,
					},
					search: {
						date: today,
					},
				})
				return
			}
			if (variant === 3) {
				navigate({
					to: item?.is_car_market
						? "/d/$districtId/m/$marketId/car-market"
						: "/d/$districtId/m/$marketId/parking",
					params: {
						districtId: `${item.district_id}`,
						marketId: `${item.market_id}`,
					},
					search: {
						car_park: item.id,
						date: today,
					},
				})
				return
			}
			if (variant === 4) {
				navigate({
					to: "/d/$districtId/m/$marketId/cattle-market",
					params: {
						districtId: `${item.district_id}`,
						marketId: `${item.market_id}`,
					},
					search: {
						cattle_market: item.id,
						date: today,
					},
				})
				return
			}
			if (variant === 5) {
				navigate({
					to: "/d/$districtId/m/$marketId/restrooms",
					params: {
						districtId: `${item.district_id}`,
						marketId: `${item.market_id}`,
					},
					search: {
						restroom: item.id,
						date: today,
					},
				})
				return
			}
		},
		[navigate, variant]
	)

	return (
		<>
			<Flex vertical={true}>
				<List
					loading={
						districtsLoading ||
						marketsLoading ||
						parkingsLoading ||
						animalsLoading ||
						toiletsLoading
					}
					grid={{ gutter: 20, column: xs ? 1 : md ? (variant ? 2 : 3) : 2 }}
					rowKey={"id"}
					style={{
						padding: 24,
					}}
					dataSource={listData}
					pagination={{
						pageSize: variant ? 8 : 9,
					}}
					renderItem={(item) => (
						<ListItem key={item.id}>
							<Card
								hoverable={true}
								// hoverable={item.id !== value?.id}
								onClick={() => onSelectItem(item)}
								style={
									!variant && item.id === district
										? {
												borderColor: token.colorPrimary,
											}
										: {}
								}
							>
								<CardTagMeta
									icon={item.icon}
									color={"blue"}
									title={item.title}
									description={item.description}
								/>
							</Card>
						</ListItem>
					)}
				/>
			</Flex>
		</>
	)
}

export { MapDistrictList }
