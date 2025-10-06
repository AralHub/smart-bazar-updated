import { CheckCircleOutlined } from "@ant-design/icons"
import { useEffect, type FC } from "react"
import { PatternFormat } from "react-number-format"
import {
	useEditProfileMutation,
	useGetProfileQuery,
	type UserChange,
} from "src/services/auth"
import {
	Button,
	Card,
	Col,
	Flex,
	Form,
	FormItem,
	Input,
	InputPassword,
	Row,
	useForm,
	type FormProps,
} from "src/shared/ui"
import { formatFormPhone, formatPhone } from "src/shared/utils"

const Profile: FC = () => {
	const [form] = useForm<UserChange>()

	const { data: profile, isLoading, isFetching } = useGetProfileQuery()

	const { mutate: editProfile, isPending: editLoading } =
		useEditProfileMutation()

	const onFinish: FormProps<UserChange>["onFinish"] = (values) => {
		if (values?.phone) {
			values.phone = formatFormPhone(values?.phone)
		}
		editProfile(values)
	}

	useEffect(() => {
		if (profile?.data) {
			form.setFieldsValue({
				...profile?.data,
				phone: profile?.data?.phone
					? formatPhone(profile?.data?.phone)
					: undefined,
			})
		}
	}, [form, profile?.data])
	return (
		<>
			<Card loading={isLoading || isFetching}>
				<Form
					name={"profile-form"}
					form={form}
					onFinish={onFinish}
					layout={"vertical"}
					autoComplete={"off"}
					size={"large"}
				>
					<Row
						gutter={16}
						style={{ rowGap: 16 }}
					>
						<Col
							xs={24}
							md={8}
						>
							<FormItem
								label={"F.A.A"}
								name={"name"}
								rules={[{ required: true }]}
							>
								<Input />
							</FormItem>
						</Col>
						<Col
							xs={24}
							md={8}
						>
							<FormItem
								label={"Telefon nomer"}
								name={"phone"}
								rules={[{ required: true }]}
							>
								<PatternFormat
									allowEmptyFormatting={false}
									mask={"_"}
									customInput={Input}
									format={"+998 ## ### ## ##"}
									placeholder={"+998 90 123 45 67"}
								/>
							</FormItem>
						</Col>
						<Col
							xs={24}
							md={8}
						>
							<FormItem
								label={"Parol"}
								name={"password"}
								rules={[{ required: false }]}
							>
								<InputPassword placeholder={"***********"} />
							</FormItem>
						</Col>
					</Row>
					<Flex justify={"end"}>
						<Button
							type={"primary"}
							htmlType={"submit"}
							icon={<CheckCircleOutlined />}
							loading={editLoading}
							disabled={editLoading}
						>
							Saqlaw
						</Button>
					</Flex>
				</Form>
			</Card>
		</>
	)
}

export { Profile }
