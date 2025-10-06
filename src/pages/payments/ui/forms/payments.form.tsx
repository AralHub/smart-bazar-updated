import { useParams } from "@tanstack/react-router"
import { InputNumber, Tabs, type TableColumnsType } from "antd"
import FormItem from "antd/es/form/FormItem"
import dayjs from "dayjs"
import { type FC, useEffect, useState } from "react"
import {
	type PaymentChange,
	useCreatePaymentsMutation,
} from "src/services/dashboard/payments"
import { useGetServiceTypesQuery } from "src/services/dashboard/payments/service-types"
import { useGetPlacesQuery, type Place } from "src/services/dashboard/places"
import { useGetBlocksQuery } from "src/services/dashboard/places/blocks"
import { useGetProductTypesQuery } from "src/services/dashboard/places/product-types"
import {
	Col,
	DatePicker,
	Flex,
	Form,
	type FormProps,
	Row,
	Segmented,
	Select,
	Spin,
	Table,
	Tag,
	useForm,
	useWatch,
} from "src/shared/ui"
import { formatDate, formatInputPrice } from "src/shared/utils"
import { FormModal } from "src/widgets/form-modal"

const placeTypes = [
	{ id: 1, name: "Dúkán" },
	{ id: 2, name: "Prilavka" },
	{ id: 3, name: "Jayma" },
	{ id: 4, name: "Basqa" },
]

const columns: TableColumnsType<Place> = [
	{
		title: "Orin ati",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Tolem pul",
		dataIndex: ["latest_payment", "amount"],
		key: "amount",
	},
	{
		title: "Tolem turi",
		dataIndex: ["latest_payment", "payment_method_name"],
		key: "payment_method_name",
	},
	{
		title: "Block",
		dataIndex: ["block", "name"],
		key: "block",
	},
	{
		title: "Orın túri",
		dataIndex: ["place_type", "name"],
		key: "place_type",
	},
	{
		title: "Xizmetker",
		dataIndex: ["latest_payment", "employee", "name"],
		key: "employee_name",
	},
	{
		title: "Sane",
		dataIndex: ["latest_payment", "date"],
		key: "date",
	},
	{
		title: "Tolengen sane",
		dataIndex: ["latest_payment", "created_at"],
		key: "created_at",
	},
]

