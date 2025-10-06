import { createGlobalStyle } from "antd-style"

export const GlobalStyles = createGlobalStyle`
	*,
	*:after,
	*:before {
		scrollbar-color: ${(token) => token.theme.colorBorder} ${(token) => token.theme.colorBgContainer};
		scroll-behavior: smooth;
		scrollbar-width: thin;

		&::-webkit-scrollbar-thumb {
			background-color: ${(token) => token.theme.colorBorder};
			border-radius: ${(token) => token.theme.borderRadius}px;
		}
	}
	
	body {
		background-color: ${({ theme }) => theme.colorBgContainer};
	}
`
