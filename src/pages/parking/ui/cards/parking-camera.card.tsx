import { type FC } from "react"
import { Card, Image } from "src/shared/ui"

const ParkingCameraCard: FC = () => {
	return (
		<>
			<Card
				tabList={[
					{
						key: "1",
						label: "Kamera 1"
					},
					{
						key: "2",
						label: "Kamera 2"
					},
					{
						key: "3",
						label: "Kamera 3"
					}
				]}
			>
				<Image
					width={"100%"}
					style={{ aspectRatio: 16 / 9, objectFit: "cover" }}
					src={"/assets/parking.png"}
				/>
			</Card>
		</>
	)
}

export { ParkingCameraCard }
