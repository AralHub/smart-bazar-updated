import { createFileRoute } from "@tanstack/react-router"
import { CarMarketPage } from "src/pages/car-market"

type CarMarketSearch = {
	date?: string
	car_park?: string | number
}

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/car-market"
)({
	component: RouteComponent,
	validateSearch: (search: CarMarketSearch): CarMarketSearch => search,
})

function RouteComponent() {
	return (
		<>
			<CarMarketPage />
		</>
	)
}
