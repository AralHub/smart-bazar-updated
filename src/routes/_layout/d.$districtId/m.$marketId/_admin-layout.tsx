import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { useEffect } from "react"
import { useGetProfileQuery } from "src/services/auth"
import { useAuth } from "src/shared/hooks"

export const Route = createFileRoute(
	"/_layout/d/$districtId/m/$marketId/_admin-layout"
)({
	component: RouteComponent,
	beforeLoad: ({ context, params }) => {
		if (
			context?.auth?.role === 2 &&
			context?.auth?.market &&
			context?.auth?.district
		) {
			if (
				params?.districtId !== `${context?.auth?.district}` ||
				params?.marketId !== `${context?.auth?.market}`
			) {
				throw redirect({
					to: "/d/$districtId/m/$marketId/dashboard",
					replace: true,
					params: {
						districtId: `${context?.auth?.district}`,
						marketId: `${context?.auth?.market}`,
					},
				})
			}
		}
	},
})

function RouteComponent() {
	const navigate = Route.useNavigate()
	const params = Route.useParams()
	const { setRole } = useAuth()

	const { data: profile } = useGetProfileQuery()

	useEffect(() => {
		if (profile?.data?.role) {
			setRole(profile?.data?.role)
		}
	}, [profile?.data?.role, setRole])

	useEffect(() => {
		if (profile?.data?.role === 2 && profile?.data?.market) {
			if (
				params?.districtId !== `${profile?.data?.market?.district_id}` ||
				params?.marketId !== `${profile?.data?.market?.id}`
			) {
				navigate({
					to: "/d/$districtId/m/$marketId/dashboard",
					replace: true,
					params: {
						marketId: `${profile?.data?.market?.id}`,
						districtId: `${profile?.data?.market?.district_id}`,
					},
				})
			}
		}
	}, [
		navigate,
		params?.districtId,
		params?.marketId,
		profile?.data?.market,
		profile?.data?.role,
	])
	return (
		<>
			<Outlet />
		</>
	)
}
