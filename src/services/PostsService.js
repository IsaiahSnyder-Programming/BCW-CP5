import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService {

    async getAll(query = {}) {
        const res = await api.get('api/posts', {params: query})
        logger.log(res.data)
        AppState.posts = res.data.posts
        // NOTE when you get postdata back, save the pages in your AppState (nextPage, previousPage)
        // grab computed() for next and previous
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
        logger.log(postData.likeIds, res.data)
        // NOTE after getting res back, find the old post in the appstate, splice it out, and replace with new one
        // inspire for reference

    }



    // changepage(page)
    // get(page)
    // update posts and pages from there with appstate.stuff thingys
}

export const postsService = new PostsService()