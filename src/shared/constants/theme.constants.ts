import theme from "antd/es/theme"
import type { AliasToken } from "antd/es/theme/interface"

export const LIGHT_THEME: Partial<AliasToken> = {
	colorPrimary: "#213D9D",
	colorBgLayout: "#F4F7FB",
	borderRadius: 8,
	fontFamily: "Manrope",
}

export const DARK_THEME: Partial<AliasToken> = {
	colorPrimary: "#213D9D",
	colorBgContainer: "#1e1e1e",
	colorBgLayout: "rgba(60,60,60,0.6)",
	borderRadius: 8,
	colorBorder: "#3c3c3c",
	fontFamily: "Manrope",
}

const DEFAULT_TOKEN = theme.getDesignToken()
export const TOKEN = theme.getDesignToken({
	token: {
		...LIGHT_THEME,
		fontFamily: `${LIGHT_THEME.fontFamily},${DEFAULT_TOKEN.fontFamily}`,
	},
})
