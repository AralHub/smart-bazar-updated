import { useParams } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import {
	useCreatePaymentsMutation,
	type PaymentChange,
} from "src/services/dashboard/payments"
import { useGetServiceTypesQuery } from "src/services/dashboard/payments/service-types"
import { useGetPlacesQuery } from "src/services/dashboard/places"
import { useGetBlocksQuery } from "src/services/dashboard/places/blocks"
import { useGetProductTypesQuery } from "src/services/dashboard/places/product-types"
import { useForm, useWatch, type FormProps } from "src/shared/ui"
import { formatDate } from "src/shared/utils"

export type ReturnTypeOfUsePaymentForm = ReturnType<typeof usePaymentForm>

export const usePaymentForm = () => {
	const [form] = useForm<PaymentChange>()
	const [payment_category_id, set_payment_category_id] = useState<string>("1")
	const paymentType = useWatch("payment_type_id", form)
	const blockId = useWatch("block_id", form)
	const placeId = useWatch("place_id", form)
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/payments",
	})
	const [search, setSearch] = useState("")

	const {
		data: places,
		isLoading,
		isFetching,
	} = useGetPlacesQuery({
		market_id: marketId,
		place_type_id: paymentType,
		block_id: blockId,
		search,
	})

	const { data: blocks, isLoading: blocksLoading } = useGetBlocksQuery({
		market_id: marketId,
		per_page: 1000,
		type: paymentType === 3 ? 4 : undefined,
	})
	const { data: productTypes, isLoading: productTypesLoading } =
		useGetProductTypesQuery({
			market_id: marketId,
		})
	const { data: serviceTypes, isLoading: serviceTypesLoading } =
		useGetServiceTypesQuery({
			market_id: marketId,
		})

	const {
		mutate: addPayment,
		isPending: addPaymentLoading,
		isSuccess: addPaymentSuccess,
	} = useCreatePaymentsMutation()

	const onChangePaymentCategory = (key: string) => {
		set_payment_category_id(key)
	}

	const onFinish: FormProps<PaymentChange>["onFinish"] = (values) => {
		if (addPaymentLoading) return
		if (values.date) {
			values.date = formatDate(values.date)
		}
		addPayment(
			{
				...values,
				market_id: marketId,
				payment_category_id: Number(payment_category_id),
			},
			{
				onSuccess: () => {
					form.resetFields()
				},
			}
		)
	}
	const latestPayment = places?.data.find(
		(item) => item.block_id === blockId && item.id === placeId
	)?.latest_payment

	useEffect(() => {
		if (latestPayment) {
			form.setFieldsValue({
				quantity: latestPayment.quantity,
				amount: latestPayment.amount,
				product_type_id: latestPayment.product_type_id,
			})
		} else {
			form.resetFields(["quantity", "amount", "product_type_id"])
		}
	}, [latestPayment, form])

	return {
		paymentForm: form,
		onFinish,
		paymentType,
		blocksLoading,
		blocks,
		productTypes,
		productTypesLoading,
		serviceTypes,
		serviceTypesLoading,
		isLoading,
		isFetching,
		search,
		setSearch,
		places,
		latestPayment,
		addPaymentLoading,
		addPaymentSuccess,
		onChangePaymentCategory,
		payment_category_id,
	}
}
