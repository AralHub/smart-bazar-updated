import type { CarParkAttendance } from "src/services/dashboard/car-parks"
import { Image, type TableColumnsType } from "src/shared/ui"

export const useParkingHistoryColumns = () => {
	const columns: TableColumnsType<CarParkAttendance> = [
		{
			title: "Kún",
			dataIndex: "date",
			key: "date"
		},
		{
			title: "Mashina nomeri",
			dataIndex: "number",
			key: "number"
		},
		{
			title: "Waqıt",
			dataIndex: "time",
			key: "time"
		},
		{
			align: "center",
			title: "Súwret",
			dataIndex: "url_path",
			key: "url_path",
			render: (value: string) => (
				<Image
					height={50}
					width={90}
					placeholder={true}
					style={{ objectFit: "cover" }}
					src={value}
				/>
			)
		}
	]

	return columns
}
