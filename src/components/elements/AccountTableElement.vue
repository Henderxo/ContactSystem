<script setup lang="ts">
import type { Account } from '@/types/Account';
import { type PropType} from 'vue'
import { useAuthStore } from '@/stores/AuthStore';
const props = defineProps({
    data: {type: Object as PropType<Account>, required: true}
})
const AuthStore = useAuthStore()
</script>

<template>
    <div class="text max-w-full border-b grid grid-cols-7 gap-4 ">
        <div class=" col-span-2 ml-3 flex items-center h-12"><a class="line-clamp-1">{{ data.name !== '' ? data.name??'------Hidden-------':'N/A' }}</a></div>
        <div class=" col-span-2 ml-2 flex items-center h-12"><a class="line-clamp-1">{{ data.email??'------Hidden-------' }}</a></div>
        <div class="col-span-3 flex items-center justify-center">
            <button v-if="AuthStore.currentUser?.expand.permissions_id?.edit_permissions" class="button rounded-xl mt-2 mb-2 w-48">Keisti leidimus</button> 
            <button v-if="AuthStore.currentUser?.expand.permissions_id?.edit_permissions" class="button rounded-xl mt-2 ml-2 mb-2 w-48">Modifikuoti</button>   
            <button v-if="AuthStore.currentUser?.expand.permissions_id?.delete_permissions" class="button rounded-xl delete mt-2 ml-2 mb-2 w-24 ">Ištrinti</button>
        </div>
    </div>
</template>
<style scoped>
.text{
    word-break: break-all; 
    overflow-wrap: break-all; 
}
</style>