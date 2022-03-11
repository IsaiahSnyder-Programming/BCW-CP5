<template>
  <div class="home flex-grow-1 d-flex flex-column text-light">

    <div class="row d-flex justify-content-between">
      <div class="col-4">
        <Search />
      </div>
      <div class="col-1 bg-dark">
        
        <i
          v-if="account.id"
          data-bs-toggle="modal"
          data-bs-target="#create-post"
          class="mdi mdi-pencil selectable"
        ></i>
      </div>
    </div>

    <div class="row px-5 mb-5 pb-5 justify-content-center">
      <div v-for="p in posts" :key="p.id" class="col-md-8 m-3">
        <Post :post="p" />
      </div>
    </div>

      <Modal id="create-post">
        <template #title> Create Post </template>
        <template #body> <CreatePost /> </template>
      </Modal>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll();
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error")
      }
    });
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
