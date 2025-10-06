import { HomeOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import type { FC } from "react"
import { BackButton } from "src/widgets/actions"
import { PageHeader } from "src/widgets/page-header"
import { UsersTable } from "./tables"
import { UsersForm } from "./forms"

const Users: FC = () => {
	return (
		<>
			<PageHeader
				title={"Bazar paydalaniwshilar"}
				breadcrumbs={[
					{
						key: "/",
						title: (
							<Link to={"/"}>
								<HomeOutlined /> Bas bet
							</Link>
						),
					},
					{
						key: "/users",
						title: "Bazarlar paydalaniwshilar",
					},
				]}
				extra={<BackButton />}
			/>
			<UsersForm />
			<UsersTable />
		</>
	)
}

export { Users }

