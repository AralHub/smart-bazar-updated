import {
	AppstoreAddOutlined,
	CarOutlined,
	ClearOutlined,
	DollarOutlined,
	EnvironmentOutlined,
	HomeOutlined,
	LineChartOutlined,
	PieChartOutlined,
	TeamOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Title } from "src/shared/ui"
import { CowOutlined, ParkingOutlined } from "src/shared/ui/icons"

export type MenuItem = Required<MenuProps>["items"][number]

const groupTitle = (text: string) => {
	return (
		<Title
			level={5}
			style={{
				letterSpacing: 1.5,
				marginLeft: -8,
				textTransform: "uppercase",
				whiteSpace: "nowrap",
				fontSize: 12,
			}}
		>
			{text}
		</Title>
	)
}

export const menuData: MenuItem[] = [
	{
		key: "Home",
		type: "group",
		label: groupTitle("Home"),
	},
	{
		key: "/",
		icon: <HomeOutlined />,
		label: "Bazar haqqında maǵlıwmat",
	},
	{
		key: "/dashboard/",
		icon: <PieChartOutlined />,
		label: "Bazar statistikası",
	},
	{
		key: "Payments/",
		type: "group",
		label: groupTitle("Payments"),
	},
	{
		key: "/payments/",
		icon: <DollarOutlined />,
		label: "Tólemler",
	},
	{
		key: "/annual-income/",
		icon: <LineChartOutlined />,
		label: "Jıllıq dáramatlar",
	},
	{
		key: "Map",
		type: "group",
		label: groupTitle("Map"),
	},
	{
		key: "/map/",
		icon: <EnvironmentOutlined />,
		label: "Karta",
	},
	{
		key: "/restrooms/",
		icon: <ClearOutlined />,
		label: "Hájetxanalar",
	},
	{
		key: "/sell-places/",
		icon: <AppstoreAddOutlined />,
		label: "Sawda orınları",
	},
	{
		key: "FaceID",
		type: "group",
		label: groupTitle("FaceID"),
	},
	{
		key: "/cattle-market/",
		icon: <CowOutlined />,
		label: "Mal bazarlar",
	},
	{
		key: "/car-market/",
		icon: <CarOutlined />,
		label: "Mashin bazarlar",
	},
	{
		key: "/parking/",
		icon: <ParkingOutlined />,
		label: "Avto turar orınlar",
	},
	{
		key: "Employees",
		type: "group",
		label: groupTitle("Employees"),
	},
	{
		key: "/employees/",
		icon: <TeamOutlined />,
		label: "Xızmetkerler",
	},
	{
		key: "/employees-payment/",
		icon: <UsergroupAddOutlined />,
		label: "Xızmetkerler tolemi",
	},
	// {
	// 	key: "About",
	// 	type: "group",
	// 	label: groupTitle("About"),
	// },
	// {
	// 	key: "/control",
	// 	icon: <ScheduleOutlined />,
	// 	label: "Qadaǵalaw",
	// },
]
