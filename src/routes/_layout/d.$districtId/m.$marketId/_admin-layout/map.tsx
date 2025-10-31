import { createFileRoute } from "@tanstack/react-router"
import { MapPage } from "src/pages/map"

type MapSearch = {
	fullscreen?: string
	date?: string
	map?: string | number
}

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/map"
)({
	component: RouteComponent,
	validateSearch: (search: MapSearch) => search,
})

function RouteComponent() {
	return (
		<>
			<MapPage />
		</>
	)
}
