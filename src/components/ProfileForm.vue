<template>
  <form class="d-flex flex-column p-5 bg-dark">
      <label>name</label>
      <input v-model="editable.name" type="text">
      <label>picture</label>
      <input v-model="editable.picture" type="text">
      <label>coverImg</label>
      <input v-model="editable.coverImg" type="text">
      <button type="button" class="btn btn-info" @click="update">Submit</button>
  </form>
</template>

<script>
import { ref, watchEffect } from '@vue/runtime-core';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService';
import Pop from '../utils/Pop';
export default {
    setup() {
        const editable = ref({});
        watchEffect(() => {
            editable.value = AppState.account
        })
        return {
            editable,
            async update() {
                try {
                    await accountService.update(editable.value)
                } catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style>

</style>