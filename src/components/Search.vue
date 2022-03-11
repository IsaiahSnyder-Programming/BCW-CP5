<template>
  <form class="row form-group" @submit.prevent="search">
      <input v-model="searchTerm" type="text" class="col-12" placeholder="search...">
  </form>
</template>


// Search for accounts, not for posts
<script>
export default {

}
</script>

<style>

</style>