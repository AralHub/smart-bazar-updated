import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import { type FC, useMemo, useState } from "react"
import { useGetPlacesByIdQuery } from "src/services/dashboard/places"
import { useGetBlocksByIdQuery } from "src/services/dashboard/places/blocks"
import { Modal, Tabs } from "src/shared/ui"
import { PlaceInfoForm } from "./place-info-form.tsx"
import { PlaceInfoTable } from "./place-info-table.tsx"

interface PlaceInfoModalProps {
	data?: {
		place?: string
		block?: string
	}
	open?: boolean
	onClose?: () => void
}

const PlaceInfoModal: FC<PlaceInfoModalProps> = ({ data, open, onClose }) => {
	const [tab, setTab] = useState("table")

	const {
		data: place,
		isLoading: placesLoading,
		isFetching: placesFetching,
	} = useGetPlacesByIdQuery(data?.place)

	const {
		data: blocks,
		isLoading: blocksLoading,
		isFetching: blocksFetching,
	} = useGetBlocksByIdQuery(data?.block)

	const loading = useMemo(() => {
		return placesLoading || placesFetching || blocksLoading || blocksFetching
	}, [blocksFetching, blocksLoading, placesFetching, placesLoading])

	const title = useMemo(() => {
		if (loading) return <LoadingOutlined spin={true} />

		if (data?.block && blocks?.data) {
			return `Jayma: ${blocks?.data?.name || ""}`
		}

		return `${place?.data?.place_type?.name || "Orin"}: ${place?.data?.name || ""}`
	}, [
		blocks?.data,
		data?.block,
		loading,
		place?.data?.name,
		place?.data?.place_type?.name,
	])

	const items = useMemo(
		() => [
			{
				key: "table",
				label: "Tólemler",
				children: (
					<>
						<PlaceInfoTable data={data} />
					</>
				),
			},
			{
				key: "form",
				label: "Tólem alıw",
				children: (
					<>
						<PlaceInfoForm
							onChangeTab={setTab}
							data={{
								place: place?.data,
								block: blocks?.data,
								isBlock: !!data?.block,
							}}
						/>
					</>
				),
			},
		],
		[blocks?.data, data, place?.data]
	)

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
				title={title}
				loading={loading}
				onCancel={() => {
					onClose?.()
					setTab("table")
				}}
			>
				<Tabs
					activeKey={tab}
					onChange={setTab}
					items={items}
				/>
			</Modal>
		</>
	)
}

export { PlaceInfoModal }
