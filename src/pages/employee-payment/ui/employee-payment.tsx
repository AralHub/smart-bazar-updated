import { useParams } from "@tanstack/react-router"
import { type FC } from "react"
import { useGetEmployeesByIdQuery } from "src/services/dashboard/employees"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { BackButton } from "src/widgets/actions"
import { PageHeader } from "src/widgets/page-header"
import { PaymentsTable } from "src/widgets/tables"

const EmployeePayment: FC = () => {
	const { employeeId, districtId, marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/employees-payment/$employeeId",
	})

	const { data: employee, isLoading } = useGetEmployeesByIdQuery(employeeId)

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/employees-payment/`,
			title: employee?.data?.name ? employee?.data?.name : "Xizmetker tolemi",
		},
	])
	return (
		<>
			<PageHeader
				loading={isLoading}
				title={employee?.data?.name ? employee?.data?.name : "Xizmetker tolemi"}
				extra={<BackButton />}
				breadcrumbs={paths}
			/>
			<PaymentsTable employeeId={employeeId} />
		</>
	)
}

export { EmployeePayment }
