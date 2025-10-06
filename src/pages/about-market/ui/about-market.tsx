import { useParams } from "@tanstack/react-router"
import { type FC } from "react"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { PageHeader } from "src/widgets/page-header"
import { MarketPaymentsChart } from "./charts"
import { AboutMarketDescription } from "./descriptions"
import { AboutMarketStatistic, MarketPaymentsStatistic } from "./statistics"

const AboutMarket: FC = () => {
	const params = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/",
	})

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${params?.districtId}/m/${params?.marketId}/`,
			title: "Bazar haqqında maǵlıwmat",
		},
	])

	return (
		<>
			<PageHeader
				title={"Bazar haqqında maǵlıwmat"}
				breadcrumbs={paths}
			/>
			<AboutMarketDescription />
			<AboutMarketStatistic />
			<MarketPaymentsStatistic />
			<MarketPaymentsChart />
			{/*<MarketPaymentsByYearChart />*/}
		</>
	)
}

export { AboutMarket }
