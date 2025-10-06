import { useParams, useSearch } from "@tanstack/react-router"
import type { ColumnsType } from "antd/es/table"
import { type FC } from "react"
import {
	type CattleMarketPayment,
	useGetCattleMarketsPaymentsQuery,
} from "src/services/dashboard/cattle-markets"
import { useTablePagination } from "src/shared/hooks"
import { Divider, Flex, Image, QRCode, Space, Spin, Table } from "src/shared/ui"
import { formatPrice } from "src/shared/utils"

const columns: ColumnsType<CattleMarketPayment> = [
	{
		align: "center",
		title: "Check",
		key: "check",
		render: (_v, record) => (
			<>
				<Flex
					vertical={true}
					style={{
						border: "1px solid #eee",
						maxWidth: 275,
						marginInline: "auto",
						padding: 4,
						color: "#000",
						backgroundColor: "#fff",
					}}
				>
					<h2
						style={{
							textAlign: "center",
							fontWeight: "bold",
							marginBottom: 0,
						}}
					>
						Smart Bazar
					</h2>
					<Divider
						variant={"dashed"}
						style={{
							marginBlock: 4,
							borderColor: "#000",
						}}
					/>
					{record?.items?.map((el, index) => (
						<Flex
							key={index}
							gap={8}
							justify={"space-between"}
							align={"center"}
						>
							<span>{`${el?.animal?.name} x ${el?.quantity}:`}</span>
							<strong>{`${formatPrice(el?.amount)} som`}</strong>
						</Flex>
					))}
					<Divider
						variant={"dashed"}
						style={{
							marginBlock: 4,
							borderColor: "#000",
						}}
					/>
					<Flex
						gap={8}
						justify={"space-between"}
						align={"center"}
					>
						<span>Jami:</span>
						<strong>{`${formatPrice(record?.amount)} som`}</strong>
					</Flex>
					<Flex
						gap={8}
						justify={"space-between"}
						align={"center"}
					>
						<span>Tolem turi:</span>
						<strong>{record?.payment_method_name}</strong>
					</Flex>
					<Flex
						gap={8}
						justify={"space-between"}
						align={"center"}
					>
						<span>Tolengen sane:</span>
						<strong>{record?.created_at}</strong>
					</Flex>
					<Flex
						justify={"center"}
						align={"center"}
						style={{
							marginBlock: 4,
						}}
					>
						<QRCode
							color={"#000"}
							bordered={false}
							size={80}
							value={`${window.location.origin}/guest/payments/${record.id}`}
						/>
					</Flex>
					<Divider
						variant={"dashed"}
						style={{
							marginBlock: 4,
							borderColor: "#000",
						}}
					/>
				</Flex>
			</>
		),
	},
	{
		align: "center",
		title: "Súwretler",
		key: "photo",
		render: (_v, record) => (
			<Image.PreviewGroup>
				<Space direction={"vertical"}>
					<Spin spinning={!record?.before_image}>
						<Image
							height={10 * 9}
							width={10 * 16}
							style={{
								objectFit: "cover",
							}}
							placeholder={true}
							src={record?.before_image?.url_path}
							alt={""}
						/>
					</Spin>
					<Spin spinning={!record?.after_image}>
						<Image
							height={10 * 9}
							width={10 * 16}
							style={{
								objectFit: "cover",
							}}
							placeholder={true}
							src={record?.after_image?.url_path}
							alt={""}
						/>
					</Spin>
				</Space>
			</Image.PreviewGroup>
		),
	},
]

const CattleMarketPaymentsTable: FC = () => {
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/cattle-market",
	})
	const { cattle_market, date } = useSearch({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/cattle-market",
	})
	const { current, pageSize, onChange } = useTablePagination({
		current: 1,
		pageSize: 5,
	})

	const { data: animalPayments, isLoading } = useGetCattleMarketsPaymentsQuery({
		market_id: marketId,
		page: current,
		per_page: pageSize,
		cattle_market_id: cattle_market,
		date,
	})

	return (
		<>
			<Table<CattleMarketPayment>
				rowKey={"id"}
				loading={isLoading}
				dataSource={animalPayments?.data}
				columns={columns}
				pagination={{
					total: animalPayments?.meta?.total,
					current,
					pageSize,
					onChange,
				}}
			/>
		</>
	)
}

export { CattleMarketPaymentsTable }
