import { css, cx } from "antd-style"
import { forwardRef } from "react"
import type { Payment } from "src/services/dashboard/payments"
import { Divider, Flex, QRCode } from "src/shared/ui"
import { formatPrice } from "src/shared/utils"

const CheckContent = forwardRef<HTMLDivElement, { data: Payment }>(
	({ data }, ref) => (
		<Flex
			ref={ref}
			vertical={true}
			className={cx(css`
				width: 100%;
				max-width: 80mm;
				margin-inline: auto;
				height: auto;
				min-height: 0;
				padding: 4px 24px;
				font-size: 12px;
				color: #000;
				background-color: #fff;
			`)}
		>
			<h2
				style={{
					textAlign: "center",
					fontWeight: "bold",
					marginBottom: 0,
				}}
			>
				Smart Bazar
			</h2>
			<Divider
				variant={"dashed"}
				style={{
					marginBlock: 4,
					borderWidth: 1.5,
					borderColor: "#000",
				}}
			/>
			{data?.place?.name ? (
				<Flex
					gap={8}
					justify={"space-between"}
					align={"center"}
				>
					<span>Orin ati:</span>
					<strong>{data?.place?.name || "B/N"}</strong>
				</Flex>
			) : null}
			{data?.service_type?.name ? (
				<Flex
					gap={8}
					justify={"space-between"}
					align={"center"}
				>
					<span>Xızmet túri:</span>
					<strong>{data?.service_type?.name}</strong>
				</Flex>
			) : null}
			{data?.quantity ? (
				<Flex
					gap={8}
					justify={"space-between"}
					align={"center"}
				>
					<span>Neshe oringa tolendi:</span>
					<strong>{data?.quantity}</strong>
				</Flex>
			) : null}
			{data?.place?.place_type?.name ? (
				<Flex
					gap={8}
					justify={"space-between"}
					align={"center"}
				>
					<span>Orın túri:</span>
					<strong>{data?.place?.place_type?.name}</strong>
				</Flex>
			) : null}
			{data?.block?.name ? (
				<Flex
					gap={8}
					justify={"space-between"}
					align={"center"}
				>
					<span>Block:</span>
					<strong>{data?.block?.name}</strong>
				</Flex>
			) : null}
			<Divider
				variant={"dashed"}
				style={{
					marginBlock: 4,
					borderWidth: 1.5,
					borderColor: "#000",
				}}
			/>
			<Flex
				gap={8}
				justify={"space-between"}
				align={"center"}
			>
				<span>Summa:</span>
				<strong>{`${formatPrice(data?.amount)} som`}</strong>
			</Flex>
			<Flex
				gap={8}
				justify={"space-between"}
				align={"center"}
			>
				<span>Tolem turi:</span>
				<strong>{data?.payment_method_name}</strong>
			</Flex>
			<Flex
				gap={8}
				justify={"space-between"}
				align={"center"}
			>
				<span>Tolengen sane:</span>
				<strong
					style={{
						textAlign: "end",
					}}
				>
					{data?.created_at}
				</strong>
			</Flex>
			<Flex
				justify={"center"}
				align={"center"}
				style={{
					marginBlock: 4,
				}}
			>
				<QRCode
					color={"#000"}
					bordered={false}
					type={"svg"}
					size={90}
					value={`${window.location.origin}/guest/payments/${data.id}`}
				/>
			</Flex>
			<Divider
				variant={"dashed"}
				style={{
					marginBlock: 4,
					borderWidth: 1.5,
					borderColor: "#000",
				}}
			/>
		</Flex>
	)
)

export const thermalReceiptStyle = `
  @page {
    size: 58mm auto;
    margin: 0;
  }
  
  @media print {
    html, body {
      height: auto !important;
      margin: 0;
      padding: 0;
    }
    
    body {
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
    }
  }
`

export const thermal80mmStyle = `
  @page {
    size: 80mm auto;
    margin: 2mm;
  }
  
  @media print {
    body {
      font-size: 12px;
      line-height: 1.3;
    }
  }
`
export const fixedHeightStyle = `
  @page {
    size: 58mm 150mm; /* Фиксированная высота 150мм */
    margin: 0;
    height: 150mm;
    width: 58mm;
  }
  
  @media print {
    html, body {
      height: 150mm;
    	width: 58mm;
      overflow: hidden; /* Обрезать содержимое если не помещается */
    }
  }
`
export const minHeightStyle = `
  @page {
    size: 58mm auto;
    margin: 0;
  }
  
  @media print {
    html, body {
      min-height: 100mm; /* Минимальная высота */
      height: auto;
    }
  }
`
export const landscapeStyle = `
  @page {
    size: auto 58mm; /* Ширина авто, высота 58мм (альбомная) */
    margin: 2mm;
  }
`
export { CheckContent }
