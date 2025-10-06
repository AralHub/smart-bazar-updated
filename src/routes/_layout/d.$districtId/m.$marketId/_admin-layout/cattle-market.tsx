import { createFileRoute } from "@tanstack/react-router"
import { CattleMarketPage } from "src/pages/cattle-market"

type CattleMarketSearch = {
	date?: string
	cattle_market?: string | number
}

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/cattle-market"
)({
	component: RouteComponent,
	validateSearch: (search: CattleMarketSearch): CattleMarketSearch => search,
})

function RouteComponent() {
	return (
		<>
			<CattleMarketPage />
		</>
	)
}
