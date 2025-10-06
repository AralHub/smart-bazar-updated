import { createFileRoute } from "@tanstack/react-router"
import { AnnualIncomePage } from "src/pages/annual-income"

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/annual-income/"
)({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<AnnualIncomePage />
		</>
	)
}
