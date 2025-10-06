import { createFileRoute, redirect } from "@tanstack/react-router"
import { LoginPage } from "src/pages/login"

export const Route = createFileRoute("/login")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (context?.auth?.isAuth) {
			throw redirect({
				to: "/",
				replace: true,
			})
		}
	},
})

function RouteComponent() {
	return (
		<>
			<LoginPage />
		</>
	)
}
