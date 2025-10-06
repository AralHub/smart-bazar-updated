import { useParams } from "@tanstack/react-router"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { useGetMarketsByIdQuery } from "src/services/dashboard/markets"
import { marketsImagesData } from "src/shared/data"
import { useToken } from "src/shared/hooks"
import {
	Card,
	Col,
	Flex,
	Image,
	List,
	ListItem,
	Row,
	Text,
	Title,
} from "src/shared/ui"
import { formatPhone } from "src/shared/utils"

const AboutMarketDescription: FC = () => {
	const { token } = useToken()
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/",
	})
	const { xs = false } = useResponsive()

	const { data: market, isLoading } = useGetMarketsByIdQuery(marketId)

	const image = marketsImagesData.find((el) => el.market_id === marketId)

	return (
		<>
			<Card loading={isLoading}>
				<Row
					gutter={24}
					style={{
						rowGap: 24,
					}}
				>
					<Col
						xs={24}
						md={10}
					>
						<div
							style={{
								borderRadius: token.borderRadius,
								overflow: "hidden",
								height: "100%",
							}}
						>
							<Image
								src={image?.image || "/assets/bazar.jpg"}
								alt={""}
								height={"100%"}
								style={{
									objectFit: "cover",
								}}
								fallback={image?.alt_image || "/public/assets/bazar.jpg"}
							/>
						</div>
					</Col>
					<Col
						xs={24}
						md={14}
					>
						<Flex
							vertical={true}
							gap={16}
						>
							<Title level={3}>{market?.data?.name}</Title>
							<List
								rowKey={"key"}
								dataSource={[
									{
										key: "header_name",
										label: "Bazar direktori",
										value: market?.data?.header_name,
									},
									{
										key: "full_name",
										label: "Ataması",
										value: market?.data?.full_name,
									},
									{
										key: "address",
										label: "Manzili",
										value: market?.data?.address,
									},
									{
										key: "bank_details",
										label: "Bank rekvizitleri",
										value: market?.data?.bank_details,
									},
									{
										key: "phone",
										label: "Telefon nomer",
										value: formatPhone(market?.data?.phone),
									},
									{
										key: "area",
										label: "Maydani",
										value: market?.data?.area,
									},
									{
										key: "specialty",
										label: "Qánigeligi",
										value: market?.data?.specialty,
									},
									{
										key: "tin",
										label: "TIN",
										value: market?.data?.tin,
									},
								]}
								renderItem={(item, index) => (
									<ListItem key={index}>
										<Flex
											justify={"space-between"}
											gap={8}
											align={"center"}
											style={{
												width: "100%",
											}}
											wrap={xs}
										>
											<Text
												type={"secondary"}
												style={{ whiteSpace: "nowrap" }}
											>{`${item.label}:`}</Text>
											<Text
												strong={true}
												style={{
													textAlign: "end",
												}}
											>
												{item.value}
											</Text>
										</Flex>
									</ListItem>
								)}
							/>
						</Flex>
					</Col>
				</Row>
			</Card>
		</>
	)
}

export { AboutMarketDescription }
