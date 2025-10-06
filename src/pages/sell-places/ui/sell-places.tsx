import { useParams } from "@tanstack/react-router"
import { type FC } from "react"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { AddButton } from "src/widgets/actions"
import { PageHeader } from "src/widgets/page-header"
import { SellPlacesForm } from "./forms"
import { SellPlacesTable } from "./tables"

const SellPlaces: FC = () => {
	const { districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/sell-places",
	})

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/sell-places`,
			title: "Sawda orınları",
		},
	])

	return (
		<>
			<PageHeader
				title={"Sawda orınları"}
				extra={<AddButton showChildren={true} />}
				breadcrumbs={paths}
			/>
			<SellPlacesForm />
			<SellPlacesTable />
		</>
	)
}

export { SellPlaces }
