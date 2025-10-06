import { lazy, memo } from "react"

const LazyMarketMap = lazy(() =>
	import("./market-map.tsx").then((m) => ({
		default: m.MarketMap,
	}))
)

const MemorizeMarketMap = memo(LazyMarketMap)

export { MemorizeMarketMap as MarketMap }
