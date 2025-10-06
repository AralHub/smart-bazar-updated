import { useSearch } from "@tanstack/react-router"
import { type FC } from "react"
import { useGetRestroomsQuery } from "src/services/dashboard/restrooms"
import {
	type ReportRestroomChange,
	useCreateReportRestroomsMutation,
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

const RestroomsPaymentsForm: FC = () => {
	const { date } = useSearch({
		strict: false,
	})
	const [form] = useForm<ReportRestroomChange>()

	const { data: restrooms, isLoading: restroomsLoading } = useGetRestroomsQuery(
		{
			per_page: 1000,
			page: 1,
		}
	)

	const {
		mutate: addReportPayment,
		isPending: addLoading,
		isSuccess: addSuccess,
	} = useCreateReportRestroomsMutation()

	const onFinish: FormProps<ReportRestroomChange>["onFinish"] = (values) => {
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
					name={"restrooms-payments-form"}
					form={form}
					layout={"vertical"}
					onFinish={onFinish}
					size={"large"}
				>
					<FormItem<ReportRestroomChange>
						label={"Hájetxana"}
						name={"restroom_id"}
						rules={[{ required: true }]}
					>
						<Select
							placeholder={"Hájetxanani saylan"}
							loading={restroomsLoading}
							disabled={restroomsLoading}
							options={restrooms?.data?.map((el) => ({
								value: el.id,
								label: el.name,
							}))}
						/>
					</FormItem>
					<FormItem<ReportRestroomChange>
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

export { RestroomsPaymentsForm }
