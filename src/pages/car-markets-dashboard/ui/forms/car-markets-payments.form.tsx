import { useSearch } from "@tanstack/react-router"
import { type FC } from "react"
import { useGetCarParksQuery } from "src/services/dashboard/car-parks"
import {
	type ReportCarParkChange,
	useCreateReportCarParksMutation,
} from "src/services/statistics"
import {
	Form,
	FormItem,
	type FormProps,
	InputNumber,
	Select,
	useForm,
} from "src/shared/ui"
import { formatInputPrice } from "src/shared/utils"
import { FormModal } from "src/widgets/form-modal"

const CarMarketsPaymentsForm: FC = () => {
	const { date } = useSearch({
		strict: false,
	})
	const [form] = useForm<ReportCarParkChange>()

	const { data: carParks, isLoading: carParksLoading } = useGetCarParksQuery({
		per_page: 1000,
		page: 1,
	})

	const {
		mutate: addReportPayment,
		isPending: addLoading,
		isSuccess: addSuccess,
	} = useCreateReportCarParksMutation()

	const onFinish: FormProps<ReportCarParkChange>["onFinish"] = (values) => {
		addReportPayment({
			...values,
			date,
		})
	}

	return (
		<>
			<FormModal
				form={form}
				loading={addLoading}
				success={addSuccess}
			>
				<Form
					name={"payments-form"}
					form={form}
					layout={"vertical"}
					onFinish={onFinish}
					size={"large"}
				>
					<FormItem<ReportCarParkChange>
						label={"Auto turar orin"}
						name={"car_park_id"}
						rules={[{ required: true }]}
					>
						<Select
							placeholder={"Auto turar orin saylan"}
							loading={carParksLoading}
							disabled={carParksLoading}
							options={carParks?.data?.map((el) => ({
								value: el.id,
								label: el.name,
							}))}
						/>
					</FormItem>
					<FormItem<ReportCarParkChange>
						label={"Summa"}
						name={"amount"}
						rules={[{ required: true }]}
					>
						<InputNumber
							formatter={formatInputPrice}
							placeholder={"1,000,000"}
							style={{
								width: "100%",
							}}
						/>
					</FormItem>
				</Form>
			</FormModal>
		</>
	)
}

export { CarMarketsPaymentsForm }
