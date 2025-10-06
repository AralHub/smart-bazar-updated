import { useParams } from "@tanstack/react-router"
import { type FC, useEffect } from "react"
import {
	type Place,
	type PlaceChange,
	useCreatePlacesMutation,
	useEditPlacesMutation,
} from "src/services/dashboard/places"
import { useGetBlocksQuery } from "src/services/dashboard/places/blocks"
import { useGetPlaceTypesQuery } from "src/services/dashboard/places/place-types"
import { useGetProductTypesQuery } from "src/services/dashboard/places/product-types"
import { useFormDevtoolsStore } from "src/shared/store"
import {
	Checkbox,
	Form,
	FormItem,
	type FormProps,
	Input,
	InputNumber,
	Segmented,
	Select,
	useForm,
} from "src/shared/ui"
import { formatInputPrice } from "src/shared/utils"
import { FormModal } from "src/widgets/form-modal"

const SellPlacesForm: FC = () => {
	const [form] = useForm<PlaceChange>()

	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/sell-places",
	})

	const params = useFormDevtoolsStore((state) => state.getParams<Place>())

	const { data: placeTypes, isLoading: placeTypesLoading } =
		useGetPlaceTypesQuery({
			market_id: marketId,
		})
	const { data: productTypes, isLoading: productTypesLoading } =
		useGetProductTypesQuery({
			per_page: 1000,
			market_id: marketId,
		})
	const { data: blocks, isLoading: blocksLoading } = useGetBlocksQuery({
		per_page: 1000,
		market_id: marketId,
	})

	const {
		mutate: addPlace,
		isPending: addLoading,
		isSuccess: addSuccess,
	} = useCreatePlacesMutation()

	const {
		mutate: editPlace,
		isPending: editLoading,
		isSuccess: editSuccess,
	} = useEditPlacesMutation()

	const onFinish: FormProps<PlaceChange>["onFinish"] = (values) => {
		if (params) {
			editPlace({
				...values,
				id: params.id,
			})
			return
		}
		addPlace({
			...values,
			market_id: marketId,
		})
	}

	useEffect(() => {
		if (blocks) {
			form.setFieldValue("block_id", blocks?.data?.[0]?.id)
		}
	})

	useEffect(() => {
		if (params) {
			form.setFieldsValue({
				...params,
			})
		}
	})
	return (
		<>
			<FormModal
				maskClosable={false}
				form={form}
				loading={addLoading || editLoading}
				success={editSuccess || addSuccess}
			>
				<Form
					name={"place-form"}
					form={form}
					size={"large"}
					onFinish={onFinish}
					layout={"vertical"}
					autoComplete={"off"}
				>
					<FormItem<PlaceChange>
						name={"name"}
						label={"Orin"}
						rules={[{ required: true }]}
					>
						<Input placeholder={"123"} />
					</FormItem>
					<FormItem<PlaceChange>
						name={"place_type_id"}
						label={"Orin turi"}
						rules={[{ required: true }]}
						initialValue={1}
					>
						<Segmented
							size={"large"}
							block={true}
							options={
								placeTypes?.data?.map((el) => ({
									value: el?.id,
									label: el?.name,
								})) || []
							}
							disabled={placeTypesLoading}
						/>
					</FormItem>
					<FormItem<PlaceChange>
						name={"product_type_id"}
						label={"Onim oner turi"}
						rules={[{ required: false }]}
					>
						<Select
							options={
								productTypes?.data?.map((el) => ({
									value: el?.id,
									label: el?.name,
								})) || []
							}
							allowClear={true}
							placeholder={"Miyweler"}
							loading={productTypesLoading}
							disabled={productTypesLoading}
						/>
					</FormItem>
					<FormItem<PlaceChange>
						name={"block_id"}
						label={"Block"}
						rules={[{ required: true }]}
					>
						<Select
							options={
								blocks?.data?.map((el) => ({
									value: el?.id,
									label: el?.name,
								})) || []
							}
							placeholder={"block 1"}
							loading={blocksLoading}
							disabled={blocksLoading}
						/>
					</FormItem>
					<FormItem<PlaceChange>
						name={"is_rent"}
						rules={[{ required: false }]}
						initialValue={false}
						valuePropName={"checked"}
						style={{
							marginBottom: 8,
						}}
					>
						<Checkbox>Arenda orin bolip esaplanadi</Checkbox>
					</FormItem>
					<FormItem<PlaceChange>
						name={"price"}
						label={"Tolem summa"}
						rules={[{ required: false }]}
					>
						<InputNumber
							style={{ width: "100%" }}
							placeholder={"10,000"}
							formatter={formatInputPrice}
						/>
					</FormItem>
				</Form>
			</FormModal>
		</>
	)
}

export { SellPlacesForm }
