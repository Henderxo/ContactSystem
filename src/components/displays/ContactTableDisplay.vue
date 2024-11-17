<script setup lang="ts">
import TableElement from '@/components/elements/TableElement.vue';
import { type Contact } from '@/types/Contact';
import type { PropType } from 'vue';
const props = defineProps({
    contacts: {type: Object as PropType<Contact[]>, required: true}
})
</script>

<template>

<div class=" border-l border-r border-b-1 shadow-xl">
        <div  style="padding: 5px; max-width: 1400px;" class="max-w-full border-b grid grid-cols-5 gap-4 justify-items-center font-bold" >
            <div class="">Vardas ir pavardė</div>
            <div class="">Pozicija</div>
            <div class="">Telefono numeris</div>
            <div class="">Elektroninis paštas</div>
            <div class="">Adresas</div>
        </div>
        <div class="data-block overflow-auto">
            <div class="" v-for="contact in contacts" :key="(contact.id as string)">
            <TableElement :contact="contact"></TableElement>
            </div>
        </div>
    </div>
</template>

<style scoped>


</style>