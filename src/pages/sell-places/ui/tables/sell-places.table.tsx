import { useParams } from "@tanstack/react-router"
import { type FC, useState } from "react"
import { useSellPlacesColumns } from "src/pages/sell-places/hooks"
import { type Place, useGetPlacesQuery } from "src/services/dashboard/places"
import { useGetBlocksQuery } from "src/services/dashboard/places/blocks"
import { useGetPlaceTypesQuery } from "src/services/dashboard/places/place-types"
import { useTablePagination } from "src/shared/hooks"
import { InputSearch, Select, SkeletonButton, Table, Tabs } from "src/shared/ui"

const SellPlacesTable: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/sell-places",
	})
	const pagination = useTablePagination({
		current: 1,
		pageSize: 10,
	})
	const [placeType, setPlaceType] = useState("")
	const [block, setBlock] = useState<number>()
	const [search, setSearch] = useState<string>("")

	const {
		data: places,
		isLoading,
		isFetching,
	} = useGetPlacesQuery({
		page: pagination.current,
		per_page: pagination.pageSize,
		market_id: marketId,
		place_type_id: placeType,
		block_id: block,
		search,
	})

	const { data: placeTypes, isLoading: placeTypesLoading } =
		useGetPlaceTypesQuery({
			market_id: marketId,
		})

	const { data: blocks, isLoading: blocksLoading } = useGetBlocksQuery({
		market_id: marketId,
		per_page: 1000,
	})

	const columns = useSellPlacesColumns()

	return (
		<>
			<Table<Place>
				rowKey={"id"}
				title={
					<InputSearch
						value={search}
						onChange={setSearch}
					/>
				}
				extra={
					<Select<number>
						placeholder={"Block saylan"}
						style={{ minWidth: 150 }}
						loading={blocksLoading}
						allowClear={true}
						disabled={blocksLoading}
						value={block}
						onChange={(value) => setBlock(value)}
						options={blocks?.data?.map((el) => ({
							value: el.id,
							label: el?.name,
						}))}
					/>
				}
				subExtra={
					placeTypesLoading ? (
						<SkeletonButton
							active={true}
							style={{ height: 46, width: "100%" }}
						/>
					) : (
						<Tabs
							tabBarStyle={{
								marginBottom: 0,
							}}
							items={[
								{
									key: "",
									label: "Hámmesi",
								},
								...(placeTypes?.data?.map((el) => ({
									key: `${el.id}`,
									label: el.name,
								})) || []),
							]}
							onChange={setPlaceType}
							defaultActiveKey={""}
							activeKey={placeType}
						/>
					)
				}
				loading={isLoading || isFetching}
				columns={columns}
				dataSource={places?.data}
				pagination={{
					...pagination,
					total: places?.meta?.total,
				}}
			/>
		</>
	)
}

export { SellPlacesTable }
