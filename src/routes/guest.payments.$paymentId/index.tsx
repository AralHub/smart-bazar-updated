import { createFileRoute } from "@tanstack/react-router"
import { GuestPage } from "src/pages/guest"
import { Container, Header, MainContent, MainLayout } from "src/shared/layout"

export const Route = createFileRoute("/guest/payments/$paymentId/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<MainLayout>
			<Header isGuest={true} />
			<MainContent>
				<Container>
					<GuestPage />
				</Container>
			</MainContent>
		</MainLayout>
	)
}
