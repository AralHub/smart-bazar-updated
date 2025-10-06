import Loading3QuartersOutlined from "@ant-design/icons/Loading3QuartersOutlined"
import Spin from "antd/es/spin"
import { type FC } from "react"

interface LoaderProps {
	loading?: boolean
}

const Loader: FC<LoaderProps> = ({ loading }) => {
	return (
		<>
			<Spin
				spinning={loading}
				fullscreen={true}
				size={"large"}
				indicator={
					<Loading3QuartersOutlined spin={true} style={{ color: "#fff" }} />
				}
			/>
		</>
	)
}

export { Loader }
