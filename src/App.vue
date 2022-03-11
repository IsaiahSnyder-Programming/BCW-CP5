<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'
export default {
  name: 'App',
  setup() {
    const router = useRouter();
    return {
      
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
