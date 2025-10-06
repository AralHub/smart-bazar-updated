import { EnvironmentOutlined } from "@ant-design/icons"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { useResponsive } from "antd-style"
import { type FC, useMemo } from "react"
import { useGetDistrictsQuery } from "src/services/dashboard/districts"
import { useGetMarketsQuery } from "src/services/dashboard/markets"
import { useAuth } from "src/shared/hooks"
import { Button, Select, Title } from "src/shared/ui"

const SelectRegionMarket: FC = () => {
	const { districtId, marketId } = useParams({
		strict: false,
	})
	const { role } = useAuth()
	const { xs } = useResponsive()

	const navigate = useNavigate()

	const {
		data: markets,
		isLoading,
		isFetching,
	} = useGetMarketsQuery({
		district_id: districtId,
	})

	const { data: districts, isLoading: districtLoading } = useGetDistrictsQuery()

	const selectedDistricts = useMemo(() => {
		return districts?.data?.find((el) => `${el?.id}` === districtId)
	}, [districts?.data, districtId])
	return (
		<>
			<Title
				level={4}
				style={{
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
					overflow: "hidden",
				}}
			>
				{districtLoading ? (
					<LoadingOutlined spin={true} />
				) : (
					selectedDistricts?.name
				)}
			</Title>
			{role === 2 ? null : (
				<Link to={"/"}>
					<Button
						type={"primary"}
						icon={<EnvironmentOutlined />}
					/>
				</Link>
			)}
			<Select
				variant={"filled"}
				size={"large"}
				value={marketId}
				loading={isLoading || isFetching}
				disabled={isLoading || isFetching}
				onChange={(value) => {
					navigate({
						to: ".",
						params: {
							marketId: value,
						},
						search: (prev) => prev,
					})
				}}
				popupMatchSelectWidth={false}
				labelRender={({ label }) =>
					xs && typeof label === "string"
						? label
								?.split(" ")
								.map((el) => el[0])
								.join(".")
								?.toUpperCase()
						: label
				}
				placeholder={"Diyqan bazar"}
				options={markets?.data
					?.filter((el) => (role === 2 ? `${el.id}` === marketId : el))
					?.map((el) => ({
						value: `${el?.id}`,
						label: el?.name,
					}))}
			/>
		</>
	)
}

export { SelectRegionMarket }
