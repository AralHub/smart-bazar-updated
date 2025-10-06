import { createFileRoute } from "@tanstack/react-router"
import { EmployeePaymentPage } from "src/pages/employee-payment"

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/employees-payment/$employeeId"
)({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<EmployeePaymentPage />
		</>
	)
}
