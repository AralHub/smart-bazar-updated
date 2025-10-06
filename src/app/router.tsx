import Loading3QuartersOutlined from "@ant-design/icons/Loading3QuartersOutlined"
import { createRouter } from "@tanstack/react-router"
import Spin from "antd/es/spin"

// Import the generated route tree
import { routeTree } from "src/routeTree.gen"
import { ErrorBoundary, NotFound } from "src/shared/layout"

// Create a new router instance
export const router = createRouter({
	routeTree,
	context: {
		auth: undefined
	},
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	defaultPendingComponent: () => (
		<Spin
			spinning={true}
			fullscreen={true}
			size={"large"}
			indicator={
				<Loading3QuartersOutlined spin={true} style={{ color: "#fff" }} />
			}
		/>
	),
	defaultNotFoundComponent: NotFound,
	defaultErrorComponent: ErrorBoundary
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}
