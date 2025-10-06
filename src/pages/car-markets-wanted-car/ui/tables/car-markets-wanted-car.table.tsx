import { ArrowLeftOutlined } from "@ant-design/icons"
import { useParams, useRouter, useSearch } from "@tanstack/react-router"
import { type FC, useEffect } from "react"
import { useCarMarketsWantedCarColumns } from "src/pages/car-markets-wanted-car/hooks"
import { useGetCarParksQuery } from "src/services/dashboard/car-parks"
import {
	type CarWantedAttendance,
	useGetCarsWantedAttendancesQuery,
} from "src/services/dashboard/cars"
import { useTablePagination } from "src/shared/hooks"
import { Button, Select, Space, Table } from "src/shared/ui"

const CarMarketsWantedCarTable: FC = () => {
	const { history, navigate } = useRouter()
	const { carId } = useParams({
		from: "/_map-layout/car-markets-dashboard/wanted-cars/$carId",
	})
	const { car_park } = useSearch({
		from: "/_map-layout/car-markets-dashboard/wanted-cars/$carId",
	})
	const { current, pageSize, onChange } = useTablePagination({
		current: 1,
		pageSize: 10,
	})

	const { data: carParks, isLoading: carParksLoading } = useGetCarParksQuery({
		page: 1,
		per_page: 1000,
	})

	const {
		data: carAttendances,
		isLoading,
		isFetching,
	} = useGetCarsWantedAttendancesQuery({
		car_park_id: car_park,
		page: current,
		per_page: pageSize,
		number: carId,
	})

	const columns = useCarMarketsWantedCarColumns()

	useEffect(() => {
		if (!carParks?.data) return
		if (
			car_park &&
			carParks?.data &&
			carParks?.data?.some((el) => el.id === Number(car_park))
		)
			return
		const [carPark] = carParks.data
		navigate({
			to: ".",
			replace: true,
			search: (search) => ({
				...search,
				car_park: carPark?.id,
			}),
		})
	}, [carParks, car_park, navigate])
	return (
		<>
			<Table<CarWantedAttendance>
				rowKey={"id"}
				title={`${carId} mashina haqqında maǵlıwmat`}
				extra={
					<Space>
						<Button
							onClick={() => history.back()}
							icon={<ArrowLeftOutlined />}
							children={"Artqa"}
						/>
						<Select
							loading={carParksLoading}
							disabled={carParksLoading}
							value={car_park}
							onChange={(value) => {
								navigate({
									to: ".",
									replace: true,
									search: (prev) => ({
										...prev,
										car_park: value,
									}),
								})
							}}
							placeholder={"Avto turar orin saylan"}
							popupMatchSelectWidth={false}
							options={carParks?.data?.map((carPark) => ({
								value: carPark.id,
								label: carPark.name,
							}))}
						/>
					</Space>
				}
				loading={isLoading || isFetching}
				dataSource={carAttendances?.data}
				columns={columns}
				pagination={{
					total: carAttendances?.meta?.total || carAttendances?.total,
					current,
					pageSize,
					onChange,
				}}
			/>
		</>
	)
}

export { CarMarketsWantedCarTable }
