import { getMap, registerMap } from "echarts/core"
import ReactDOMServer from "react-dom/server"
import type { Camera } from "src/services/dashboard/cameras"
import type { SchemeBlock, SchemePlace } from "src/services/scheme"
import { type MAP_NAMES, TOKEN } from "src/shared/constants"
import { BlockTooltipContent } from "./block-tooltip-content.tsx"
import { PlaceTooltipContent } from "./place-tooltip-content.tsx"

export const checkMapExists = (mapName: MAP_NAMES): boolean => {
	try {
		return getMap(mapName) !== undefined
	} catch {
		return false
	}
}

export const registerSvgMap = (name: MAP_NAMES, svg: string) => {
	if (checkMapExists(name)) return
	registerMap(name, {
		svg,
	})
}

export function makeTakenRegions(takenPlaces: SchemePlace[]) {
	return takenPlaces.map((place) => ({
		name: `${place?.id}`,
		tooltip: {
			show: true,
			confine: true,
			formatter: (params: { name: string }) => {
				if (place) {
					const element = <PlaceTooltipContent data={place} />
					return ReactDOMServer.renderToStaticMarkup(element).toString()
				}

				return params.name
			},
		},
		itemStyle: {
			color: place?.is_payment_success ? TOKEN.green5 : TOKEN.red5,
			borderRadius: [0, 0, 0, 0],
			borderColor: "#fff",
		},
		emphasis: {
			itemStyle: {
				color: place?.is_payment_success ? TOKEN.green6 : TOKEN.red6,
				borderColor: place?.is_payment_success ? TOKEN.green8 : TOKEN.red8,
				borderWidth: 3,
			},
			disabled: false,
		},
	}))
}

export function makeBlockRegions(blocks: SchemeBlock[]) {
	return blocks.map((block) => ({
		name: `b_${block?.id}`,
		tooltip: {
			show: true,
			confine: true,
			formatter: (params: { name: string }) => {
				if (block) {
					const element = <BlockTooltipContent data={block} />
					return ReactDOMServer.renderToStaticMarkup(element).toString()
				}

				return params.name
			},
		},
		label: {
			show: false,
		},
		itemStyle: {
			color: block?.payments_sum_amount ? TOKEN.cyan5 : TOKEN.orange5,
			borderRadius: [0, 0, 0, 0],
			borderColor: "#fff",
		},
		emphasis: {
			itemStyle: {
				color: block?.payments_sum_amount ? TOKEN.cyan6 : TOKEN.orange6,
				borderColor: block?.payments_sum_amount ? TOKEN.cyan8 : TOKEN.orange8,
				borderWidth: 3,
			},
			label: {
				show: false,
			},
			disabled: false,
		},
	}))
}

export function makeCameraRegions(cameras: Camera[]) {
	return cameras.map((camera) => ({
		name: `c_${camera?.id}`,
		tooltip: {
			show: true,
			confine: true,
			formatter: (params: { name: string }) => {
				if (params.name.startsWith("c")) {
					return camera ? camera?.name : `Camera - ${params.name}`
				}

				return params.name
			},
		},
		itemStyle: {
			color: TOKEN.blue5,
			borderColor: "#fff",
			borderRadius: [
				TOKEN.borderRadius,
				TOKEN.borderRadius,
				TOKEN.borderRadius,
				TOKEN.borderRadius,
			],
		},
		emphasis: {
			itemStyle: {
				color: TOKEN.blue4,
				borderColor: TOKEN.blue6,
				borderWidth: 3,
			},
			disabled: false,
		},
		select: {
			itemStyle: {
				color: "yellow",
			},
		},
	}))
}
