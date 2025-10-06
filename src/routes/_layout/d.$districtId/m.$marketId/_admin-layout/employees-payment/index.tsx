import { createFileRoute } from "@tanstack/react-router"
import { EmployeesPaymentPage } from "src/pages/employees-payment"

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/employees-payment/"
)({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<EmployeesPaymentPage />
		</>
	)
}
