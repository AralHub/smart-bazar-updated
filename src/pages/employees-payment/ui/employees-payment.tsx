import { useParams } from "@tanstack/react-router"
import { type FC } from "react"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { PageHeader } from "src/widgets/page-header"
import { EmployeesPaymentTable } from "./tables"

const EmployeesPayment: FC = () => {
	const { districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/employees-payment/",
	})

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/employees-payment/`,
			title: "Xızmetkerler tolemi",
		},
	])
	return (
		<>
			<PageHeader
				title={"Xızmetkerler tolemi"}
				breadcrumbs={paths}
			/>
			<EmployeesPaymentTable />
		</>
	)
}

export { EmployeesPayment }
