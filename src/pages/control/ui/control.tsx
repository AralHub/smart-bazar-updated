import { HomeOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { type FC } from "react"
import { PageHeader } from "src/widgets/page-header"

const Control: FC = () => {
	return (
		<>
			<PageHeader
				title={"Control"}
				breadcrumbs={[
					{
						key: "/",
						title: (
							<Link to={"/"}>
								<HomeOutlined /> Home
							</Link>
						)
					},
					{
						key: "/control",
						title: "Control"
					}
				]}
			/>
		</>
	)
}

export { Control }
