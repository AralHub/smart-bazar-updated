import {
	type CSSProperties,
	type FC,
	lazy,
	Suspense,
	useEffect,
	useMemo,
	useState,
} from "react"
import type { SchemeBlock, SchemePlace } from "src/services/scheme"
import { MapSvg } from "src/shared/assets"
import { useMarketMap } from "src/shared/hooks"
import { Spin } from "src/shared/ui"
import {
	checkMapExists,
	registerSvgMap,
} from "src/widgets/market-map/market-map.utils.tsx"

const LazyMarketMapContent = lazy(() =>
	import("./market-map-content.tsx").then((m) => ({
		default: m.MarketMapContent,
	}))
)

interface MarketMapProps {
	style?: CSSProperties
	data?: {
		places?: SchemePlace[]
		blocks?: SchemeBlock[]
	}
	loading?: boolean
	tabKey?: number | string
}

const MarketMap: FC<MarketMapProps> = ({ style, data, tabKey, loading }) => {
	const map = useMarketMap()
	const [progress, setProgress] = useState(true)

	const selectedMap = useMemo(() => {
		if (!tabKey) return map
		if (!map?.items) return map
		if (map?.items.length === 0) return map

		return map?.items?.find((el) => Number(el.id) === Number(tabKey))
	}, [map, tabKey])

	const loadingComp = (
		<Spin spinning={true}>
			<div
				style={{
					width: "100%",
					...style,
				}}
			></div>
		</Spin>
	)

	useEffect(() => {
		if (selectedMap && selectedMap?.svg) {
			const register = MapSvg[selectedMap?.name]
			if (!register) {
				throw new Error("Bunday kartanin maǵlıwmatlar tabılmadı!")
			}
			if (register) {
				register().then((e) => {
					if (checkMapExists(selectedMap.name)) {
						return
					}
					registerSvgMap(selectedMap?.name, e.default)
				})
			}
		}
	}, [selectedMap])

	useEffect(() => {
		if (!selectedMap) return
		if (!selectedMap.svg) {
			setProgress(false)
			return
		}

		// Сразу проверяем состояние
		if (checkMapExists(selectedMap.name)) {
			setProgress(false)
			return
		}

		setProgress(true)
		const timer = setInterval(() => {
			if (checkMapExists(selectedMap.name)) {
				setProgress(false)
				clearInterval(timer) // Останавливаем таймер при успехе
			}
		}, 100) // Более частая проверка для отзывчивости

		return () => clearInterval(timer)
	}, [selectedMap])

	if (progress) return loadingComp

	return (
		<Suspense fallback={loadingComp}>
			<LazyMarketMapContent
				style={style}
				data={data}
				tabKey={tabKey}
				loading={loading}
			/>
		</Suspense>
	)
}

export { MarketMap }
