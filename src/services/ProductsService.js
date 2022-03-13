import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProductsService {
    async getAll() {
        const res = await api.get('api/ads')
        logger.log('Ads getAll', res.data)
        AppState.products = res.data
    }
}

export const productsService = new ProductsService()