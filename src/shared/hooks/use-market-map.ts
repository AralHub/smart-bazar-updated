import { useParams } from "@tanstack/react-router"
import { marketsMapsData } from "src/shared/data"

export const useMarketMap = () => {
	const { districtId, marketId } = useParams({
		strict: false,
	})

	return marketsMapsData.find(
		(el) =>
			el.districtId === Number(districtId) && el.marketId === Number(marketId)
	)
}
