import {
	AppstoreAddOutlined,
	DollarOutlined,
	ProductOutlined,
	SettingOutlined,
} from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useMemo, useState } from "react"
import { useGetPaymentsQuery } from "src/services/dashboard/payments"
import { useGetServiceTypesQuery } from "src/services/dashboard/payments/service-types"
import {
	useGetSchemeBlocksQuery,
	useGetSchemePlacesQuery,
} from "src/services/scheme"
import { useBreadcrumbsPaths } from "src/shared/hooks"
import { Card, Col, Count, Flex, Row, Title } from "src/shared/ui"
import { DatePickerWithNow } from "src/widgets/date-picker-with-now"
import { PageHeader } from "src/widgets/page-header"
import { TagIcon } from "src/widgets/tag-icon"

const DashboardStatistic: FC = () => {
	const { marketId, districtId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/dashboard",
	})
	const [date, setDate] = useState(() => dayjs())

	const { data: places } = useGetSchemePlacesQuery({
		market_id: marketId,
		date: date.format("YYYY-MM-DD"),
	})

	const { data: servicesTypes } = useGetServiceTypesQuery({
		per_page: 1000,
		page: 1,
		market_id: marketId,
	})

	const { data: payments } = useGetPaymentsQuery({
		per_page: 1000,
		page: 1,
		payment_type_id: 4,
		market_id: marketId,
		date: date.format("YYYY-MM-DD"),
	})

	const { data: blocks } = useGetSchemeBlocksQuery({
		market_id: marketId,
		date: date.format("YYYY-MM-DD"),
	})

	const { paths } = useBreadcrumbsPaths([
		{
			key: `/d/${districtId}/m/${marketId}/dashboard`,
			title: "Bazar statistikası",
		},
	])

	const statisticData = useMemo(
		() => [
			{
				title: "Bazar dukanlar orınlar sani",
				color: "geekblue",
				icon: <ProductOutlined />,
				count:
					places?.data?.filter((el) => el?.place_type_id === 1)?.length || 0,
			},
			{
				title: "Bazar rastalar orınlar sani",
				color: "yellow",
				icon: <AppstoreAddOutlined />,
				count:
					places?.data?.filter((el) => el?.place_type_id === 2)?.length || 0,
			},
			{
				title: "Bazar orınlar uliwmaliq tusim",
				color: "green",
				icon: <DollarOutlined />,
				count:
					places?.data
						?.filter((el) => el.payment)
						?.reduce(
							(total, item) => total + (Number(item?.payments_sum_amount) || 0),
							0
						) || 0,
			},
			{
				title: "Bazar jaymalar sani",
				color: "cyan",
				icon: <ProductOutlined />,
				count: blocks?.data?.length || 0,
			},
			{
				title: "Bazar tolengen jayma-orinlar sani",
				color: "cyan",
				icon: <AppstoreAddOutlined />,
				count:
					blocks?.data?.filter((el) => el.payments_sum_amount)?.length || 0,
				subCount:
					blocks?.data?.reduce(
						(total, item) => total + Number(item.payments_sum_quantity),
						0
					) || 0,
			},
			{
				title: "Bazar jayma uliwmaliq tusim",
				color: "cyan",
				icon: <DollarOutlined />,
				count:
					blocks?.data
						?.filter((el) => el.payments_sum_amount)
						?.reduce(
							(total, item) => total + (Number(item?.payments_sum_amount) || 0),
							0
						) || 0,
			},
			{
				title: "Bazar xizmetler sani",
				color: "geekblue",
				icon: <SettingOutlined />,
				count: servicesTypes?.data?.length || 0,
			},
			{
				title: "Bazar tolengen xizmetler sani",
				color: "yellow",
				icon: <SettingOutlined />,
				// count:
				// 	Array.from(
				// 		new Map(
				// 			payments?.data?.map((item) => [item.service_type_id, item])
				// 		).values()
				// 	)?.length || 0,
				count: payments?.data?.length || 0,
			},
			{
				title: "Bazar xizmetler uliwmaliq tusim",
				color: "orange",
				icon: <DollarOutlined />,
				count:
					payments?.data?.reduce(
						(total, item) => total + (Number(item.amount) || 0),
						0
					) || 0,
			},
		],
		[blocks?.data, payments?.data, places?.data, servicesTypes?.data?.length]
	)

	return (
		<>
			<PageHeader
				title={"Bazar statistikası"}
				breadcrumbs={paths}
				extra={
					<DatePickerWithNow
						value={date}
						format={"D-MMMM, YYYY-jil"}
						onChange={setDate}
						onToday={setDate}
					/>
				}
			/>
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				{statisticData.map((item, index) => (
					<Col
						xs={24}
						md={8}
						key={index}
					>
						<Card>
							<Flex
								gap={16}
								align={"center"}
								style={{ marginBottom: 24 }}
							>
								<TagIcon
									color={item.color}
									icon={item.icon}
								/>
								<Title level={4}>{item.title}</Title>
							</Flex>
							<Flex
								justify={"space-between"}
								align={"center"}
								gap={16}
							>
								<Title
									level={1}
									style={{ flexShrink: 0 }}
								>
									<Count end={item.count} />{" "}
									{item?.subCount ? (
										<>
											<Count
												prefix={"("}
												suffix={")"}
												end={item.subCount}
											/>
										</>
									) : null}
								</Title>
							</Flex>
						</Card>
					</Col>
				))}
			</Row>
		</>
	)
}

export { DashboardStatistic }
