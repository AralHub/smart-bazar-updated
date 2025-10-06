import { createFileRoute } from "@tanstack/react-router"
import { RestroomsDashboardPage } from "src/pages/restrooms-dashboard"

type RestroomsDashboardSearch = {
	date?: string
}

export const Route = createFileRoute("/_map-layout/restrooms-dashboard/")({
	component: RouteComponent,
	validateSearch: (
		search: RestroomsDashboardSearch
	): RestroomsDashboardSearch => search,
})

function RouteComponent() {
	return (
		<>
			<RestroomsDashboardPage />
		</>
	)
}
