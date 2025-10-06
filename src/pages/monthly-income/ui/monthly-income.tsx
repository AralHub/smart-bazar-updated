import { Link, useParams } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC } from "react"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { BackButton } from "src/widgets/actions"
import { PageHeader } from "src/widgets/page-header"
import { MonthlyIncomeTable } from "./tables"

const MonthlyIncome: FC = () => {
	const { districtId, marketId, monthDate } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/annual-income/$monthDate",
	})

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/annual-income/`,
			title: (
				<Link
					to={"/d/$districtId/m/$marketId/annual-income"}
					params={{
						districtId,
						marketId,
					}}
				>
					Jıllıq dáramatlar
				</Link>
			),
		},
		{
			key: `/d/${districtId}/m/${marketId}/annual-income/${monthDate}`,
			title: `${dayjs(monthDate).format("MMMM")} ayliq dáramatlar`,
		},
	])

	return (
		<>
			<PageHeader
				title={`${dayjs(monthDate).format("MMMM")} ayliq dáramatlar`}
				breadcrumbs={paths}
				extra={<BackButton key={"back"} />}
			/>
			<MonthlyIncomeTable />
		</>
	)
}

export { MonthlyIncome }
