import dayjs from "dayjs"

export const isDayjsValid = <T>(value?: T) => dayjs.isDayjs(value)
