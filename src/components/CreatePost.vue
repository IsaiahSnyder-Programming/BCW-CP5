<template>
    <form class="row bg-grey darken-20 justify-content-center elevation-3 p-2 m-5" @submit.prevent="createProject">
        <div class="col-md-4 mb-2">
            <label class="form-label">Post Title</label>
            <input
                v-model="state.editable.title"
                required 
                type="text"
                class="form-control"
                aria-describedby="helpId">
        </div>
    </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { logger } from '../utils/Logger'
export default {
    setup() {
        const state = reactive({
            editable: {},
        })
        return {
            state,
            async createProject() {
                try {
                    logger.log('createProject Works')
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