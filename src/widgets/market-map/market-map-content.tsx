import {
	type CSSProperties,
	type FC,
	lazy,
	Suspense,
	useCallback,
	useMemo,
	useState,
} from "react"
import type { SchemeBlock, SchemePlace } from "src/services/scheme"
import { Empty, Flex, Spin } from "src/shared/ui"
import { MarketMapToggle } from "./market-map-toggle.tsx"
import { useMarketMapOption } from "./market-map.option.tsx"
import { PlaceCameraModal } from "./place-camera-modal.tsx"
import { PlaceInfoModal } from "./place-info-modal.tsx"

const LazyMarketMapChart = lazy(() =>
	import("./market-map.chart.tsx").then((m) => ({
		default: m.MarketMapChart,
	}))
)

export interface MarketMapContentProps {
	style?: CSSProperties
	data?: {
		places?: SchemePlace[]
		blocks?: SchemeBlock[]
	}
	loading?: boolean
	tabKey?: number | string
}

const MarketMapContent: FC<MarketMapContentProps> = ({
	style,
	data,
	tabKey,
	loading,
}) => {
	const [place, setPlace] = useState<string>()
	const [block, setBlock] = useState<string>()
	const [open, setOpen] = useState(false)
	const [camera, setCamera] = useState<string>()
	const [openCamera, setOpenCamera] = useState(false)

	const [visible, setVisible] = useState({
		isBlock: true,
		isInfra: true,
		isRasta: true,
	})

	const visiblePlaces = useMemo(() => {
		if (!visible.isInfra && !visible.isRasta) return []
		if (visible.isInfra && !visible.isRasta)
			return data?.places?.filter((el) => el.place_type_id === 1)
		if (!visible.isInfra && visible.isRasta)
			return data?.places?.filter((el) => el.place_type_id === 2)
		return data?.places
	}, [data?.places, visible.isInfra, visible.isRasta])

	const option = useMarketMapOption(
		{
			places: visiblePlaces,
			blocks: visible?.isBlock ? data?.blocks : [],
		},
		tabKey
	)

	const modalData = useMemo(() => ({ place, block }), [block, place])

	const onClickMap = useCallback(
		(params: {
			name: string
			region: {
				tooltip?: {
					show: boolean
				}
			}
		}) => {
			if (!params?.region?.tooltip) return
			if (
				params?.name?.startsWith("c") &&
				params?.region?.tooltip?.show
			) {
				setCamera(params?.name)
				setOpenCamera(true)
				return
			}
			if (params?.name?.startsWith("b")) {
				setPlace(undefined)
				setBlock(params?.name.split("_")[1])
				setOpen(true)
				return
			}
			if (Number(params?.name)) {
				setBlock(undefined)
				setPlace(params?.name)
				setOpen(true)
				return
			}
		},
		[]
	)
	if (!option)
		return (
			<Flex
				justify={"center"}
				align={"center"}
				style={style}
			>
				<Empty description={"Bunday kartanin maǵlıwmatlar tabılmadı"} />
			</Flex>
		)
	return (
		<div
			style={{
				position: "relative",
				...style,
			}}
		>
			<MarketMapToggle
				value={visible}
				onChange={setVisible}
			/>
			<PlaceInfoModal
				data={modalData}
				open={open}
				onClose={() => {
					setPlace(undefined)
					setBlock(undefined)
					setOpen(false)
				}}
			/>
			<PlaceCameraModal
				data={camera}
				open={openCamera}
				onClose={() => {
					setCamera(undefined)
					setOpenCamera(false)
				}}
			/>
			<Suspense
				fallback={
					<Spin spinning={true}>
						<div
							style={{
								width: "100%",
								...style,
							}}
						></div>
					</Spin>
				}
			>
				<LazyMarketMapChart
					style={style}
					loading={loading}
					option={option}
					onClick={onClickMap}
				/>
			</Suspense>
		</div>
	)
}

export { MarketMapContent }

