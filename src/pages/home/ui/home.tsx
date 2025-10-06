import {
	AppstoreOutlined,
	CloseOutlined,
	EnvironmentFilled,
	GlobalOutlined,
} from "@ant-design/icons"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { type FC, memo, useCallback, useMemo } from "react"
import {
	type District,
	useGetDistrictsQuery,
} from "src/services/dashboard/districts"
import { useToken } from "src/shared/hooks"
import { Button, Card, Col, Row, Segmented, Space } from "src/shared/ui"
import { Map } from "src/widgets/map"
import { MapSelects } from "./features"
import { MapDistrictList } from "./lists"
import { MapDistrictStatistic } from "./statistics"

const MemorizeMap = memo(Map)
const MemorizeMapDistrictList = memo(MapDistrictList)
const MemorizeMapDistrictStatistic = memo(MapDistrictStatistic)

const Home: FC = () => {
	const { token } = useToken()
	const navigate = useNavigate()
	const search = useSearch({
		from: "/_map-layout/",
		select: (state) => ({
			...state,
			districts: state?.districts?.split("-").map(Number),
		}),
	})
	const { data: districts } = useGetDistrictsQuery()

	const tab = useMemo(() => search?.tab || "map", [search?.tab])

	const value = useMemo(() => {
		if (!search.districts && !search.district) return []
		if (!districts?.data) return []

		return districts?.data?.filter((el) => {
			if (search.districts && !search.district) {
				return search?.districts?.includes(el?.id)
			}
			return el?.id === search?.district
		})
	}, [districts?.data, search.district, search.districts])

	const size = useMemo(() => {
		return value?.length || search?.variant ? "middle" : undefined
	}, [search?.variant, value?.length])

	const onSelect = useCallback(
		(map: District) => {
			navigate({
				to: ".",
				replace: true,
				search: (prev) => ({
					...prev,
					districts: undefined,
					district: map.id,
				}),
			})
		},
		[navigate]
	)

	const selectedValue = useMemo(() => value.map((el) => el.id), [value])

	return (
		<>
			<Row
				gutter={24}
				style={{ rowGap: 24 }}
			>
				<Col
					xs={24}
					md={18}
				>
					<Card
						style={{ overflow: "hidden" }}
						styles={{
							body: {
								padding: 0,
							},
						}}
						title={
							<>
								<EnvironmentFilled style={{ color: token.colorPrimary }} />{" "}
								{Array.isArray(value) && value.length > 1
									? `Saylangan qalalar / rayonlar: ${value.length}`
									: value?.[0]?.name || "Qaraqalpaqstan Respublikası"}
							</>
						}
						extra={
							<Space>
								<Segmented
									value={tab}
									onChange={(value) =>
										navigate({
											to: ".",
											replace: true,
											search: (prev) => ({
												...prev,
												tab: value,
											}),
										})
									}
									options={[
										{
											value: "map",
											icon: <GlobalOutlined />,
										},
										{
											value: "list",
											icon: <AppstoreOutlined />,
										},
									]}
								/>
								<Button
									hidden={!search.district}
									icon={<CloseOutlined />}
									variant={"filled"}
									color={"red"}
									onClick={() => {
										navigate({
											to: ".",
											replace: true,
											search: (prev) => ({
												...prev,
												district: undefined,
											}),
										})
									}}
								/>
							</Space>
						}
					>
						{tab === "list" ? (
							<>
								<MemorizeMapDistrictList
								// onSelect={(map) => setValue(map)}
								// value={value}
								/>
							</>
						) : (
							<>
								<MemorizeMap
									size={size}
									onSelect={onSelect}
									value={selectedValue}
								/>
							</>
						)}
					</Card>
					<MapSelects />
				</Col>
				<Col
					xs={24}
					md={6}
				>
					<MemorizeMapDistrictStatistic />
				</Col>
			</Row>
		</>
	)
}

export { Home }
