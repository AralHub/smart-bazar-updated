import {
	CarOutlined,
	ClearOutlined,
	FilterOutlined,
	ProductOutlined,
	ShopOutlined,
	TeamOutlined,
} from "@ant-design/icons"
import { useNavigate, useSearch } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useCallback, useState } from "react"
import { useGetStatisticsDashboardQuery } from "src/services/statistics"
import { Button, Card, Count, Divider, Flex } from "src/shared/ui"
import { CowOutlined } from "src/shared/ui/icons"
import { CardTagMeta } from "src/widgets/card-tag-meta"

const MapDistrictStatistic: FC = () => {
	const navigate = useNavigate()
	const search = useSearch({
		from: "/_map-layout/",
	})
	const { data: dashboard } = useGetStatisticsDashboardQuery({
		district_id: search?.district,
	})

	const [variant, setVariant] = useState<string | number | undefined>(
		search?.variant
	)

	const onSelectVariant = useCallback(
		(selectedVariant: number) => {
			setVariant(selectedVariant)
			navigate({
				to: ".",
				replace: true,
				search: (prev) => ({
					...prev,
					variant: selectedVariant,
				}),
			})
		},
		[navigate]
	)

	return (
		<>
			<Card style={{ height: "100%" }}>
				<Flex
					vertical={true}
					gap={20}
				>
					<CardTagMeta
						hoverable={true}
						color={"purple"}
						active={search?.variant === 1}
						onClick={() => onSelectVariant(1)}
						icon={<ShopOutlined />}
						title={<Count end={dashboard?.data?.farmer_markets_count || 0} />}
						description={"Dıyqan bazarlar sanı"}
					/>
					<CardTagMeta
						hoverable={true}
						color={"magenta"}
						active={variant === 2}
						onClick={() => onSelectVariant(2)}
						icon={<ProductOutlined />}
						title={<Count end={dashboard?.data?.shopping_malls_count || 0} />}
						description={"Sawda kompleksi sanı"}
					/>
					<CardTagMeta
						hoverable={true}
						color={"cyan"}
						active={variant === 3}
						onClick={() => onSelectVariant(3)}
						icon={<CarOutlined />}
						title={
							<Count
								end={
									(dashboard?.data?.market_car_parks_count || 0) +
									(dashboard?.data?.shopping_car_parks_count || 0)
								}
							/>
						}
						description={"Avto turar orınlar sanı"}
					/>
					<CardTagMeta
						hoverable={true}
						color={"orange"}
						active={variant === 4}
						onClick={() => onSelectVariant(4)}
						icon={<CowOutlined />}
						title={<Count end={dashboard?.data?.cattle_markets_count || 0} />}
						description={"Mal bazarlar sanı"}
					/>
					<CardTagMeta
						hoverable={true}
						color={"lime"}
						active={variant === 5}
						onClick={() => onSelectVariant(5)}
						icon={<ClearOutlined />}
						title={<Count end={dashboard?.data?.restrooms_count || 0} />}
						description={"Hájetxanalar sanı"}
					/>
					<Button
						block={true}
						variant={"filled"}
						color={"red"}
						icon={<FilterOutlined />}
						hidden={!search?.variant}
						onClick={() => {
							setVariant(undefined)
							navigate({
								to: ".",
								search: (prev) => ({
									...prev,
									variant: undefined,
								}),
							})
						}}
					>
						Filtr tazalaw
					</Button>
					<Divider style={{ marginBlock: 4 }} />
					<CardTagMeta
						color={"blue"}
						icon={<TeamOutlined />}
						title={<Count end={dashboard?.data?.employees_count || 0} />}
						description={"Bazar xızmetkerleri sanı"}
					/>
					<Divider style={{ marginBlock: 4 }} />
					<Button
						icon={<ShopOutlined />}
						variant={"solid"}
						color={"purple"}
						onClick={() =>
							navigate({
								to: "/markets-dashboard",
								search: {
									date: dayjs().format("YYYY-DD-MM"),
								},
							})
						}
						size={"large"}
					>
						Bazarlar statistika
					</Button>
					<Button
						icon={<CarOutlined />}
						variant={"solid"}
						color={"cyan"}
						onClick={() =>
							navigate({
								to: "/car-markets-dashboard",
							})
						}
						size={"large"}
					>
						Avto turar orinlar statistika
					</Button>
					<Button
						icon={<ClearOutlined />}
						variant={"solid"}
						color={"lime"}
						onClick={() =>
							navigate({
								to: "/restrooms-dashboard",
								search: {
									date: dayjs().format("YYYY-DD-MM"),
								},
							})
						}
						size={"large"}
					>
						Hajetxanalar statistika
					</Button>
					<Button
						icon={<TeamOutlined />}
						variant={"solid"}
						color={"primary"}
						onClick={() =>
							navigate({
								to: "/users",
							})
						}
						size={"large"}
					>
						Bazar paydalaniwshilar
					</Button>
					{/*<CardTagMeta*/}
					{/*	color={"green"}*/}
					{/*	icon={<DollarCircleOutlined />}*/}
					{/*	title={*/}
					{/*		<CountUp*/}
					{/*			end={0}*/}
					{/*			suffix={" UZS"}*/}
					{/*		/>*/}
					{/*	}*/}
					{/*	description={"Ulıwmalıq aylıq túsim"}*/}
					{/*/>*/}
					{/*<Divider style={{ marginBlock: 4 }} />*/}
					{/*<HomePlacesPieChart />*/}
				</Flex>
			</Card>
		</>
	)
}

export { MapDistrictStatistic }
