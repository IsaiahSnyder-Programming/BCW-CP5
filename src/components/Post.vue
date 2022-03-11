<template>
  <div class="row d-flex justify-content-center">
    <img :src="post.imgUrl" class="col-12 cover-img">
    <div class="col-12 d-flex flex-column justify-content-center align-items-middle">
        <div class="bg-dark rounded text-center text-light">
            <h3>{{ post.creator.name }}</h3>
            {{ post.body }}
        </div>
    </div>
    <div class="d-flex w-100 justify-content-between">
        <div
            v-if="account.id == post.creatorId"
            class="btn btn-outline-danger"
            @click="remove"
        >
            <i class="mdi mdi-delete"></i>
        </div>
        <div
            class="selectable d-flex align-items-center"
            @click="goTo('Profile')"
        >
            <p class="text-dark">
                {{ post.creator.name }}
            </p>
        </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRouter } from "vue-router";
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { postsService } from '../services/PostsService';
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
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.cover-img {
    background-size: cover;
    background-position: center;
    width: 80vw;
    height: 30vw;
    object-fit: cover;
}
.profile-pic {
    height: 40px;
    width: 40px;
}
</style>