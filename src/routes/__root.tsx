import {
	createRootRouteWithContext,
	Outlet,
	useRouterState
} from "@tanstack/react-router"
import type { AuthContext } from "src/shared/context"
import { Loader } from "src/widgets/loader"

export const Route = createRootRouteWithContext<{
	auth?: AuthContext
}>()({
	component: RootComponent
})

function RootComponent() {
	const isLoading = useRouterState({
		select: (state) => state.status === "pending"
	})

	return (
		<>
			<Loader loading={isLoading} />
			<Outlet />
		</>
	)
}
