<template>
  <form class="row form-group justify-content-between p-3" @submit.prevent="search">
      <input v-model="searchTerm" type="text" class="col-9 rounded-2" placeholder="search...">
      <button class="btn btn-outline-primary col-3 rounded-2">search</button>
  </form>
</template>


// Search for accounts, not for posts
<script>
import { ref } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup() {
    const searchTerm = ref("")
    return {
      searchTerm,
      async search() {
        try {
          await postsService.getAll({query: searchTerm.value})
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
      }
    }
  }
}
</script>

<style>

</style>