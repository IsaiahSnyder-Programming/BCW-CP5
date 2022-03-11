<template>
    <form class="row bg-grey darken-20 justify-content-center elevation-3 p-2 m-5" @submit.prevent="createProject">

        <div class="col-md-4 mb-2">
            <label class="form-label"><b>Post Title</b></label>
            <input
                v-model="state.editable.title"
                required 
                type="text"
                class="form-control"
                aria-describedby="helpId">
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>Image</b> (optional)</label>
            <input
                v-model="state.editable.postImgs"
                required
                type="text"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-12 d-flex justify-content-end">
            <button class="btn btn-primary">create</button>
        </div>
    </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { postsService } from '../services/PostsService'
export default {
    setup() {
        const state = reactive({
            editable: {},
        })
        return {
            state,
            async createProject() {
                try {
                    const safeUrlArray = state.editable.postImgs
                        .split(",")
                        .map((url) => url.trim())
                        state.editable.postImgs = safeUrlArray

                        await postsService.create(state.editable)
                        state.editable = {}
                } catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style>

</style>