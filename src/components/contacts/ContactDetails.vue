<script setup lang="ts">
import type { Contact } from '@/types/Contact';
import type { PropType } from 'vue';
const props = defineProps({
    contact: {type: Object as PropType<Contact>, required: true}
})
const api = global.api
</script>

<template>
<div style="height: 600px;" class="block breakText align border-l border-r border-b-1 shadow-xl">
    <div class="flex m-5">
        <img class="rounded-full" v-if="props.contact.photo" :src="`${api}files/${props.contact.collectionId}/${props.contact.id}/${props.contact.photo}`" style="width: 100px; height: 80px">
        <img class="rounded-full" v-else src="@/assets/img/User_icon_2.png" style="width: 100px; height: 80px">
        <div style="padding-left: 10px;">
            <a class="text-4xl line-clamp-1"><b>{{ contact?.name }} {{ contact?.surname }}</b><br></a>
            <a class="text-2xl line-clamp-1">Position: {{ contact?.position }}</a>
        </div>   
    </div>
    <div class="ml-10">
        <div class="max-w-full border-b grid grid-cols-2 gap-4  text-2xl">
            <div class="">Kontaktinės detalės</div>
            <div class="">Kompanijos detalės</div>
        </div>
        <div class="max-w-full grid grid-cols-2 gap-4 text-xl mt-4">
            <div>
                <a class="h-14 mt-5 breakText line-clamp-2">Elektroninis paštas: {{ contact?.email }}</a>
                <p class="h-14 mt-5 breakText line-clamp-2">Telefono numeris: {{ contact?.phone_number }}</p>
            </div>
            <div class="">
                <p class="h-14 mt-5 breakText line-clamp-2">Kompanija: {{ contact?.expand?.company_id?.name??"--------------------" }}</p>
                <p class="h-14 mt-5 breakText line-clamp-2">Būstinė: {{ contact?.expand?.office_id?.country }} {{ contact?.expand?.office_id?.city }} {{ contact?.expand?.office_id?.street }} {{ contact?.expand?.office_id?.street_number }}</p>
                <p class="h-14 mt-5 breakText line-clamp-2">Padalinys: {{ contact?.expand?.department_id?.name??"--------------------" }}</p>
                <p class="h-14 mt-5 breakText line-clamp-2">Skyrius: {{ contact?.expand?.division_id?.name??"--------------------" }}</p>
                <p class="h-14 mt-5 breakText line-clamp-2">Grupė: {{ contact?.expand?.group_id?.name??"--------------------" }}</p>
            </div>
        </div>
    </div>
    
</div>

</template>

<style scoped>

.breakText{
    word-break: break-all; 
    overflow-wrap: break-all; 
}
</style>