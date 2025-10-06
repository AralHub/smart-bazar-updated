import { DownloadOutlined } from "@ant-design/icons"
import type { ButtonProps } from "antd"
import { type FC, useTransition } from "react"
import { Button } from "src/shared/ui"

import { generateExcel } from "src/shared/utils"

export type ExcelData = {
	headers: (string | null | undefined)[][]
	values: (string | number | null | undefined)[][]
	totals: (string | number | null | undefined)[][]
	merges: string[]
	lastNoTotal?: boolean
}

interface ExcelButtonProps extends ButtonProps {
	data?: {
		data: ExcelData
		name?: string
	}
}

const ExcelButton: FC<ExcelButtonProps> = ({ data, loading, ...props }) => {
	const [isLoading, startTransition] = useTransition()

	return (
		<>
			<Button
				type={"primary"}
				loading={loading || isLoading}
				key={"excel"}
				onClick={() =>
					startTransition(() => {
						if (!data) return
						generateExcel(data.data, data.name)
					})
				}
				icon={<DownloadOutlined />}
				{...props}
			>
				Excel
			</Button>
		</>
	)
}

export { ExcelButton }
