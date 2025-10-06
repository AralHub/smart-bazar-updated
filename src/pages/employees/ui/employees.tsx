import { useParams } from "@tanstack/react-router"
import { type FC } from "react"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { PageHeader } from "src/widgets/page-header"
import { EmployeesForm } from "./forms"
import { EmployeesTable } from "./tables"

const Employees: FC = () => {
	const { districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/employees",
	})

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/employees`,
			title: "Xızmetkerler",
		},
	])

	return (
		<>
			<PageHeader
				title={"Xızmetkerler"}
				breadcrumbs={paths}
			/>
			<EmployeesForm />
			<EmployeesTable />
		</>
	)
}

export { Employees }
