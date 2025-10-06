import { RouterProvider } from "@tanstack/react-router"
import { type FC, lazy } from "react"
import { GlobalStyles } from "src/app/styles"
import { useAuth } from "src/shared/hooks"
import { router } from "./router"

const Generate = import.meta.env.DEV
	? lazy(() =>
			import("./generate.tsx").then((res) => ({
				default: res.Generate,
			}))
		)
	: () => null

const App: FC = () => {
	const auth = useAuth()
	return (
		<>
			<Generate />
			<GlobalStyles />
			<RouterProvider
				router={router}
				context={{ auth }}
			/>
		</>
	)
}

export { App }
