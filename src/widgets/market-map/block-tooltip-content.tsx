import { type FC } from "react"
import type { SchemeBlock } from "src/services/scheme"
import { formatEmpty, formatPriceWithCurrency } from "src/shared/utils"

const BlockTooltipContent: FC<{ data: SchemeBlock }> = ({ data }) => {
	return (
		<div>
			<p>
				<strong>ID: </strong>
				<span>{formatEmpty(data?.id)}</span>
			</p>
			<p>
				<strong>Jayma: </strong>
				<span>{formatEmpty(data?.name)}</span>
			</p>
			<p>
				<strong>Orinlar sani: </strong>
				<span>{formatEmpty(data?.number_of_open_air_places)}</span>
			</p>
			<p>
				<strong>Tolengen orinlar sani: </strong>
				<span>{formatEmpty(data?.payments_sum_quantity)}</span>
			</p>
			<p>
				<strong>Tolengen summa: </strong>
				<span style={{ color: "green" }}>
					{formatPriceWithCurrency(data?.payments_sum_amount)}
				</span>
			</p>
		</div>
	)
}

export { BlockTooltipContent }
