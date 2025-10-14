import {
	useCreatePaymentReceiptMutation,
	type PaymentReceiptChange,
} from "src/services/dashboard/payments"
import { useForm, type FormProps } from "src/shared/ui"

export type ReceiptPaymentFormProps = ReturnType<typeof useReceipPaymentForm>

export const useReceipPaymentForm = ({
	payment_id,
	payment_method,
}: {
	payment_id?: number
	payment_method?: number
}) => {
	const [form] = useForm<PaymentReceiptChange>()
	const {
		mutate: createPaymentReceipt,
		isPending,
		isSuccess,
	} = useCreatePaymentReceiptMutation()

	const onFinish: FormProps<PaymentReceiptChange>["onFinish"] = (values) => {
		if (!payment_id || !payment_method) return
		createPaymentReceipt(
			{
				amount: Number(
					values.amount
						.toString()
						.split("")
						.filter((item) => item !== ",")
						.join("")
				),
				payment_id: payment_id,
				payment_method: payment_method,
			},
			{
				onSuccess: () => {
					form.resetFields()
				},
			}
		)
	}
	return { onFinish, isPending, isSuccess, form }
}
