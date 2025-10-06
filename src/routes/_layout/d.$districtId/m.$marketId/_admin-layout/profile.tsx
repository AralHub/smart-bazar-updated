import { createFileRoute } from "@tanstack/react-router"
import { ProfilePage } from "src/pages/profile"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { BackButton } from "src/widgets/actions"
import { PageHeader } from "src/widgets/page-header"

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout/profile"
)({
	component: RouteComponent,
})

function RouteComponent() {
	const { paths } = useBreadcrumbsPaths([
		{
			key: "/profile",
			title: "Profil",
		},
	])

	return (
		<>
			<PageHeader
				title={"Profil"}
				breadcrumbs={paths}
				extra={<BackButton />}
			/>
			<ProfilePage />
		</>
	)
}
