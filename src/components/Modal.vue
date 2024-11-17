<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';
const Modals = useModalStore()

</script>

<template>

<div @click.self="Modals.ResetModal()" v-if="Modals.CurrentModal.component" class="modal-bakcground absolute flex items-center justify-center w-screen h-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <component :is="Modals.CurrentModal.component" v-bind="Modals.CurrentModal.componentProps"></component>
</div>

</template>

<style scoped>
.modal-bakcground{
    background-color: rgba(22,22,22,0.5);
}
</style>