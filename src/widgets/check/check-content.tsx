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
			{data.last_receipt && (
				<>
					{/* <Flex justify="space-between">
						<span>ID:</span>
						<strong>{data.last_receipt.id}</strong>
					</Flex>
					<Flex justify="space-between">
						<span>Receipt category:</span>
						<strong>{data.last_receipt.receipt_category}</strong>
					</Flex>
					<Flex justify="space-between">
						<span>Biykarlangan:</span>
						<strong>
							{data.last_receipt.is_refund ? "Biykarlangan" : "Biykarlanbagan"}
						</strong>
					</Flex> */}

					<Divider
						variant="dashed"
						style={{ marginBlock: 4 }}
					/>

					<h4 style={{ margin: "4px 0" }}>Tovarlar:</h4>
					{data.last_receipt.items?.map((item, i) => (
						<Flex
							key={i}
							vertical
							style={{ marginBottom: 6 }}
						>
							<Flex justify="space-between">
								<span>Nom:</span>
								<strong>{item.Name}</strong>
							</Flex>
							<Flex justify="space-between">
								<span>Narx:</span>
								<strong>{formatPrice(item.Price)}</strong>
							</Flex>
							<Flex justify="space-between">
								<span>QQS (%):</span>
								<strong>{item.VATPercent}%</strong>
							</Flex>
							<Flex justify="space-between">
								<span>QQS summa:</span>
								<strong>{formatPrice(item.VAT)}</strong>
							</Flex>
							<Flex justify="space-between">
								<span>SPIC:</span>
								<strong>{item.SPIC}</strong>
							</Flex>
							{item.CommissionInfo?.TIN && (
								<Flex justify="space-between">
									<span>TIN:</span>
									<strong>{item.CommissionInfo.TIN}</strong>
								</Flex>
							)}
							<Divider
								dashed
								style={{ marginBlock: 4, borderColor: "#ccc" }}
							/>
						</Flex>
					))}

					<Flex justify="space-between">
						<span>Naqd pul:</span>
						<strong>{formatPrice(data.last_receipt.received_cash)}</strong>
					</Flex>
					<Flex justify="space-between">
						<span>Karta orqali:</span>
						<strong>{formatPrice(data.last_receipt.received_card)}</strong>
					</Flex>
					<Flex justify="space-between">
						<span>Jami QQS:</span>
						<strong>{formatPrice(data.last_receipt.total_VAT)}</strong>
					</Flex>

					<Flex justify="space-between">
						<span>Terminal ID:</span>
						<strong>{data.last_receipt.terminal_id}</strong>
					</Flex>
					<Flex justify="space-between">
						<span>Chek raqami:</span>
						<strong>{data.last_receipt.receipt_seq}</strong>
					</Flex>
					<Flex justify="space-between">
						<span>Vaqt:</span>
						<strong>{data.last_receipt.time}</strong>
					</Flex>
					<Flex justify="space-between">
						<span>Fiscal sign:</span>
						<strong>{data.last_receipt.fiscal_sign}</strong>
					</Flex>
				</>
			)}
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
					value={data.url}
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
