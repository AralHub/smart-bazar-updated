import { createFileRoute } from "@tanstack/react-router"
import { CarMarketsDashboardPage } from "src/pages/car-markets-dashboard"

type CarMarketsSearch = {
	date?: string
}

export const Route = createFileRoute("/_map-layout/car-markets-dashboard/")({
	component: RouteComponent,
	validateSearch: (search: CarMarketsSearch): CarMarketsSearch => search,
})

function RouteComponent() {
	return (
		<>
			<CarMarketsDashboardPage />
		</>
	)
}
