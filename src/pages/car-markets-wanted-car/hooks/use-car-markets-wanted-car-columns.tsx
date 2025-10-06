import type { CarWantedAttendance } from "src/services/dashboard/cars"
import { Image, type TableColumnsType } from "src/shared/ui"

export const useCarMarketsWantedCarColumns = () => {
	const columns: TableColumnsType<CarWantedAttendance> = [
		{
			width: 50,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			title: "Kun",
			dataIndex: "date",
			key: "date",
		},
		{
			title: "Waqit",
			dataIndex: "time",
			key: "time",
		},
		{
			align: "center",
			title: "Suwret",
			dataIndex: "url",
			key: "url",
			render: (value: string) => (
				<Image
					src={value}
					height={50}
					width={90}
					placeholder={true}
					alt={""}
				/>
			),
		},
	]

	return columns
}
