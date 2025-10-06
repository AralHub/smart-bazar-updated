import { ArrowLeftOutlined } from "@ant-design/icons"
import { useRouter } from "@tanstack/react-router"
import { type FC } from "react"
import { useCarMarketsWantedCarsColumns } from "src/pages/car-markets-wanted-cars/hooks"
import {
	type CarWanted,
	useGetCarsWantedQuery,
} from "src/services/dashboard/cars"
import { useTablePagination } from "src/shared/hooks"
import { Button, Space, Table } from "src/shared/ui"
import { AddButton } from "src/widgets/actions"

const CarMarketsWantedCarsTable: FC = () => {
	const { history, navigate } = useRouter()
	const { current, pageSize, onChange } = useTablePagination({
		current: 1,
		pageSize: 10,
	})

	const {
		data: carsWanted,
		isLoading,
		isFetching,
	} = useGetCarsWantedQuery({
		page: current,
		per_page: pageSize,
	})

	const columns = useCarMarketsWantedCarsColumns()
	return (
		<>
			<Table<CarWanted>
				title={"Izlenip atırǵan mashinalar"}
				extra={
					<Space>
						<Button
							onClick={() => history.back()}
							icon={<ArrowLeftOutlined />}
							children={"Artqa"}
						/>
						<AddButton formKey={"primary"} />
					</Space>
				}
				loading={isLoading || isFetching}
				dataSource={carsWanted?.data}
				columns={columns}
				onRow={(data) => ({
					style: {
						cursor: "pointer",
					},
					onClick: () => {
						navigate({
							to: "/car-markets-dashboard/wanted-cars/$carId",
							params: {
								carId: data?.number,
							},
						})
					},
				})}
				pagination={{
					current,
					pageSize,
					onChange,
				}}
			/>
		</>
	)
}

export { CarMarketsWantedCarsTable }
