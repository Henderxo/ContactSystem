<script setup lang="ts">
import GridElement from '@/components/elements/GridElement.vue';
import { type Contact } from '@/types/Contact';
import type { PropType } from 'vue';
const props = defineProps({
    contacts: {type: Object as PropType<Contact[]>, required: true}
})
</script>

<template>
<div class="data-block overflow-auto grid grid-cols-4 gap-10 justify-items-center">
        <div v-for="contact in contacts" :key="(contact.id as string)">
            <GridElement :contact="contact"></GridElement>
        </div>
    </div>
</template>

<style scoped>


</style>