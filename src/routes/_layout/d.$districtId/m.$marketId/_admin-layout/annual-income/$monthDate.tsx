import { createFileRoute } from "@tanstack/react-router"
import { MonthlyIncomePage } from "src/pages/monthly-income"

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/annual-income/$monthDate"
)({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<MonthlyIncomePage />
		</>
	)
}
