import { type FC, type PropsWithChildren } from "react"
import { AntdProvider } from "./antd.provider.tsx"
import { AppProvider } from "./app.provider.tsx"
import { AuthProvider } from "./auth.provider.tsx"
import { ReactQueryProvider } from "./react-query.provider.tsx"

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<ReactQueryProvider>
				<AntdProvider>
					<AppProvider>
						<AuthProvider>{children}</AuthProvider>
					</AppProvider>
				</AntdProvider>
			</ReactQueryProvider>
		</>
	)
}

export { Providers }
