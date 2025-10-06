import globalTheme from "antd/es/theme"

export const useToken = () => {
	const { token } = globalTheme.useToken()

	return {
		token
	}
}
