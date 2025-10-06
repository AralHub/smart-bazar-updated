import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Providers } from "src/app/providers"
import { App } from "./app.tsx"
import "./styles/index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<App />
		</Providers>
	</StrictMode>
)
