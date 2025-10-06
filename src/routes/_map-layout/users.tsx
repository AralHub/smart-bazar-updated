import { createFileRoute } from "@tanstack/react-router"
import { UsersPage } from "src/pages/users"

export const Route = createFileRoute("/_map-layout/users")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
		<>
			<UsersPage />
		</>
	)
}
