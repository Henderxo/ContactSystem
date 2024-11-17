<script setup lang="ts">
import { type PropType } from 'vue';
import SimpleTableElement from '@/components/elements/SimpleTableElement.vue';
import { useAuthStore } from '@/stores/AuthStore';
const props = defineProps({
    data: {type: Object as PropType<any[]>, required: true}
})
const AuthStore = useAuthStore()
function Permissions():boolean{
    return AuthStore.currentUser?.expand.permissions_id?.edit_structure as boolean || AuthStore.currentUser?.expand.permissions_id?.delete_structure as boolean
}
</script>

<template>

<div style="padding: 5px;" :class="`max-w-full border-b grid gap-4 grid-cols-6`" >
    <div class="col-span-4 ml-10 font-bold">Pavadinimas</div>
    <div v-if="Permissions()" class="col-span-2 font-bold items-center justify-center flex">Veiksmas</div>
</div>
<div class="data-block align overflow-auto border-l border-r border-b-1 shadow-xl">
    <div v-for="data in data" :key="data.id">
        <SimpleTableElement :data="data"></SimpleTableElement>
    </div>
</div>


</template>

<style scoped>

</style>