import { MAP_NAMES } from "src/shared/constants"

// import AmiwdaryaBazarSvg from "./amiwdarya-bazar/amiwdarya-bazar.svg?raw"
//
// import BeruniyBazarSvg from "./beruniy-bazar/beruniy-bazar.svg?raw"
//
// import EllikqalaBazarSvg from "./ellikqala-bazar/ellikqala-bazar.svg?raw"
//
// import KegeyliBazarSvg from "./kegeyli-bazar/kegeyli-bazar.svg?raw"
// import XalqabadBazarSvg from "./kegeyli-bazar/xalqabad-bazar.svg?raw"

// import NokisGoneKritiy1Svg from "./nokis-bazar/gone-kritiy-1.svg?raw"
// import NokisGoneKritiy2Svg from "./nokis-bazar/gone-kritiy-2.svg?raw"
// import NokisBazarSvg from "./nokis-bazar/nokis-bazar.svg?raw"
// import NokisBazar1BlockSvg from "./nokis-bazar/nokis-bazar-1-block.svg?raw"
// import NokisBazar2BlockSvg from "./nokis-bazar/nokis-bazar-2-block.svg?raw"
// import NokisBazar3BlockSvg from "./nokis-bazar/nokis-bazar-3-block.svg?raw"
// import NokisBazar4BlockSvg from "./nokis-bazar/nokis-bazar-4-block.svg?raw"
// import NokisBazar5BlockSvg from "./nokis-bazar/nokis-bazar-5-block.svg?raw"
// import NokisBazar6BlockSvg from "./nokis-bazar/nokis-bazar-6-block.svg?raw"
// import NokisBazarJaymaFilialSvg from "./nokis-bazar/nokis-bazar-jayma-filial-block.svg?raw"
// import NokisTazaKritiySvg from "./nokis-bazar/taza-kritiy.svg?raw"

// import NokisRayonBazar from "./nokis-rayon-bazar/nokis-rayon-bazar.svg?raw"
//
// import QanlikolBazarSvg from "./qanlikol-bazar/qanlikol-bazar.svg?raw"
//
// import QaraozekBazarSvg from "./qaraozek-bazar/qaraozek-bazar.svg?raw"
//
// import QoniratBazarSvg from "./qonirat-bazar/qonirat-bazar.svg?raw"
//
// import ShimbayBazarSvg from "./shimbay-bazar/shimbay-bazar-1.svg?raw"
// import ShimbayBazar2Svg from "./shimbay-bazar/shimbay-bazar-2.svg?raw"
//
// import ShomanayBazarSvg from "./shomanay-bazar/shomanay-bazar.svg?raw"
//
// import TaxtakopirBazarSvg from "./taxtakopir-bazar/taxtakopir-bazar.svg?raw"
//
// import TortkulBazarSvg from "./tortkul-bazar/tortkul-bazar.svg?raw"

export { default as QRSvg } from "./QR-min.svg?raw"

export const MapSvg = {
	[MAP_NAMES.NOKIS]: () => import("./nokis-bazar/nokis-bazar.svg?raw"),
	[MAP_NAMES.NOKIS_1_BLOCK]: () =>
		import("./nokis-bazar/nokis-bazar-1-block.svg?raw"),
	[MAP_NAMES.NOKIS_2_BLOCK]: () =>
		import("./nokis-bazar/nokis-bazar-2-block.svg?raw"),
	[MAP_NAMES.NOKIS_3_BLOCK]: () =>
		import("./nokis-bazar/nokis-bazar-3-block.svg?raw"),
	[MAP_NAMES.NOKIS_4_BLOCK]: () =>
		import("./nokis-bazar/nokis-bazar-4-block.svg?raw"),
	[MAP_NAMES.NOKIS_5_BLOCK]: () =>
		import("./nokis-bazar/nokis-bazar-5-block.svg?raw"),
	[MAP_NAMES.NOKIS_6_BLOCK]: () =>
		import("./nokis-bazar/nokis-bazar-6-block.svg?raw"),
	[MAP_NAMES.NOKIS_JAYMA_FILIAL]: () =>
		import("./nokis-bazar/nokis-bazar-jayma-filial-block.svg?raw"),
	[MAP_NAMES.NOKIS_TAZA_KRITIY]: () =>
		import("./nokis-bazar/taza-kritiy.svg?raw"),
	[MAP_NAMES.NOKIS_GONE_KRITIY_1]: () =>
		import("./nokis-bazar/gone-kritiy-1.svg?raw"),
	[MAP_NAMES.NOKIS_GONE_KRITIY_2]: () =>
		import("./nokis-bazar/gone-kritiy-2.svg?raw"),
	[MAP_NAMES.XOJELI]: () =>
		import("./xojeli-bazar/xojeli-bazar.svg?raw"),
	[MAP_NAMES.TAQIYATAS]: () =>
		import("./taqiyatas-bazar/taqiyatas-bazar.svg?raw"),
	[MAP_NAMES.NOKIS_RAYON]: () =>
		import("./nokis-rayon-bazar/nokis-rayon-bazar.svg?raw"),
	[MAP_NAMES.KEGEYLI]: () => import("./kegeyli-bazar/kegeyli-bazar.svg?raw"),
	[MAP_NAMES.XALQABAD]: () => import("./kegeyli-bazar/xalqabad-bazar.svg?raw"),
	[MAP_NAMES.BOZATAW]: null,
	[MAP_NAMES.QARAOZEK]: () => import("./qaraozek-bazar/qaraozek-bazar.svg?raw"),
	[MAP_NAMES.TAXTAKOPIR]: () =>
		import("./taxtakopir-bazar/taxtakopir-bazar.svg?raw"),
	[MAP_NAMES.SHIMBAY]: () => import("./shimbay-bazar/shimbay-bazar-1.svg?raw"),
	[MAP_NAMES.SHIMBAY_2]: () =>
		import("./shimbay-bazar/shimbay-bazar-2.svg?raw"),
	[MAP_NAMES.QONIRAT]: () => import("./qonirat-bazar/qonirat-bazar.svg?raw"),
	[MAP_NAMES.QANLIKOL]: () => import("./qanlikol-bazar/qanlikol-bazar.svg?raw"),
	[MAP_NAMES.SHOMANAY]: () => import("./shomanay-bazar/shomanay-bazar.svg?raw"),
	[MAP_NAMES.BERUNIY]: () => import("./beruniy-bazar/beruniy-bazar.svg?raw"),
	[MAP_NAMES.ELLIKQALA]: () =>
		import("./ellikqala-bazar/ellikqala-bazar.svg?raw"),
	[MAP_NAMES.TORTKUL]: () => import("./tortkul-bazar/tortkul-bazar.svg?raw"),
	[MAP_NAMES.AMIWDARYA]: () =>
		import("./amiwdarya-bazar/amiwdarya-bazar.svg?raw"),
	[MAP_NAMES.MOYNAQ]: null,
}
