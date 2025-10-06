import { HomeOutlined } from "@ant-design/icons"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import { Link, useParams } from "@tanstack/react-router"
import type { BreadcrumbProps } from "antd/es/breadcrumb/Breadcrumb"
import { useMemo } from "react"
import { useGetDistrictsByIdQuery } from "src/services/dashboard/districts"
import { useGetMarketsByIdQuery } from "src/services/dashboard/markets"

export const useBreadcrumbsPaths = (
	items?: BreadcrumbProps["items"]
): {
	paths: BreadcrumbProps["items"]
} => {
	const { districtId, marketId } = useParams({
		strict: false,
	})

	const {
		data: district,
		isLoading: districtLoading,
		isFetching: districtFetching,
	} = useGetDistrictsByIdQuery(districtId)

	const {
		data: market,
		isLoading: marketLoading,
		isFetching: marketFetching,
	} = useGetMarketsByIdQuery(marketId)

	const pathItems: BreadcrumbProps["items"] = useMemo(
		() =>
			[
				{
					key: "/",
					title: (
						<Link to={"/"}>
							<HomeOutlined /> Bas bet
						</Link>
					),
				},
				districtId
					? {
							key: `/d/${districtId}`,
							title:
								districtLoading || districtFetching ? (
									<LoadingOutlined spin={true} />
								) : (
									district?.data?.name
								),
						}
					: null,
				districtId && marketId
					? {
							key: `/d/${districtId}/m/${marketId}`,
							title:
								marketLoading || marketFetching ? (
									<LoadingOutlined spin={true} />
								) : (
									market?.data?.name
								),
						}
					: null,
				...(items || []),
			].filter((el) => el) as BreadcrumbProps["items"],
		[
			district?.data?.name,
			districtFetching,
			districtId,
			districtLoading,
			items,
			market?.data?.name,
			marketFetching,
			marketId,
			marketLoading,
		]
	)

	return {
		paths: pathItems,
	}
}
