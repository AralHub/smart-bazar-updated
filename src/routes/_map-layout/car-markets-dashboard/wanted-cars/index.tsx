import { createFileRoute } from "@tanstack/react-router"
import { CarMarketsWantedCarsPage } from "src/pages/car-markets-wanted-cars"

export const Route = createFileRoute("/_map-layout/car-markets-dashboard/wanted-cars/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<CarMarketsWantedCarsPage />
		</>
	)
}
