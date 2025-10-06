import { createFileRoute } from "@tanstack/react-router"
import { ControlPage } from "src/pages/control"

export const Route = createFileRoute("/_layout/d/$districtId/m/$marketId/_admin-layout/control")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<ControlPage />
		</>
	)
}
