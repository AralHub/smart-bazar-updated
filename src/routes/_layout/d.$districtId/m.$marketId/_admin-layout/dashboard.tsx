import { createFileRoute } from "@tanstack/react-router"
import { DashboardPage } from "src/pages/dashboard"

type DashboardSearch = {
	map?: string
	date?: string
}

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/dashboard"
)({
	component: RouteComponent,
	validateSearch: (search: DashboardSearch): DashboardSearch => search,
})

function RouteComponent() {
	return (
		<>
			<DashboardPage />
		</>
	)
}
