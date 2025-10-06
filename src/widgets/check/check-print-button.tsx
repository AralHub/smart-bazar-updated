import { PrinterOutlined } from "@ant-design/icons"
import { type FC, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import type { Payment } from "src/services/dashboard/payments"
import { Button } from "src/shared/ui"
import { CheckContent } from "./check-content.tsx"

interface CheckPrintButtonProps {
	data: Payment
}

const CheckPrintButton: FC<CheckPrintButtonProps> = ({ data }) => {
	const checkRef = useRef<HTMLDivElement>(null)

	const handlePrint = useReactToPrint({
		contentRef: checkRef,
		documentTitle: "Check",
		preserveAfterPrint: false,
	})

	return (
		<>
			<Button
				onClick={handlePrint}
				type={"primary"}
				icon={<PrinterOutlined />}
			/>
			<div hidden={true}>
				<CheckContent
					ref={checkRef}
					data={data}
				/>
			</div>
		</>
	)
}

export { CheckPrintButton }