const PaymentsForm: FC = () => {
	const [form] = useForm<PaymentChange>()
	const paymentType = useWatch("payment_type_id", form)
	const blockId = useWatch("block_id", form)
	const placeId = useWatch("place_id", form)
	// const productTypeId = useWatch("product_type_id", form)
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/payments",
	})
	const [search, setSearch] = useState("")

	const {
		data: places,
		isLoading,
		isFetching,
	} = useGetPlacesQuery({
		market_id: marketId,
		place_type_id: paymentType,
		block_id: blockId,
		// product_type_id: productTypeId,
		search,
	})

	const { data: blocks, isLoading: blocksLoading } = useGetBlocksQuery({
		market_id: marketId,
		per_page: 1000,
		type: paymentType === 3 ? 4 : undefined,
	})
	const { data: productTypes, isLoading: productTypesLoading } =
		useGetProductTypesQuery({
			market_id: marketId,
		})
	const { data: serviceTypes, isLoading: serviceTypesLoading } =
		useGetServiceTypesQuery({
			market_id: marketId,
		})

	const {
		mutate: addPayment,
		isPending: addLoading,
		isSuccess: addSuccess,
	} = useCreatePaymentsMutation()

	const onFinish: FormProps<PaymentChange>["onFinish"] = (values) => {
		if (addLoading) return
		if (values.date) {
			values.date = formatDate(values.date)
		}
		addPayment(
			{
				...values,
				market_id: marketId,
			},
			{
				onSuccess: () => {
					form.resetFields()
				},
			}
		)
	}
	const latestPayment = places?.data.find(
		(item) => item.block_id === blockId && item.id === placeId
	)?.latest_payment
	useEffect(() => {
		if (latestPayment) {
			form.setFieldsValue({
				quantity: latestPayment.quantity,
				amount: latestPayment.amount,
				product_type_id: latestPayment.product_type_id,
			})
		} else {
			form.resetFields(["quantity", "amount", "product_type_id"])
		}
	}, [latestPayment, form])

	const Forma = () => {
		return (
			<Form
				name={"payment-form"}
				layout={"vertical"}
				autoComplete={"off"}
				form={form}
				size={"large"}
				onFinish={onFinish}
			>
				<FormItem<PaymentChange>
					name={"payment_type_id"}
					initialValue={placeTypes[0].id}
				>
					<Segmented
						size={"large"}
						block={true}
						options={placeTypes?.map((el) => ({
							value: el.id,
							label: el.name,
						}))}
					/>
				</FormItem>
				{paymentType === 4 ? null : (
					<>
						<Row gutter={16}>
							<Col
								xs={24}
								md={12}
							>
								<FormItem<PaymentChange>
									name={"block_id"}
									label={"Block"}
									rules={[{ required: false }]}
								>
									<Select
										placeholder={"Blocklar"}
										loading={blocksLoading}
										allowClear={true}
										virtual={false}
										optionRender={(oriOption) => (
											<Flex
												align={"center"}
												justify={"space-between"}
												gap={4}
												style={{
													width: "100%",
												}}
											>
												<span>{oriOption.label}</span>
												{oriOption?.data?.count ? (
													<Tag color={"geekblue"}>{oriOption?.data?.count}</Tag>
												) : null}
											</Flex>
										)}
										onPopupScroll={(event) => {
											event.preventDefault()
										}}
										disabled={blocksLoading}
										options={blocks?.data?.map((el) => ({
											value: el.id,
											label: el.name,
											count: el?.places_count,
										}))}
									/>
								</FormItem>
							</Col>
							<Col
								xs={24}
								md={12}
							>
								<FormItem<PaymentChange>
									label={"Onim turi"}
									name={"product_type_id"}
									rules={[{ required: false }]}
								>
									<Select
										loading={productTypesLoading}
										disabled={productTypesLoading}
										allowClear={true}
										virtual={false}
										onPopupScroll={(event) => {
											event.preventDefault()
										}}
										placeholder={"Onim turleri"}
										options={productTypes?.data?.map((el) => ({
											value: el.id,
											label: el.name,
										}))}
									/>
								</FormItem>
							</Col>
						</Row>
					</>
				)}
				<Row gutter={16}>
					<Col
						xs={24}
						md={12}
					>
						{paymentType === 4 ? (
							<>
								<FormItem<PaymentChange>
									name={"service_type_id"}
									label={"Xızmet túrleri"}
									rules={[{ required: true }]}
								>
									<Select
										showSearch={true}
										popupRender={(node) => <Spin spinning={false}>{node}</Spin>}
										optionFilterProp={"label"}
										virtual={false}
										onPopupScroll={(event) => {
											event.preventDefault()
										}}
										placeholder={"Xizmet túrin saylań"}
										loading={serviceTypesLoading}
										disabled={serviceTypesLoading}
										options={serviceTypes?.data?.map((el) => ({
											value: el.id,
											label: el.name,
										}))}
									/>
								</FormItem>
							</>
						) : paymentType === 3 ? (
							<>
								<FormItem<PaymentChange>
									name={"quantity"}
									label={"Orin sani"}
									rules={[{ required: true }]}
								>
									<InputNumber
										style={{ width: "100%" }}
										placeholder={"Jayma orin sani"}
									/>
								</FormItem>
							</>
						) : (
							<>
								<FormItem<PaymentChange>
									name={"place_id"}
									label={"Orin nomeri"}
									rules={[{ required: true }]}
								>
									<Select
										loading={isLoading || isFetching}
										disabled={isLoading}
										showSearch={true}
										virtual={false}
										onPopupScroll={(event) => {
											event.preventDefault()
										}}
										searchValue={search}
										popupRender={(node) => (
											<Spin spinning={isFetching}>{node}</Spin>
										)}
										onSearch={setSearch}
										filterOption={false}
										placeholder={
											paymentType === 2 ? "Rasta nomeri" : "Dukan nomeri"
										}
										options={places?.data?.map((el) => ({
											value: el.id,
											label: `${el.name}${el?.block ? ". (" + el?.block?.name?.toString() + ")" : ""}`,
										}))}
									/>
								</FormItem>
							</>
						)}
					</Col>
					<Col
						xs={24}
						md={12}
					>
						<FormItem<PaymentChange>
							name={"date"}
							label={"Sane"}
							rules={[{ required: true }]}
							initialValue={dayjs()}
						>
							<DatePicker styles={{ root: { width: "100%" } }} />
						</FormItem>
					</Col>
					<Col
						xs={24}
						md={12}
					>
						<FormItem<PaymentChange>
							name={"amount"}
							label={"Summa"}
							rules={[{ required: true }]}
						>
							<InputNumber
								style={{ width: "100%" }}
								formatter={formatInputPrice}
								placeholder={"10,000"}
							/>
						</FormItem>
					</Col>
				</Row>
				{latestPayment && (
					<Table
						columns={columns}
						dataSource={places.data}
						rowKey={(res) => res.id}
						pagination={false}
						style={{ marginBottom: "20px" }}
					/>
				)}
			</Form>
		)
	}

	return (
		<>
			<FormModal
				title={null}
				form={form}
				loading={addLoading}
				success={addSuccess}
				width={1200}
			>
				<Tabs
					defaultActiveKey="1"
					centered
					items={[
						{ key: "1", label: "Tólem", children: <Forma /> },
						{ key: "2", label: "Kredit tólem", children: <Forma /> },
						{ key: "3", label: "Avans tólem", children: <Forma /> },
					]}
				/>
			</FormModal>
		</>
	)
}

export { PaymentsForm }
