import { createFileRoute } from "@tanstack/react-router"
import { HomePage } from "src/pages/home"

type HomeMapSearch = {
	variant?: number
	district?: number
	districts?: string
	tab?: string
}

export const Route = createFileRoute("/_map-layout/")({
	component: RouteComponent,
	validateSearch: (search: HomeMapSearch): HomeMapSearch => ({
		...search,
		variant: search?.variant ? Number(search?.variant) : undefined,
		district: search?.district ? Number(search?.district) : undefined,
	}),
})

function RouteComponent() {
	return (
		<>
			<HomePage />
		</>
	)
}
