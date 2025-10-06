import { createFileRoute } from "@tanstack/react-router"
import { ParkingPage } from "src/pages/parking"

type ParkingSearch = {
	date?: string
	car_park?: string | number
}

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/parking"
)({
	component: RouteComponent,
	validateSearch: (search: ParkingSearch): ParkingSearch => search,
})

function RouteComponent() {
	return (
		<>
			<ParkingPage />
		</>
	)
}
