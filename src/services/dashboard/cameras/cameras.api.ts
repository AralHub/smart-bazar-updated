import type { GetParams } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { camerasService } from "./cameras.service.ts"

const useGetCamerasQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => camerasService.get(params),
		queryKey: ["cameras", ...Object.values(params)]
	})
}

export { useGetCamerasQuery }
