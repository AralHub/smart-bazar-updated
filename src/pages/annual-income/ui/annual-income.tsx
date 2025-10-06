import { useParams } from "@tanstack/react-router"
import { type FC } from "react"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { PageHeader } from "src/widgets/page-header"
import { AnnualIncomeTable } from "./tables"

const AnnualIncome: FC = () => {
	const { districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/annual-income/",
	})

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/annual-income/`,
			title: "Jıllıq dáramatlar",
		},
	])

	return (
		<>
			<PageHeader
				title={"Jıllıq dáramatlar"}
				breadcrumbs={paths}
			/>
			<AnnualIncomeTable />
		</>
	)
}

export { AnnualIncome }
