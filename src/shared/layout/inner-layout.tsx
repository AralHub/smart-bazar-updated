import { type FC, type PropsWithChildren } from "react"
import { Layout, type LayoutProps } from "src/shared/ui"

const InnerLayout: FC<PropsWithChildren<LayoutProps>> = ({
	children,
	...props
}) => {
	return (
		<>
			<Layout hasSider={true} {...props}>
				{children}
			</Layout>
		</>
	)
}

export { InnerLayout }
