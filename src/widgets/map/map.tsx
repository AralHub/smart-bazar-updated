import { type FC, lazy, Suspense } from "react"
import type { District } from "src/services/dashboard/districts"
import { Spin } from "src/shared/ui"

const MapGeo = lazy(() =>
	import("./map-geo.tsx").then((m) => ({
		default: m.MapGeo,
	}))
)

interface MapProps {
	onSelect: (map: District) => void
	value: number[]
	size?: "small" | "middle"
}

const Map: FC<MapProps> = ({ value, onSelect, size }) => {
	return (
		<>
			<Suspense
				fallback={
					<Spin spinning={true}>
						<div
							style={{ height: "100%", minHeight: 300, width: "100%" }}
						></div>
					</Spin>
				}
			>
				<MapGeo
					value={value}
					size={size}
					onSelect={onSelect}
				/>
			</Suspense>
		</>
	)
}

export { Map }
