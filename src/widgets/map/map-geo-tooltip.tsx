import { type FC, useMemo } from "react"
import type { District } from "src/services/dashboard/districts"
import { TOKEN } from "src/shared/constants"

interface MapGeoTooltipProps {
	data: District
}

const MapGeoTooltip: FC<MapGeoTooltipProps> = ({ data: district }) => {
	const data = useMemo(
		() => [
			{
				label: "Dıyqan bazarlar",
				value: district?.farmer_markets_count || 0,
				color: TOKEN.purple,
			},
			{
				label: "Sawda kompleksi",
				value: district?.shopping_malls_count || 0,
				color: TOKEN.magenta,
			},
			{
				label: "Avto turar orınlar",
				value:
					(district?.market_car_parks_count || 0) +
					(district?.shopping_car_parks_count || 0),
				color: TOKEN.cyan,
			},
			{
				label: "Mal bazarlar",
				value: district?.cattle_markets_count || 0,
				color: TOKEN.orange,
			},
			{
				label: "Hájetxanalar",
				value: district?.restrooms_count || 0,
				color: TOKEN.lime,
			},
		],
		[
			district?.cattle_markets_count,
			district?.farmer_markets_count,
			district?.market_car_parks_count,
			district?.restrooms_count,
			district?.shopping_car_parks_count,
			district?.shopping_malls_count,
		]
	)

	return (
		<>
			<div>
				<h3
					style={{
						fontWeight: 600,
					}}
				>
					{district?.name}
				</h3>
				{data.map((item, index) => (
					<p
						key={index}
						style={{
							display: "flex",
							alignItems: "center",
							gap: 4,
						}}
					>
						<span
							style={{
								display: "flex",
								alignItems: "center",
								gap: 4,
							}}
						>
							<label
								style={{
									display: "inline-block",
									width: 16,
									height: 16,
									borderRadius: "50%",
									backgroundColor: item.color,
								}}
							/>
							{item.label}:
						</span>
						<strong
							style={{
								textAlign: "end",
								marginLeft: "auto",
							}}
						>
							{item.value}
						</strong>
					</p>
				))}
			</div>
		</>
	)
}

export { MapGeoTooltip }
