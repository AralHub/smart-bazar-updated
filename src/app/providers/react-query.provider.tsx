import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type FC, type PropsWithChildren } from "react"
import { queryClient } from "src/shared/config"

const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools buttonPosition={"bottom-right"} />
		</QueryClientProvider>
	)
}

export { ReactQueryProvider }
