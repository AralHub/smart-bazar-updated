import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { useEffect } from "react"
import { useGetProfileQuery } from "src/services/auth"
import { useSyncProfileEffect } from "src/shared/hooks"
import {
	Container,
	Header,
	InnerLayout,
	MainContent,
	MainLayout,
} from "src/shared/layout"

export const Route = createFileRoute("/_map-layout")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context?.auth?.isAuth) {
			throw redirect({
				to: "/login",
				replace: true,
			})
		}
		if (
			context?.auth?.role === 2 &&
			context?.auth?.market &&
			context?.auth?.district
		) {
			throw redirect({
				to: "/d/$districtId/m/$marketId/dashboard",
				replace: true,
				params: {
					marketId: `${context?.auth?.market}`,
					districtId: `${context?.auth?.district}`,
				},
			})
		}
	},
})

function RouteComponent() {
	const navigate = Route.useNavigate()

	const { data: profile } = useGetProfileQuery()

	useSyncProfileEffect()
	useEffect(() => {
		if (profile?.data?.role === 2 && profile?.data?.market) {
			navigate({
				to: "/d/$districtId/m/$marketId/dashboard",
				replace: true,
				params: {
					marketId: `${profile?.data?.market?.id}`,
					districtId: `${profile?.data?.market?.district_id}`,
				},
			})
		}
	}, [navigate, profile?.data?.market, profile?.data?.role])
	return (
		<>
			<MainLayout>
				<Header isHome={true} />
				<InnerLayout hasSider={false}>
					<MainContent
						flexProps={{
							style: {
								marginInline: 16,
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
