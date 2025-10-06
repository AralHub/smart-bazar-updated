import { useParams } from "@tanstack/react-router"
import { type FC } from "react"
import { useGetGuestPaymentsByIdQuery } from "src/services/guest/guest.api.ts"
import { Card, Descriptions } from "src/shared/ui"
import { formatEmpty, formatPriceWithCurrency } from "src/shared/utils"

const Guest: FC = () => {
	const { paymentId } = useParams({
		from: "/guest/payments/$paymentId/",
	})
	const { data: guestPayment, isLoading } =
		useGetGuestPaymentsByIdQuery(paymentId)

	return (
		<>
			<Card
				title={`Tolem ${isLoading ? "..." : "№" + guestPayment?.data?.id}`}
				loading={isLoading}
			>
				<Descriptions
					layout={"vertical"}
					items={[
						{
							key: "place",
							label: "Orin",
							children: formatEmpty(guestPayment?.data?.place?.name),
						},
						{
							key: "seller",
							label: "Satiwshi",
							children: formatEmpty(guestPayment?.data?.seller?.name),
						},
						{
							key: "amount",
							label: "Tolengen pul",
							children: formatPriceWithCurrency(guestPayment?.data?.amount),
						},
						{
							key: "payment_method_name",
							label: "Tolem turi",
							children: formatEmpty(guestPayment?.data?.payment_method_name),
						},
						{
							key: "from_date",
							label: "Baslangish sane",
							children: guestPayment?.data?.from_date,
						},
						{
							key: "to_date",
							label: "Tawsuliw sane",
							children: guestPayment?.data?.to_date,
						},
						{
							key: "created_at",
							label: "Tolem islengen sane",
							children: guestPayment?.data?.created_at,
						},
					]}
				/>
			</Card>
		</>
	)
}

export { Guest }
