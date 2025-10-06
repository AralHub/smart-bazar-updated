import { CloudDownloadOutlined, HomeOutlined } from "@ant-design/icons"
import { Link, useNavigate, useParams, useSearch } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useEffect, useState } from "react"
import { useGetCattleMarketsQuery } from "src/services/dashboard/cattle-markets"
import { Button, Col, DatePicker, Row, Select } from "src/shared/ui"
import { PageHeader } from "src/widgets/page-header"
import { CattlePieChart } from "./charts"
import { CattleStatistic } from "./statistics"
import { CattleMarketPaymentsTable } from "./tables"

const CattleMarket: FC = () => {
	const params = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/cattle-market",
	})
	const search = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/cattle-market",
	})
	const navigate = useNavigate()
	const [currentDate, setCurrentDate] = useState(() =>
		search?.date ? dayjs(search?.date) : dayjs()
	)

	const { data: cattleMarkets, isLoading: cattleMarketsLoading } =
		useGetCattleMarketsQuery({
			page: 1,
			per_page: 1000,
			market_id: params?.marketId,
		})

	useEffect(() => {
		navigate({
			to: ".",
			replace: true,
			search: (prev) => ({
				...prev,
				date: currentDate?.format("YYYY-MM-DD"),
				cattle_market: cattleMarkets?.data?.at(0)?.id,
			}),
		})
	}, [cattleMarkets?.data, currentDate, navigate])
	return (
		<>
			<PageHeader
				breadcrumbs={[
					{
						key: "/",
						title: (
							<Link to={"/"}>
								<HomeOutlined /> Bas bet
							</Link>
						),
					},
					{
						key: "/animal-market",
						title: "Mal bazarlar",
					},
				]}
				title={"Mal bazarlar"}
				extra={[
					<DatePicker
						key={"Dates"}
						value={currentDate}
						onChange={setCurrentDate}
					/>,
					<Select
						key={"cattle-markets"}
						placeholder={"Mal bazardi saylan"}
						value={search?.cattle_market}
						onChange={(value) => {
							navigate({
								to: ".",
								replace: true,
								search: (prev) => ({
									...prev,
									cattle_market: value,
								}),
							})
						}}
						loading={cattleMarketsLoading}
						disabled={cattleMarketsLoading}
						options={cattleMarkets?.data?.map((el) => ({
							value: el.id,
							label: el.name,
						}))}
					/>,
					<Button
						type={"primary"}
						icon={<CloudDownloadOutlined />}
						key={"Download"}
					>
						Juklep aliw
					</Button>,
				]}
			/>
			<CattleStatistic />
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				<Col
					xs={24}
					md={8}
				>
					<CattlePieChart />
				</Col>
				<Col
					xs={24}
					md={16}
				>
					<CattleMarketPaymentsTable />
				</Col>
			</Row>
		</>
	)
}

export { CattleMarket }
