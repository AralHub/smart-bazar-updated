import useApp from "antd/es/app/useApp"

export const useMessage = () => {
	const { notification } = useApp()

	return {
		message: notification
	}
}
