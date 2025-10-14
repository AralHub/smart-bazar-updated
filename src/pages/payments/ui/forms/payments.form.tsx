import { InputNumber } from "antd"
import FormItem from "antd/es/form/FormItem"
import dayjs from "dayjs"
import { type FC } from "react"
import { type PaymentChange } from "src/services/dashboard/payments"
import {
	Col,
	DatePicker,
	Flex,
	Form,
	Row,
	Segmented,
	Select,
	Spin,
	Tag,
} from "src/shared/ui"
import { formatInputPrice } from "src/shared/utils"
import { PaymentTable } from "./payment-table.form"
import type { ReturnTypeOfUsePaymentForm } from "../../hooks/use-payment-form"

const placeTypes = [
	{ id: 1, name: "Dúkán" },
	{ id: 2, name: "Prilavka" },
	{ id: 3, name: "Jayma" },
	{ id: 4, name: "Basqa" },
]

const PaymentsForm: FC<ReturnTypeOfUsePaymentForm> = ({
	blocks,
	blocksLoading,
	isFetching,
	isLoading,
	latestPayment,
	onFinish,
	paymentForm,
	paymentType,
	places,
	productTypes,
	productTypesLoading,
	search,
	serviceTypes,
	serviceTypesLoading,
	setSearch,
	payment_category_id,
}) => {
	return (
		<>
			<Form
				name={"payment-form"}
				layout={"vertical"}
				autoComplete={"off"}
				form={paymentForm}
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
					{Number(payment_category_id) === 2 && (
						<Col
							xs={24}
							md={12}
						>
							<FormItem<PaymentChange>
								name={"pay_amount"}
								label={"Bastagi tólem"}
								rules={[{ required: true }]}
							>
								<InputNumber
									style={{ width: "100%" }}
									formatter={formatInputPrice}
									placeholder={"10,000"}
								/>
							</FormItem>
						</Col>
					)}
				</Row>
			</Form>
			{latestPayment && (
				<PaymentTable
					data={places?.data}
					isLoading={isLoading}
				/>
			)}
		</>
	)
}

export { PaymentsForm }
