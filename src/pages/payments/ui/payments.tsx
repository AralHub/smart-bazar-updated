import { useParams } from "@tanstack/react-router"
import { type FC } from "react"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { PageHeader } from "src/widgets/page-header"
import { PaymentsTable } from "src/widgets/tables"
import { PaymentsForm } from "./forms"

const Payments: FC = () => {
	const { districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/payments",
	})

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/payments`,
			title: "Tólemler",
		},
	])
	return (
		<>
			<PageHeader
				title={"Tólemler"}
				breadcrumbs={paths}
			/>
			<PaymentsForm />
			<PaymentsTable />
		</>
	)
}

export { Payments }
