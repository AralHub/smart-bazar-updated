import { ManOutlined, WomanOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import type { RestroomAttendance } from "src/services/dashboard/restrooms"
import { useToken } from "src/shared/hooks"
import { Image, Space, type TableColumnsType } from "src/shared/ui"

export const useRestroomsAttendancesColumns = () => {
	const { token } = useToken()

	const columns: TableColumnsType<RestroomAttendance> = [
		{
			width: 50,
			title: "№",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
		{
			title: "Jinsi",
			dataIndex: "gender",
			key: "gender",
			render: (value: RestroomAttendance["gender"]) =>
				value === "MALE" ? (
					<Space>
						<ManOutlined style={{ fontSize: 20, color: token.blue }} />
						Erkek
					</Space>
				) : (
					<Space>
						<WomanOutlined style={{ fontSize: 20, color: token.pink }} />
						Hayal
					</Space>
				),
		},
		{
			title: "Sane",
			dataIndex: "date",
			key: "date",
			render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
		},
		{
			align: "center",
			title: "Suwret",
			dataIndex: "image_url",
			key: "image_url",
			render: (value: string) => (
				<Image
					width={90}
					style={{
						objectFit: "cover",
						aspectRatio: 16 / 9,
					}}
					placeholder={true}
					alt={""}
					src={value}
				/>
			),
		},
	]

	return columns
}
