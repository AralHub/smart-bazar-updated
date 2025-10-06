import { createFileRoute } from "@tanstack/react-router"
import { RestroomsPage } from "src/pages/restrooms"

type RestroomsSearch = {
	date?: string
	restroom?: string | number
}

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/restrooms"
)({
	component: RouteComponent,
	validateSearch: (search: RestroomsSearch): RestroomsSearch => search,
})

function RouteComponent() {
	return (
		<>
			<RestroomsPage />
		</>
	)
}
