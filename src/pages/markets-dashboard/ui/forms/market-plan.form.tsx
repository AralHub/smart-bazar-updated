import type { FormProps } from "antd"
import { type FC, useEffect } from "react"
import {
	type StatisticGeneralMonthlyIncome,
	type StatisticReportChange,
	useCreateReportGeneralsMonthlyIncomeMutation,
} from "src/services/statistics"
import { useFormDevtoolsStore } from "src/shared/store"
import { Form, FormItem, InputNumber, useForm } from "src/shared/ui"
import { formatInputPrice } from "src/shared/utils"
import { FormModal } from "src/widgets/form-modal"

const MarketPlanForm: FC = () => {
	const [form] = useForm<StatisticReportChange>()

	const params = useFormDevtoolsStore((state) =>
		state.getParams<StatisticGeneralMonthlyIncome>()
	)
	const {
		mutate: addReport,
		isPending: addLoading,
		isSuccess: addSuccess,
	} = useCreateReportGeneralsMonthlyIncomeMutation()

	const onFinish: FormProps<StatisticReportChange>["onFinish"] = (values) => {
		if (params) {
			addReport({
				...values,
				market_id: params?.id,
				date: `${params.year}-${String(params?.months?.at(0)?.name).padStart(2, "00")}`,
			})
		}
	}

	useEffect(() => {
		if (params) {
			form.setFieldsValue({
				amount: params?.months?.at(0)?.report_amount,
			})
		}
	}, [form, params])
	return (
		<FormModal
			form={form}
			width={300}
			title={
				params?.months?.[0]?.report_amount ? "Rejeni ozgertiw" : "Reje qosiw"
			}
			loading={addLoading}
			success={addSuccess}
		>
			<Form
				name={"market-plan"}
				layout={"vertical"}
				size={"large"}
				autoComplete={"off"}
				form={form}
				onFinish={onFinish}
			>
				<FormItem<StatisticReportChange>
					label={"Reje"}
					name={"amount"}
					rules={[{ required: true }]}
				>
					<InputNumber
						min={0}
						formatter={formatInputPrice}
						style={{
							width: "100%",
						}}
					/>
				</FormItem>
			</Form>
		</FormModal>
	)
}

export { MarketPlanForm }
