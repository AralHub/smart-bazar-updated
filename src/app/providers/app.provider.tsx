import App from "antd/es/app"
import { type FC, type PropsWithChildren } from "react"

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	return <App>{children}</App>
}

export { AppProvider }
