<template>
  <div class="home flex-grow-1 d-flex flex-column text-light">

    <div class="row d-flex justify-content-between">
      <div class="col-4 bg-dark">
        <Search />
      </div>
      <div class="col-7 bg-dark"></div>
      <div class="col-1 bg-dark d-flex align-items-center">
        <i
          v-if="account.id"
          data-bs-toggle="modal"
          data-bs-target="#create-post"
          class="mdi mdi-pencil selectable"
        >Create New Post</i>
      </div>
    </div>

    <div class="row d-flex justify-content-around">
      <div class="col-2 d-flex justify-content-end">
        <h2 
          class="text-dark"
          @click="pageTurn()"
          >
          <i class="mdi mdi-arrow-left selectable"></i>
        </h2>
      </div>

      <div class="col-6">
        <h2 class="text-dark"></h2>
      </div>

<!-- Take in whole string from appstate and put into pageTurn(nextPage) -->
      <div class="col-2 d-flex justify-content-start">
        <h2 
          class="text-dark"
          @click="pageTurn()"
          >
          <i class="mdi mdi-arrow-right selectable"></i>
        </h2>
      </div>

    </div>

    <div class="row px-5 mb-5 pb-5 justify-content-center">
      <div v-for="p in posts" :key="p.id" class="col-md-8 mt-2">
        <Post :post="p" />
      </div>
    </div>

    <div class="row px-5 mb-5 justify-content-center">
      <div class="row px-5 mb-5 pb-5 justify-content-center">
        <div v-for="p in products" :key="p.id" class="col-md-4 mx-5">
          <Product :product="p" />
        </div>
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
import { productsService } from '../services/ProductsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll();
        await productsService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error")
      }
    });
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      products: computed(() => AppState.products)
    }
  },

  async pageTurn(page) {
    // Pass to service
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
