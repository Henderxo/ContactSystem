<script setup lang="ts">
import { type PropType } from 'vue';
import type { Contact } from '@/types/Contact';
import { useRouter } from 'vue-router';
const props = defineProps({
    contact: {type: Object as PropType<Contact>, required: true}
})
const router = useRouter()
</script>

<template>

<div @click="router.push({name: 'contactDetail', params: {id: (contact.id as string)}})" style="padding-top: 5px; padding-bottom: 5px; max-width: 1400px; max-height: 100px"  class=" text flex text-center border-b grid grid-cols-5 gap-4 " >
    <div class="pl-2 pr-2 line-clamp-4"><a>{{ contact.name }} {{ contact.surname }}</a></div>
    <div class="pl-2 pr-2 line-clamp-4"><a>{{ contact.position }}</a></div>
    <div class="pl-2 pr-2 line-clamp-4"><a>{{ contact.phone_number }}</a></div>
    <div class="pl-2 pr-2 line-clamp-4"><a>{{ contact.email }}</a></div>
    <div class="pl-2 pr-2 line-clamp-4"><a>{{ contact.expand?.office_id?.street }} {{ contact.expand?.office_id?.street_number }}</a></div>
</div>

</template>

<style scoped>
.text{
    word-break: break-word; 
    overflow-wrap: break-word; 
}
</style>