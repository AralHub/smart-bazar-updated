import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import { theme } from "antd"
import ConfigProvider from "antd/es/config-provider"
import dayjs from "dayjs"
import dayjsEN from "dayjs/locale/en"
import localeData from "dayjs/plugin/localeData"
import updateLocale from "dayjs/plugin/updateLocale"
import { type FC, type PropsWithChildren } from "react"
import { DARK_THEME, LIGHT_THEME } from "src/shared/constants"
import { useToken } from "src/shared/hooks"
import { useThemeStore } from "src/shared/store"
import { dayjsQQ, localeQQ } from "./locale.ts"

dayjs.extend(updateLocale)
dayjs.extend(localeData)

dayjs.locale("qq-latn", {
	...dayjsQQ,
	ordinal: dayjsEN.ordinal,
})
dayjs.locale("qq-latn")

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
	const { token } = useToken()
	const { isDark } = useThemeStore()

	const themeToken = {
		...(isDark ? DARK_THEME : LIGHT_THEME),
	}

	return (
		<ConfigProvider
			locale={localeQQ}
			theme={{
				algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
				token: {
					...themeToken,
					fontFamily: `${themeToken.fontFamily},${token.fontFamily}`,
				},
				components: {
					Menu: {
						borderRadius: 12,
					},
				},
			}}
			typography={{
				style: {
					margin: 0,
					overflow: "hidden",
					textOverflow: "ellipsis",
				},
			}}
			menu={{
				style: {
					border: "none",
				},
			}}
			form={{
				requiredMark: false,
			}}
			spin={{
				indicator: <LoadingOutlined />,
			}}
		>
			{children}
		</ConfigProvider>
	)
}

export { AntdProvider }
