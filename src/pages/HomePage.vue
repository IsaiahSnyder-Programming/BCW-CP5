<template>
  <div class="home flex-grow-1 d-flex flex-column text-light">
    <div class="row">
      <div class="col-12">
        <Search />
      </div>
    </div>

    <CreatePost v-if="account.id == profile.id"/>

    <div class="row px-5 mb-5 pb-5 justify-content-center">
      <div v-for="p in posts" :key="p.id" class="col-md-8 m-3">
        <Post :post="p" />
      </div>
    </div>
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
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account)
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
