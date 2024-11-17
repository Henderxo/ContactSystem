<script setup lang="ts">
import { type PropType } from 'vue';
import AccountTableElement from '../elements/AccountTableElement.vue';
import type { Account } from '@/types/Account';
import { useAuthStore } from '@/stores/AuthStore';
const props = defineProps({
    data: {type: Object as PropType<Account[]>, required: true}
})
const AuthStore = useAuthStore()
function Permissions():boolean{
    return AuthStore.currentUser?.expand.permissions_id?.edit_permissions as boolean 
    || AuthStore.currentUser?.expand.permissions_id?.delete_permissions as boolean
}
</script>

<template>
<div style="padding: 5px;" :class="`max-w-full border-b grid gap-4 grid-cols-7`" >
    <div class="col-span-2 ml-2 font-bold">Vardas</div>
    <div class="col-span-2 ml-2 font-bold">El. Paštas</div>
    <div v-if="Permissions()" class="col-span-3 font-bold items-center justify-center flex">Veiksmas</div>
</div>
<div class="data-block align overflow-auto border-l border-r border-b-1 shadow-xl">
    <div v-for="data in data" :key="(data.id as PropertyKey)">
        <AccountTableElement :data="data"></AccountTableElement>
    </div>
</div>
</template>

<style scoped>

</style>