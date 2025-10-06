import { useParams } from "@tanstack/react-router"
import dayjs from "dayjs"
import { type FC, useEffect } from "react"
import {
	type PaymentChange,
	useCreatePaymentsMutation,
} from "src/services/dashboard/payments"
import { type Place } from "src/services/dashboard/places"
import type { Block } from "src/services/dashboard/places/blocks"
import { useGetProductTypesQuery } from "src/services/dashboard/places/product-types"
import {
	Button,
	DatePicker,
	Descriptions,
	Form,
	FormItem,
	type FormProps,
	InputNumber,
	Select,
	useForm,
} from "src/shared/ui"
import { formatDate, formatInputPrice } from "src/shared/utils"

interface PlaceInfoFormProps {
	data?: {
		place?: Place
		block?: Block
		isBlock?: boolean
	}
	onChangeTab?: (tab: string) => void
}

const PlaceInfoForm: FC<PlaceInfoFormProps> = ({ data, onChangeTab }) => {
	const { marketId } = useParams({
		strict: false,
	})
	const [form] = useForm<PaymentChange>()

	const { data: productTypes, isLoading: productTypesLoading } =
		useGetProductTypesQuery()

	const { mutate: addPayment, isPending: addLoading } =
		useCreatePaymentsMutation()

	const onFinish: FormProps<PaymentChange>["onFinish"] = (values) => {
		if (addLoading) return
		if (data?.isBlock && data?.block?.id) {
			values["block_id"] = data?.block?.id
			values["payment_type_id"] = 3
		} else if (data?.place?.id) {
			values["place_id"] = data?.place?.id
			values["payment_type_id"] = data?.place?.place_type_id
		}
		if (values?.date) {
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
					onChangeTab?.("table")
				},
			}
		)
	}

	useEffect(() => {
		form.resetFields()
		if (data?.isBlock && data?.block) {
			form.setFieldsValue({
				...data?.block,
			})
			return
		}
		form.setFieldsValue({
			...data?.place,
		})

		return () => {
			form.resetFields()
		}
	}, [data, form])
	return (
		<>
			<Descriptions
				column={1}
				style={{
					marginBottom: 16,
				}}
				items={[
					{
						key: "id",
						label: "ID",
						children: data?.isBlock ? data?.block?.id : data?.place?.id,
					},
				]}
			/>
			<Form
				form={form}
				layout={"vertical"}
				size={"large"}
				onFinish={onFinish}
			>
				<FormItem
					label={data?.isBlock ? "Jayma ati" : "Orin nomeri"}
					name={"name"}
				>
					<Select
						placeholder={"Orin"}
						disabled={true}
					/>
				</FormItem>
				<FormItem
					label={"Sane"}
					name={"date"}
					initialValue={dayjs()}
				>
					<DatePicker style={{ width: "100%" }} />
				</FormItem>
				<FormItem
					label={"Onim oner turi"}
					name={"product_type_id"}
				>
					<Select
						placeholder={"Onim oner"}
						allowClear={true}
						loading={productTypesLoading}
						disabled={productTypesLoading}
						options={productTypes?.data?.map((el) => ({
							value: el.id,
							label: el.name,
						}))}
					/>
				</FormItem>
				{data?.isBlock ? (
					<FormItem<PaymentChange>
						name={"quantity"}
						label={"Orin sani"}
						initialValue={1}
					>
						<InputNumber
							style={{ width: "100%" }}
							onFocus={(event) => event.target.focus()}
							placeholder={"1"}
						/>
					</FormItem>
				) : null}
				<FormItem
					label={"Orin pul"}
					name={"amount"}
					rules={[{ required: true }]}
				>
					<InputNumber
						formatter={formatInputPrice}
						style={{ width: "100%" }}
						placeholder={"10,000"}
					/>
				</FormItem>
				<Button
					block={true}
					loading={addLoading}
					disabled={addLoading}
					htmlType={"submit"}
					type={"primary"}
				>
					Tólem islew
				</Button>
			</Form>
		</>
	)
}

export { PlaceInfoForm }
