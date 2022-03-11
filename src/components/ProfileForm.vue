<template>
  
</template>

<script>
import { watchEffect } from '@vue/runtime-core';
import { AppState } from '../AppState';
export default {
    setup() {
        const editable = ref({});
        watchEffect(() => {
            editable.value = AppState.account
        })
        return {
            editable,
            
        }
    }
}
</script>

<style>

</style>