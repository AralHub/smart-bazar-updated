import {
	useDeletePaymentsMutation,
	type Payment,
} from "src/services/dashboard/payments"
import { Flex, type TableColumnsType } from "src/shared/ui"
import { formatPrice } from "src/shared/utils"
import { DeleteButton } from "src/widgets/actions"
import { CheckPrintButton } from "src/widgets/check"

export const usePaymentsColumns = (
	paymentType: string,
	isEmployee?: boolean
) => {
	const { mutate, isPending } = useDeletePaymentsMutation()

	const columns: TableColumnsType<Payment> = [
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
			title: "Sane",
			dataIndex: "date",
			key: "date",
			// render: formatDate,
		},
		{
			title: "Tolengen sane",
			dataIndex: "created_at",
			key: "created_at",
			// render: formatDate,
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
					{record.is_refund ? (
						<Flex
							justify="center"
							align="center"
						>
							Biykarlandi
						</Flex>
					) : (
						<DeleteButton
							hiddenChildren={false}
							icon={null}
							disabled={isPending}
							children="Óshiriw"
							confirm={{
								title: "Tolemdi biykarlaw?",
								content: "Tolem biykarlanadi",
								onConfirm: () => mutate(record.id),
							}}
						/>
					)}
					<CheckPrintButton data={record} />
				</Flex>
			),
		},
	]

	return columns
}
