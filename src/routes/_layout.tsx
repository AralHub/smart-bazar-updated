import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import {
	Container,
	Header,
	InnerLayout,
	MainContent,
	MainLayout,
	Sidebar,
} from "src/shared/layout"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context?.auth?.isAuth) {
			throw redirect({
				to: "/login",
				replace: true,
			})
		}
	},
})

function RouteComponent() {
	return (
		<>
			<MainLayout>
				<Header />
				<InnerLayout>
					<Sidebar />
					<MainContent
						flexProps={{
							style: {
								marginRight: 16,
								marginBottom: 24,
							},
						}}
					>
						<Container isLarge={true}>
							<Outlet />
						</Container>
					</MainContent>
				</InnerLayout>
			</MainLayout>
		</>
	)
}
