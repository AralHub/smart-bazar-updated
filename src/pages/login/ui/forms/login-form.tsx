import { useNavigate } from "@tanstack/react-router"

import { type FC, useEffect, useState } from "react"
import { PatternFormat } from "react-number-format"
import { type LoginChange, useLoginMutation } from "src/services/auth"
import { useAuth } from "src/shared/hooks"
import {
	Button,
	Checkbox,
	Form,
	FormItem,
	type FormProps,
	Input,
	InputPassword,
	Segmented,
	useForm,
	useWatch,
} from "src/shared/ui"
import { formatFormPhone } from "src/shared/utils"

const LoginForm: FC = () => {
	const [form] = useForm<LoginChange>()
	const remember = useWatch("remember", form)
	const navigate = useNavigate()
	const auth = useAuth()
	const [tab, setTab] = useState(1)

	const {
		data: loginData,
		mutate: login,
		isPending,
		isSuccess,
	} = useLoginMutation()

	const onFinish: FormProps<LoginChange>["onFinish"] = (values) => {
		if (values?.phone) {
			values.phone = formatFormPhone(values.phone)
		}
		login(values)
	}

	useEffect(() => {
		if (loginData && isSuccess) {
			auth.login(
				loginData?.data?.access_token,
				loginData?.data?.user?.role,
				loginData?.data?.user?.market_id,
				loginData?.data?.user?.market?.district_id || null,
				remember
			)
			if (loginData?.data?.user?.market) {
				navigate({
					to: "/d/$districtId/m/$marketId/dashboard",
					params: {
						marketId: `${loginData?.data?.user?.market?.id}`,
						districtId: `${loginData?.data?.user?.market?.district_id}`,
					},
				})
			} else {
				navigate({
					to: "/",
				})
			}
		}
	}, [auth, isSuccess, loginData, navigate, remember])
	return (
		<>
			<Form
				layout={"vertical"}
				autoComplete={"off"}
				name={"login-form"}
				size={"large"}
				labelCol={{
					style: {
						fontWeight: "bold",
					},
				}}
				form={form}
				onFinish={onFinish}
			>
				<Segmented
					block={true}
					value={tab}
					onChange={(value) => {
						setTab(value)
						form.resetFields(["phone", "email"])
					}}
					options={[
						{ value: 1, label: "Email" },
						{ value: 2, label: "Telefon" },
					]}
				/>
				{tab === 2 ? (
					<FormItem<LoginChange>
						label={"Telefon nomer"}
						name={"phone"}
						style={{
							marginBottom: 16,
						}}
						rules={[{ required: true }]}
					>
						<PatternFormat
							// valueIsNumericString={true}
							allowEmptyFormatting={true}
							mask={"_"}
							customInput={Input}
							format={"+998 ## ### ## ##"}
							style={{ height: 42 }}
							placeholder={"+998 90 123 45 67"}
						/>
					</FormItem>
				) : (
					<FormItem<LoginChange>
						label={"Email"}
						name={"email"}
						style={{
							marginBottom: 16,
						}}
						rules={[{ required: true }]}
					>
						<Input
							style={{ height: 42 }}
							placeholder={"user@example.com"}
						/>
					</FormItem>
				)}
				<FormItem<LoginChange>
					label={"Parol"}
					name={"password"}
					style={{
						marginBottom: 16,
					}}
					rules={[{ required: true }]}
				>
					<InputPassword
						style={{ height: 42 }}
						placeholder={"***********"}
					/>
				</FormItem>
				<FormItem
					name={"remember"}
					valuePropName={"checked"}
					style={{
						marginBottom: 16,
					}}
					initialValue={false}
				>
					<Checkbox>Bul qurılmanı eslep qalıw</Checkbox>
				</FormItem>
				<FormItem noStyle={true}>
					<Button
						loading={isPending}
						htmlType={"submit"}
						type={"primary"}
						block={true}
					>
						Kiriw
					</Button>
				</FormItem>
			</Form>
		</>
	)
}

export { LoginForm }
