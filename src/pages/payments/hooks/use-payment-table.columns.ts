import type { Place } from "src/services/dashboard/places"
import type { TableColumnsType } from "src/shared/ui"

export const usePaymentTableColumns = () => {
	const columns: TableColumnsType<Place> = [
		{
			title: "Orin ati",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Tolem pul",
			dataIndex: ["latest_payment", "amount"],
			key: "amount",
		},
		{
			title: "Tolem turi",
			dataIndex: ["latest_payment", "payment_method_name"],
			key: "payment_method_name",
		},
		{
			title: "Block",
			dataIndex: ["block", "name"],
			key: "block",
		},
		{
			title: "Orın túri",
			dataIndex: ["place_type", "name"],
			key: "place_type",
		},
		{
			title: "Xizmetker",
			dataIndex: ["latest_payment", "employee", "name"],
			key: "employee_name",
		},
		{
			title: "Sane",
			dataIndex: ["latest_payment", "date"],
			key: "date",
		},
		{
			title: "Tolengen sane",
			dataIndex: ["latest_payment", "created_at"],
			key: "created_at",
		},
	]

	return { columns }
}
