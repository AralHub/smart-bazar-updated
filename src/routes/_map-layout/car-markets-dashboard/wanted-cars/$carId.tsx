import { createFileRoute } from "@tanstack/react-router"
import { CarMarketsWantedCarPage } from "src/pages/car-markets-wanted-car"

type CarIdSearch = {
	car_park?: string | number
}

export const Route = createFileRoute(
	"/_map-layout/car-markets-dashboard/wanted-cars/$carId"
)({
	component: RouteComponent,
	validateSearch: (search: CarIdSearch): CarIdSearch => search,
})

function RouteComponent() {
	return (
		<>
			<CarMarketsWantedCarPage />
		</>
	)
}
