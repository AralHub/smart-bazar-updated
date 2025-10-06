import type { GetParams } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { imagesService } from "./images.service.ts"

const useGetImagesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => imagesService.get(params),
		queryKey: ["images", ...Object.values(params)],
		refetchInterval: (query) => {
			return query.state.status === "error" ? false : 10_000
		},
		enabled: !!params?.camera_id,
	})
}

export { useGetImagesQuery }
