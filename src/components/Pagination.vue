<script setup lang="ts">
const props = defineProps({
    currentPage: { type: Number, required: true},
    totalPages: { type: Number, required: true}
})
const emit = defineEmits(['load-new-page'])

</script>

<template>
<div v-if="currentPage!=0 && totalPages!=0" class="flex justify-center items-center">
    <button :disabled="currentPage<=1" @click="emit('load-new-page', currentPage-1)" class="flex justify-end button iconPointer rounded-sm w-56 h-8 mr-2 pr-2">
        <a>Praeitas puslapis</a>
    </button>
    <div class="">
        <a>{{ currentPage }}/{{ totalPages }}</a>
    </div>
    <button :disabled="currentPage>=totalPages" @click="emit('load-new-page', currentPage+1)" class="flex justify-start button iconPointer rounded-sm w-56 h-8 ml-2 pl-2">
        <a>Sekantis puslapis</a>
    </button>
</div>
</template>

<style scoped>

</style>