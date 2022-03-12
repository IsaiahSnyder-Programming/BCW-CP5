import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService {

    async getAll(query = {}) {
        const res = await api.get('api/posts', {params: query})
        logger.log(res.data.posts)
        AppState.posts = res.data.posts
    }

    async create(postData) {
        const res = await api.post('api/posts', postData)
        logger.log(res.data)
        AppState.posts.unshift(res.data)
    }

    async remove(id) {
        const res = await api.delete('api/posts/' + id)
        logger.log(res.data)
        AppState.posts = AppState.posts.filter(p => p.id != id)
    }

    // Need Help With Likes
    async like(postData) {
        const res = await api.put('api/posts/' + postData.id, postData)
        logger.log(postData.id, res.data)
    }
}

export const postsService = new PostsService()