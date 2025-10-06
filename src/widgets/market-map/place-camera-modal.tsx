import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import type { TableColumnsType } from "antd"
import { useState, type FC } from "react"
import {
	type Image as CameraImage,
	useGetImagesQuery,
} from "src/services/dashboard/images"
import { useTablePagination } from "src/shared/hooks"
import { Image, Modal, Table, Flex } from "src/shared/ui"
import { DatePickerWithNow } from "../date-picker-with-now"
import dayjs from "dayjs"

const columns: TableColumnsType<CameraImage> = [
	{
		title: "Sane",
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
		),
	},
]

interface PlaceCameraModalProps {
	data?: string
	open?: boolean
	onClose?: () => void
}

const PlaceCameraModal: FC<PlaceCameraModalProps> = ({
	data: camera,
	open,
	onClose,
}) => {
	const { current, pageSize, onChange } = useTablePagination({
		current: 1,
		pageSize: 5,
	})
	const [date, setDate] = useState(() => dayjs())

	const {
		data: images,
		isLoading,
		isFetching,
	} = useGetImagesQuery({
		page: current,
		per_page: pageSize,
		camera_id: camera?.split("_")?.[1],
		date: date.format("YYYY-MM-DD"),
	})

	return (
		<>
			<Modal
				centered={true}
				okButtonProps={{
					hidden: true,
				}}
				width={600}
				cancelButtonProps={{
					type: "primary",
					danger: true,
				}}
				cancelText={"Biykarlaw"}
				open={open}
				title={
					isLoading ? (
						<LoadingOutlined spin={true} />
					) : (
						<Flex
							gap={8}
							justify={"space-between"}
							style={{ marginRight: 24 }}
						>
							{`Kamera - ${camera}`}
							<DatePickerWithNow
								value={date}
								onChange={setDate}
								onToday={setDate}
							/>
						</Flex>
					)
				}
				onCancel={onClose}
			>
				<Table
					loading={isLoading || isFetching}
					dataSource={images?.data}
					columns={columns}
					pagination={{
						total: images?.meta?.total,
						current,
						pageSize,
						onChange,
					}}
				/>
			</Modal>
		</>
	)
}

export { PlaceCameraModal }
