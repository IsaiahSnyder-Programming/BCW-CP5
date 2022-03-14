<template>
  <div class="row d-flex justify-content-center mx-5 bg-dark rounded-2">
      <h1 class="text-light"></h1>
      <img :src="product.tall" class="product-pic">
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        return {
            products: computed(() => AppState.products)
        }
    }
}
</script>

<style>
.product-pic {
    width: 30vw;
    height: 30vw;
}
</style>