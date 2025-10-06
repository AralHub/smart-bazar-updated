import type { CarParkVehicle } from "src/services/dashboard/car-parks"
import { useToken } from "src/shared/hooks"
import { Badge, Image, type TableColumnsType } from "src/shared/ui"

export const useParkingVehiclesColumns = () => {
	const { token } = useToken()

	const columns: TableColumnsType<CarParkVehicle> = [
		{
			align: "center",
			title: "Súwret",
			dataIndex: ["oldest_attendance", "url_path"],
			key: "url_path",
			render: (value: string) => (
				<Image
					height={50}
					width={90}
					placeholder={true}
					style={{ objectFit: "cover" }}
					src={value}
				/>
			),
		},
		{
			title: "Mashina nomeri",
			dataIndex: "number",
			key: "number",
		},
		{
			title: "Status",
			dataIndex: "in_route_line",
			key: "in_route_line",
			render: (value: boolean) => (
				<Badge
					status={value ? "processing" : "error"}
					styles={{
						indicator: {
							width: 12,
							height: 12,
							backgroundColor: value ? token.green : undefined,
							color: value ? token.green : undefined,
						},
					}}
					text={"Liniyada"}
				/>
			),
		},
		{
			title: "Kún",
			dataIndex: ["oldest_attendance", "date"],
			key: "date_time",
		},
		{
			title: "Waqıt",
			dataIndex: ["oldest_attendance", "time"],
			key: "time",
		},
		{
			title: "Sani",
			dataIndex: "attendances_count",
			key: "attendances_count",
			render: (value) => <strong>{value}</strong>,
		},
	]

	return columns
}
