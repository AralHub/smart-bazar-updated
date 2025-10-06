import { useNavigate, useSearch } from "@tanstack/react-router"
import { type FC, useMemo } from "react"
import type { SchemeBlock, SchemePlace } from "src/services/scheme"
import { useMarketMap } from "src/shared/hooks"
import { Card } from "src/shared/ui"
import { MarketMap } from "src/widgets/market-map"

interface SchemaMapProps {
	data?: {
		places: SchemePlace[]
		blocks: SchemeBlock[]
	}
	loading?: boolean
}

const SchemaMap: FC<SchemaMapProps> = ({ data: places, loading }) => {
	const search = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/map",
	})
	const navigate = useNavigate({
		from: "/d/$districtId/m/$marketId/map",
	})

	const mapData = useMarketMap()

	const mapTabList = useMemo(() => {
		if (!mapData) return
		if (!mapData?.items) return

		const items = mapData?.items?.map((item) => ({
			key: `${item.id}`,
			label: item.title,
		}))
		return [
			{
				key: "",
				label: "Hammesi",
			},
			...items,
		]
	}, [mapData])

	return (
		<>
			<Card
				style={{
					height: "100%",
					position: "relative",
				}}
				activeTabKey={search?.map ? `${search?.map}` : ""}
				onTabChange={(key) => {
					navigate({
						to: ".",
						replace: true,
						search: (prev) => ({
							...prev,
							map: key ? Number(key) : undefined,
						}),
						resetScroll: false,
					})
				}}
				tabList={mapTabList}
				draggable={false}
				styles={{
					body: {
						padding: 0,
						height: "calc(100% - 56px)",
					},
				}}
			>
				<MarketMap
					style={{
						minHeight: 800,
					}}
					loading={loading}
					data={places}
					tabKey={search?.map}
				/>
			</Card>
		</>
	)
}

export { SchemaMap }
