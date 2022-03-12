<template>
<!-- NOTE Card -->
  <div class="row d-flex justify-content-center bg-dark rounded-2">

      <!-- NOTE Creator Stuffs -->
      <div
        class="selectable d-flex align-items-center m-2"
        @click="goTo('Profile')"
    >
        <img :src="post.creator.picture" class="profile-pic rounded-circle m-1">
        <h5 class="text-dark">
            <b>{{ post.creator.name }}</b>
        </h5>
    </div>

    <!-- NOTE Post Body -->
    <div class="col-12 d-flex flex-column justify-content-center align-items-middle">
        <div class="bg-light rounded text-start text-dark p-3">
            <h4>{{ post.body }}</h4>
        </div>
    </div>

    <!-- NOTE Image logic -->
    <div v-if="post.imgUrl">
        <div class="col-12">
            <img class="cover-img" :src="post.imgUrl" alt="" />
        </div>
    </div>
    <div v-else>
        <div class="col-12">
            <img class="no-cover-img" src="" alt="" />
        </div>
    </div>

<!-- NOTE Likes and Delete -->
    <div class="d-flex w-100 justify-content-between">
        <div class="row mx-2 d-flex align-items-center">
            <div
                class="col-6 btn btn-outline-primary"
                @click="like"
            >
                <i class="mdi mdi-heart"></i>
            </div>
            <div class="col-4">
                <h4 class="text-primary mt-1">{{ post.likes.length }}</h4>
            </div>
        </div>
        
        <div
            v-if="account.id == post.creatorId"
            class="btn btn-outline-danger"
            @click="remove"
        >
            <i class="mdi mdi-delete"></i>
        </div>  
    </div>

  </div>
</template>

<script>
import { computed, reactive } from '@vue/reactivity';
import { useRouter } from "vue-router";
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { postsService } from '../services/PostsService';
import { onMounted } from '@vue/runtime-core';
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();
        return {
            goTo(page) {
                router.push({
                    name: page,
                    params: {id: props.post.creatorId}
                })
            },
            account: computed(() => AppState.account),

            async remove() {
                try {
                    if(await Pop.confirm) {
                        await postsService.remove(props.post.id)
                        Pop.toast("Deleted")
                    }
                } catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            },

            async like() {
                try {
                    await postsService.like(props.post)
                    Pop.toast("Liked")
                } catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.cover-img {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
    justify-content: center;
}
.no-cover-img {
    width: 80vw;
    height: 0vw;
}
.profile-pic {
    height: 40px;
    width: 40px;
}
</style>