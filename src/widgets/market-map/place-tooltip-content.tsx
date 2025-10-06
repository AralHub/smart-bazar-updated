import { type FC } from "react"
import type { SchemePlace } from "src/services/scheme"
import { formatEmpty, formatPriceWithCurrency } from "src/shared/utils"

const PlaceTooltipContent: FC<{ data: SchemePlace }> = ({ data }) => {
	const totalAmountPrice = Math.min(
		(Number(data?.payments_sum_amount) || 0) - (Number(data?.price) || 0),
		0
	)

	const placeName = formatEmpty(data?.place_type?.name)

	return (
		<div>
			<p>
				<strong>ID: </strong>
				<span>{formatEmpty(data?.id)}</span>
			</p>
			<p>
				<strong>Block: </strong>
				<span>{formatEmpty(data?.block?.name)}</span>
			</p>
			<p>
				<strong>Orni: </strong>
				<span>{formatEmpty(data?.name)}</span>
			</p>
			<p>
				<strong>Orin turi: </strong>
				<span>
					{data?.is_rent ? (
						<>
							<strong style={{ color: "orange" }}>(Arenda)</strong> {placeName}
						</>
					) : (
						placeName
					)}
				</span>
			</p>
			<p>
				<strong>Satiwshi: </strong>
				<span>{formatEmpty(data?.seller?.name)}</span>
			</p>
			<p>
				<strong>PINFL/STIR: </strong>
				<span>{formatEmpty(data?.seller?.tin)}</span>
			</p>
			<p>
				<strong>Tolew kerek summa: </strong>
				<span>{formatPriceWithCurrency(data?.price)}</span>
			</p>
			<p>
				<strong>Tolengen summa: </strong>
				<span style={{ color: "green" }}>
					{formatPriceWithCurrency(data?.payments_sum_amount)}
				</span>
			</p>
			<p>
				<strong>Qarz summa: </strong>
				<span style={{ color: totalAmountPrice >= 0 ? "green" : "red" }}>
					{formatPriceWithCurrency(totalAmountPrice)}
				</span>
			</p>
			<p>
				<strong>Maydan: </strong>
				<span>
					{data?.area ? (
						<>
							{data?.area || 0} m<sup>2</sup>
						</>
					) : (
						"-"
					)}
				</span>
			</p>
		</div>
	)
}

export { PlaceTooltipContent }
