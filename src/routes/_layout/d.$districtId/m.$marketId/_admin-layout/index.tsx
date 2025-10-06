import { createFileRoute } from "@tanstack/react-router"
import { AboutMarketPage } from "src/pages/about-market"

export const Route = createFileRoute("/_layout/d/$districtId/m/$marketId/_admin-layout/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<AboutMarketPage />
		</>
	)
}
