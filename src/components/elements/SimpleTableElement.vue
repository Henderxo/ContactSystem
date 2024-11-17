<script setup lang="ts">
import { type PropType} from 'vue'
import { useAuthStore } from '@/stores/AuthStore';
const props = defineProps({
    data: {type: Object as PropType<any>, required: true}
})
const AuthStore = useAuthStore()
</script>

<template>
    <div class="text max-w-full border-b grid grid-cols-6 gap-4">
        <div class="col-span-4 ml-10 flex items-center h-12"><a class="line-clamp-1">{{ data.name }}</a></div>
        <div class="col-span-2 flex iterms-center justify-center">
            <button v-if="AuthStore.currentUser?.expand.permissions_id?.edit_structure" class="button rounded-xl mt-2 mb-2 w-64">Redaguoti</button>   
            <button v-if="AuthStore.currentUser?.expand.permissions_id?.delete_structure" class="button rounded-xl delete mt-2 ml-2 mb-2 w-36 ">Ištrinti</button>
        </div>
    </div>
</template>
<style scoped>
.text{
    word-break: break-all; 
    overflow-wrap: break-all; 
}
</style>