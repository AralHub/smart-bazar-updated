import {
	type CarWanted,
	useDeleteCarsWantedMutation,
} from "src/services/dashboard/cars"
import { Space, type TableColumnsType } from "src/shared/ui"
import { DeleteButton, EditButton } from "src/widgets/actions"

export const useCarMarketsWantedCarsColumns = () => {
	const { mutate: deleteCarWanted } = useDeleteCarsWantedMutation()

	const columns: TableColumnsType<CarWanted> = [
		{
			width: 50,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			title: "Mashin nomeri",
			dataIndex: "number",
			key: "number",
		},
		{
			fixed: "right",
			width: 100,
			title: "",
			key: "action",
			render: (_v, record) => (
				<Space onClick={(e) => e.stopPropagation()}>
					<EditButton
						params={record}
						formKey={"primary"}
					/>
					<DeleteButton
						hiddenChildren={true}
						confirm={{
							title: record?.number,
							onConfirm: () => deleteCarWanted(record?.id),
						}}
					/>
				</Space>
			),
		},
	]

	return columns
}
