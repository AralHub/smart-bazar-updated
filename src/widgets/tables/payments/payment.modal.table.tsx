import { useEffect, type FC } from "react"
import { TbCancel, TbCashOff } from "react-icons/tb"
import { useReceipPaymentForm } from "src/pages/payments/hooks/use-receipt-payment-form"
import { PaymentReceiptForm } from "src/pages/payments/ui/forms/payment.receipt.form"
import {
	useDeleteReceiptMutation,
	type Payment,
	type Receipt,
} from "src/services/dashboard/payments"
import { Flex, Modal, Table, type TableColumnsType } from "src/shared/ui"
import { formatDateTime, formatPrice } from "src/shared/utils"
import { DeleteButton } from "src/widgets/actions"
import { CheckPrintButton } from "src/widgets/check"

type PaymentModalTableProps = {
	data?: Payment
	loading: boolean
	isModalOpen: boolean
	toggleModal: (value: boolean) => void
}

export const PaymentModalTable: FC<PaymentModalTableProps> = ({
	isModalOpen,
	toggleModal,
	data,
	loading,
}) => {
	const { mutate, isPending } = useDeleteReceiptMutation()

	const columns: TableColumnsType<Receipt> = [
		{
			align: "center",
			title: "Tolengen pul",
			dataIndex: "total_amount",
			key: "total_amount",
			render: (value) => formatPrice(value / 100),
		},
		{
			align: "center",
			title: "Tolengen sane",
			dataIndex: "time",
			key: "time",
			render: (value) => formatDateTime(value),
		},
		{
			align: "center",
			title: "Kvitancia turi",
			render: () => <>{data?.payment_category.name}</>,
		},
		{
			fixed: "right",
			align: "center",
			width: 50,
			title: "",
			key: "action",
			render: (_, record) => (
				<Flex
					gap={10}
					align="center"
					justify="flex-end"
				>
					{record.is_refund ? (
						<>
							<TbCashOff size={30} />
						</>
					) : (
						<>
							<DeleteButton
								hiddenChildren={false}
								icon={null}
								disabled={isPending}
								children={
									<Flex
										justify="center"
										align="center"
									>
										<TbCancel size={20} />
									</Flex>
								}
								okText="Biykarlaw"
								cancelText="Biykarlamaw"
								confirm={{
									title: "Tolemdi biykarlaw?",
									content: "Tolem biykarlanadi",
									onConfirm: () => mutate(record.payment_id),
								}}
							/>
							<CheckPrintButton data={data!} />
						</>
					)}
				</Flex>
			),
		},
	]

	const formProps = useReceipPaymentForm({
		payment_id: data?.id,
		payment_method: data?.payment_method,
	})

	const { isSuccess } = formProps

	useEffect(() => {
		if (isSuccess) {
			toggleModal(false)
		}
	}, [isSuccess])

	return (
		<Modal
			title="Tólemler tariyxi"
			open={isModalOpen}
			onCancel={() => toggleModal(false)}
			footer={null}
		>
			<Flex
				vertical
				gap={10}
				style={{ marginTop: 20 }}
			>
				{data?.is_completed === false && <PaymentReceiptForm {...formProps} />}
				<Table
					columns={columns}
					dataSource={data?.receipts}
					loading={loading}
					rowKey={"id"}
					pagination={false}
				/>
			</Flex>
		</Modal>
	)
}
