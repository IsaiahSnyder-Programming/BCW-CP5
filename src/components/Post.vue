<template>
  <div class="row d-flex justify-content-center">
    <img :src="post.imgUrl" class="col-12 cover-img">
    <div class="col-12 d-flex flex-column justify-content-center align-items-middle">
        <div class="bg-dark rounded text-center text-light">
            <h3>{{ post.creator.name }}</h3>
            {{ post.body }}
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        return {

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
</style>