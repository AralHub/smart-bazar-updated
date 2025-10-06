import { createFileRoute } from "@tanstack/react-router"
import { PaymentsPage } from "src/pages/payments"

export const Route = createFileRoute("/_layout/d/$districtId/m/$marketId/_admin-layout/payments")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<PaymentsPage />
		</>
	)
}
