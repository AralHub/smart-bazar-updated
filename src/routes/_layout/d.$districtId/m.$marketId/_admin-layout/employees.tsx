import { createFileRoute } from "@tanstack/react-router"
import { EmployeesPage } from "src/pages/employees"

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/employees"
)({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<EmployeesPage />
		</>
	)
}
