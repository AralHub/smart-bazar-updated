import { useNavigate, useSearch } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useCallback, useEffect, useMemo } from "react"
import { useGetCarParksQuery } from "src/services/dashboard/car-parks"
import { useGetCattleMarketsQuery } from "src/services/dashboard/cattle-markets"
import { useGetMarketsQuery } from "src/services/dashboard/markets"
import { useGetRestroomsQuery } from "src/services/dashboard/restrooms"
import { Button, Flex } from "src/shared/ui"

type ListData = {
	id: number
	district_id?: number
	market_id?: number
	is_car_market?: boolean
	name: string
}

const MapSelects: FC = () => {
	const navigate = useNavigate()
	const search = useSearch({
		from: "/_map-layout/",
	})

	const {
		data: markets,
		isLoading,
		isFetching,
	} = useGetMarketsQuery({
		district_id: search?.district,
		specialty:
			search?.variant && [1, 2].includes(search?.variant)
				? search?.variant
				: undefined,
	})

	const {
		data: parkings,
		isLoading: parkingsLoading,
		isFetching: parkingsFetching,
	} = useGetCarParksQuery({
		district_id: search?.district,
		per_page: 1000,
		page: 1,
	})

	const {
		data: animals,
		isLoading: animalsLoading,
		isFetching: animalsFetching,
	} = useGetCattleMarketsQuery({
		district_id: search?.district,
		per_page: 1000,
		page: 1,
	})

	const {
		data: toilets,
		isLoading: toiletsLoading,
		isFetching: toiletsFetching,
	} = useGetRestroomsQuery({
		district_id: search?.district,
		per_page: 1000,
		page: 1,
	})

	const listData: ListData[] = useMemo(() => {
		// if (!search?.district) return []
		if (
			(search?.district && !search?.variant) ||
			(search?.variant && [1, 2].includes(search?.variant))
		) {
			return (
				markets?.data?.map((market) => ({
					id: market.id,
					district_id: market?.district_id,
					name: market.name,
				})) || []
			)
		}
		if (search?.variant === 3) {
			return (
				parkings?.data?.map((parking) => ({
					id: parking.id,
					district_id: parking?.market?.district_id,
					market_id: parking?.market_id,
					is_car_market: parking?.type === 2,
					name: parking.name,
				})) || []
			)
		}
		if (search?.variant === 4)
			return (
				animals?.data?.map((animal) => ({
					id: animal.id,
					district_id: animal?.district_id,
					market_id: animal?.market_id,
					name: animal.name,
				})) || []
			)
		if (search?.variant === 5)
			return (
				toilets?.data?.map((toilet) => ({
					id: toilet.id,
					district_id: toilet?.district_id,
					market_id: toilet?.market_id,
					name: toilet.name,
				})) || []
			)
		return []
	}, [
		animals?.data,
		markets?.data,
		parkings?.data,
		search?.district,
		search?.variant,
		toilets?.data,
	])

	const onSelectMarket = useCallback(
		(item: ListData) => {
			const today = dayjs().format("YYYY-MM-DD")
			if (
				(search?.district && !search?.variant) ||
				(search?.variant && [1, 2].includes(search?.variant))
			) {
				navigate({
					to: "/d/$districtId/m/$marketId/dashboard",
					params: {
						districtId: `${search?.district || item?.district_id}`,
						marketId: `${item.id}`,
					},
					search: {
						date: today,
					},
				})
				return
			}
			switch (search.variant) {
				case 3: {
					navigate({
						to: item?.is_car_market
							? "/d/$districtId/m/$marketId/car-market"
							: "/d/$districtId/m/$marketId/parking",
						params: {
							districtId: `${search?.district || item?.district_id}`,
							marketId: `${item.market_id}`,
						},
						search: {
							car_park: item?.id,
							date: today,
						},
					})
					return
				}
				case 4: {
					navigate({
						to: "/d/$districtId/m/$marketId/cattle-market",
						params: {
							districtId: `${search?.district || item?.district_id}`,
							marketId: `${item.market_id}`,
						},
						search: {
							cattle_market: item?.id,
							date: today,
						},
					})
					return
				}
				case 5: {
					navigate({
						to: "/d/$districtId/m/$marketId/restrooms",
						params: {
							districtId: `${search?.district || item?.district_id}`,
							marketId: `${item.market_id}`,
						},
						search: {
							restroom: item?.id,
							date: today,
						},
					})
					return
				}
			}
		},
		[navigate, search?.district, search.variant]
	)

	useEffect(() => {
		if (search?.district) return
		if (listData.length && search?.variant && !search?.district) {
			const districtsIds = Array.from(
				new Set(listData?.map((el) => Number(el?.district_id)))
			)
			navigate({
				to: ".",
				replace: true,
				search: (prev) => ({
					...prev,
					districts: districtsIds.join("-"),
				}),
			})
		}

		return () => {
			navigate({
				to: ".",
				replace: true,
				search: (prev) => ({
					...prev,
					districts: undefined,
				}),
			})
		}
	}, [listData, navigate, search?.district, search?.variant])

	if (search?.tab === "list" && search?.variant) return

	return (
		<>
			<Flex
				gap={16}
				justify={"center"}
				wrap={listData.length >= 4}
				style={{
					marginTop: 8,
				}}
				// hidden={Boolean(!search?.district || !search?.variant)}
			>
				{isLoading ||
				parkingsLoading ||
				animalsLoading ||
				toiletsLoading ||
				isFetching ||
				parkingsFetching ||
				animalsFetching ||
				toiletsFetching ? (
					<Button
						style={{ height: 40 }}
						type={"primary"}
						block={true}
						loading={isLoading || isFetching}
						disabled={true}
					>
						Júkleniw
					</Button>
				) : (
					listData.map((item, index) => (
						<Button
							style={{
								height: 40,
							}}
							type={"primary"}
							key={index}
							onClick={() => onSelectMarket(item)}
							block={listData.length < 4}
						>
							{item?.name}
						</Button>
					))
				)}
			</Flex>
		</>
	)
}

export { MapSelects }
