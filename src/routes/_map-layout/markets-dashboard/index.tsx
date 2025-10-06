import { createFileRoute } from "@tanstack/react-router"
import { MarketsDashboardPage } from "src/pages/markets-dashboard"

type MarketsDashboardSearch = {
	date?: string
}

export const Route = createFileRoute("/_map-layout/markets-dashboard/")({
	component: RouteComponent,
	validateSearch: (search: MarketsDashboardSearch): MarketsDashboardSearch =>
		search,
})

function RouteComponent() {
	return (
		<>
			<MarketsDashboardPage />
		</>
	)
}
