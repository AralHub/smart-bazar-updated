import {
	type Place,
	useDeletePlacesMutation,
} from "src/services/dashboard/places"
import { Space, type TableColumnsType } from "src/shared/ui"
import { formatEmpty } from "src/shared/utils"
import { DeleteButton, EditButton } from "src/widgets/actions"

export const useSellPlacesColumns = () => {
	const { mutate: deletePlace } = useDeletePlacesMutation()

	const columns: TableColumnsType<Place> = [
		{
			title: "Orin nomeri",
			dataIndex: "name",
			key: "name",
			render: formatEmpty,
		},
		{
			title: "Satiwshi",
			dataIndex: ["seller", "name"],
			key: "seller",
			render: formatEmpty,
		},
		{
			title: "Block",
			dataIndex: ["block", "name"],
			key: "block",
			render: formatEmpty,
		},
		{
			title: "Sawda orin turi",
			dataIndex: ["place_type", "name"],
			key: "place_type",
			render: formatEmpty,
		},
		{
			title: "Sawda oner turi",
			dataIndex: ["product_type", "name"],
			key: "product_type",
			render: formatEmpty,
		},
		{
			fixed: "right",
			width: 100,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<EditButton params={record} />
					<DeleteButton
						hiddenChildren={true}
						confirm={{
							onConfirm: () => deletePlace(record.id),
						}}
					/>
				</Space>
			),
		},
	]

	return columns
}
