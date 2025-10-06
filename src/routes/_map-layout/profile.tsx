import { HomeOutlined } from "@ant-design/icons"
import { createFileRoute, Link } from "@tanstack/react-router"
import { ProfilePage } from "src/pages/profile"
import { BackButton } from "src/widgets/actions"
import { PageHeader } from "src/widgets/page-header"

export const Route = createFileRoute("/_map-layout/profile")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<PageHeader
				title={"Profil"}
				breadcrumbs={[
					{
						key: "/",
						title: (
							<Link to={"/"}>
								<HomeOutlined /> Bas bet
							</Link>
						),
					},
					{
						key: "/profile",
						title: "Profil",
					},
				]}
				extra={<BackButton />}
			/>
			<ProfilePage />
		</>
	)
}
