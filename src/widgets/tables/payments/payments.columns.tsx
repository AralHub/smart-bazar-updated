import { useState } from "react"
import { LiaCashRegisterSolid } from "react-icons/lia"
import { TbCancel, TbCashOff } from "react-icons/tb"
import {
	useDeletePaymentsMutation,
	type Payment,
} from "src/services/dashboard/payments"
import { Badge, Button, Flex, type TableColumnsType } from "src/shared/ui"
import { formatPrice } from "src/shared/utils"
import { DeleteButton } from "src/widgets/actions"
import { CheckPrintButton } from "src/widgets/check"

export const usePaymentsColumns = (
	paymentType: string,
	isEmployee?: boolean
) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedPayment, setSelectedPayment] = useState<Payment | undefined>(
		undefined
	)
	const { mutate, isPending } = useDeletePaymentsMutation()
	const toggleModal = (value: boolean, payment?: Payment) => {
		setIsModalOpen(value)
		if (payment) setSelectedPayment(payment)
	}
	const columns: TableColumnsType<Payment> = [
		{
			align: "center",
			dataIndex: "is_completed",
			render: (item) => (
				<>
					{item ? (
						<Badge
							status="success"
							style={{
								transform: "scale(2)",
								transformOrigin: "center",
							}}
						/>
					) : (
						<Badge
							status="error"
							style={{
								transform: "scale(2)",
								transformOrigin: "center",
							}}
						/>
					)}
				</>
			),
		},
		{
			align: "center",
			title: "Orin ati",
			dataIndex: ["place", "name"],
			key: "place",
			hidden: ["3", "4"].includes(paymentType),
			render: (value) => value || "B/N",
		},
		{
			align: "center",
			title: "Orin sani",
			dataIndex: "quantity",
			key: "quantity",
			hidden: ["1", "2", "4"].includes(paymentType),
		},
		{
			title: "Xızmet túri",
			dataIndex: ["service_type", "name"],
			key: "service_type",
			hidden: ["1", "2", "3"].includes(paymentType),
		},
		{
			title: "Tolem pul",
			dataIndex: "amount",
			key: "amount",
			render: formatPrice,
		},
		{
			title: "Tolem turi",
			dataIndex: "payment_method_name",
			key: "payment_method_name",
		},
		{
			title: "Block",
			dataIndex: ["block", "name"],
			key: "block",
			hidden: ["4"].includes(paymentType),
		},
		{
			title: "Orın túri",
			dataIndex: ["place", "place_type", "name"],
			key: "place_type",
			hidden: ["3", "4"].includes(paymentType),
		},
		{
			title: "Xizmetker",
			dataIndex: ["employee", "name"],
			key: "employee",
			hidden: isEmployee,
		},
		{
			title: "Tolengen sane",
			dataIndex: "created_at",
			key: "created_at",
		},
		{
			title: "Kvitancia turi",
			dataIndex: ["payment_category", "name"],
			key: "payment_category",
		},
		{
			fixed: "right",
			align: "center",
			width: 50,
			title: "",
			key: "action",
			render: (_v, record) => (
				<Flex
					gap={10}
					align="center"
					justify="flex-end"
				>
					{record.payment_method === 3 ||
					record.payment_method === 4 ||
					record.payment_category_id === 1 ? (
						record.is_refund ? (
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
										onConfirm: () => mutate(record.id),
									}}
								/>
								<CheckPrintButton data={record} />
							</>
						)
					) : record.payment_category_id === 2 ||
					  record.payment_category_id === 3 ? (
						<Button onClick={() => toggleModal(true, record)}>
							<LiaCashRegisterSolid size={20} />
						</Button>
					) : (
						<>
							<CheckPrintButton data={record} />
						</>
					)}
				</Flex>
			),
		},
	]

	return { columns, toggleModal, isModalOpen, selectedPayment }
}
