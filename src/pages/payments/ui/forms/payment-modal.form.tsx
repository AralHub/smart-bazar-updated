import { Tabs } from "src/shared/ui"
import { FormModal } from "src/widgets/form-modal"
import { usePaymentForm } from "../../hooks/use-payment-form"
import { PaymentsForm } from "."

export const PaymentModal = () => {
	const paymentFormState = usePaymentForm()
	const {
		addPaymentLoading,
		paymentForm,
		addPaymentSuccess,
		onChangePaymentCategory,
		payment_category_id,
	} = paymentFormState

	return (
		<FormModal
			title={null}
			form={paymentForm}
			loading={addPaymentLoading}
			success={addPaymentSuccess}
			width={1200}
		>
			<Tabs
				defaultActiveKey={payment_category_id}
				centered
				items={[
					{
						key: "1",
						label: "Tólem",
						children: <PaymentsForm {...paymentFormState} />,
					},
					{
						key: "2",
						label: "Avans tólem",
						children: <PaymentsForm {...paymentFormState} />,
					},
					{
						key: "3",
						label: "Kredit tólem",
						children: <PaymentsForm {...paymentFormState} />,
					},
				]}
				onChange={onChangePaymentCategory}
			/>
		</FormModal>
	)
}
