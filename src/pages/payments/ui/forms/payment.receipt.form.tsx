import type { FC } from "react"
import { type PaymentReceiptChange } from "src/services/dashboard/payments"
import { Button, Flex, Form, FormItem, InputNumber } from "src/shared/ui"
import { formatInputPrice } from "src/shared/utils"
import type { ReceiptPaymentFormProps } from "../../hooks/use-receipt-payment-form"

export const PaymentReceiptForm: FC<ReceiptPaymentFormProps> = ({
	isPending,
	onFinish,
	form,
}) => {
	return (
		<Form
			name={"payment-receipt-form"}
			layout={"vertical"}
			autoComplete={"off"}
			form={form}
			size={"large"}
			onFinish={onFinish}
		>
			<FormItem<PaymentReceiptChange>
				name={"amount"}
				label={"Summa"}
				rules={[{ required: true }]}
			>
				<Flex
					align="center"
					justify="space-between"
				>
					<InputNumber
						style={{ width: "60%" }}
						formatter={formatInputPrice}
						placeholder={"10,000"}
					/>
					<Button
						type="primary"
						disabled={isPending}
						htmlType="submit"
					>
						Tolem kiritiw
					</Button>
				</Flex>
			</FormItem>
		</Form>
	)
}
