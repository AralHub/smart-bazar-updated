import { createFileRoute } from "@tanstack/react-router"
import { SellPlacesPage } from "src/pages/sell-places"

export const Route = createFileRoute("/_layout/d/$districtId/m/$marketId/_admin-layout/sell-places")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<SellPlacesPage />
		</>
	)
}
