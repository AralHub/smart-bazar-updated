import { type FC, type PropsWithChildren } from "react"
import { Layout } from "src/shared/ui"

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Layout
				style={{
					minHeight: "100vh"
				}}
			>
				{children}
			</Layout>
		</>
	)
}

export { MainLayout }
