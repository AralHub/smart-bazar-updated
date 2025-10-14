import dayjs, { type Dayjs } from "dayjs"

export const formatEmpty = <T>(value?: T) => value ?? "-"

export const formatNumber = <T>(value: T, defaultValue: number = 0) => {
	if (isNaN(Number(value))) return defaultValue
	return Number(value) || defaultValue
}

export const formatPrice = <T>(price?: T): string => {
	if (price === undefined && isNaN(Number(price))) {
		return "0"
	}
	return Intl.NumberFormat("en-EN", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(Number(price))
}

export const formatPriceWithCurrency = (
	price?: number | string | null
): string => {
	if (price === undefined && isNaN(Number(price))) {
		return "0 UZS"
	}
	return (
		Intl.NumberFormat("en-EN", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(Number(price)) + " UZS"
	)
}

export const formatPhone = (value?: string | null) => {
	if (!value) return ""
	return value.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5")
}

export const formatFormPhone = (phone?: string) => {
	if (!phone) return ""
	return phone.replace(/ /g, "").slice(1)
}

export const formatFormReversePhone = (phone?: string) => {
	if (!phone) return ""
	return phone?.slice(3)
}

export const formatInputPrice = <T>(value?: T) =>
	`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export const formatDate = (value?: string | Dayjs) =>
	dayjs(value).format("YYYY-MM-DD")

export const formatCustomDate = (
	value?: string | Dayjs | null,
	format: string = "YYYY-MM-DD"
) => dayjs(value).format(format)

export const formatDateTime = (value?: string | Dayjs) =>
	value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "-"
