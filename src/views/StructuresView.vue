<script  setup lang="ts">
import {ref, defineAsyncComponent,onMounted} from 'vue'
import { useAuthStore } from '@/stores/AuthStore';
const type = ref('Offices')
function changeType(newType: String){
    type.value = newType as string
}
const asyncComponents = {
 Offices: defineAsyncComponent(() => import('@/views/structures/OfficeList.vue')),
 Divisions: defineAsyncComponent(() => import('@/views/structures/DivisionList.vue')),
 Departments: defineAsyncComponent(() => import('@/views/structures/DepartmentsList.vue')),
 Groups: defineAsyncComponent(() => import('@/views/structures/GroupsList.vue')),
}
</script>

<template>
<div class="block items-center justify-center mx-auto max-w-6xl">
    <h1 style="padding: 20px;" class=" flex-1 text-5xl">Struktūra</h1>
    <div v-if="useAuthStore().currentUser?.expand.permissions_id?.edit_structure" class="flex">
        <div @click=""style="background-color: #0054A6; width: 50px; height: 50px;" class="iconPointer ml-6 rounded-full flex justify-center items-center">
            <img src="@/assets/img/Add_contact.png">
        </div>
        <div class="text-xl flex items-center justify-center pl-10">Pridėti naują struktūrą: </div>
    </div>
    <div style="padding: 5px;" class="flex" >
        <button :class="{current: type =='Offices'}" @click="changeType('Offices')" class="button text-xl w-32 h-10 m-2 rounded-xl">Ofisai</button>
        <button :class="{current: type == 'Divisions'}" @click="changeType('Divisions')" class="button text-xl w-32 h-10 m-2 rounded-xl">Padaliniai</button>
        <button :class="{current: type == 'Departments'}" @click="changeType('Departments')" class="button text-xl w-32 h-10 m-2 rounded-xl">Skyriai</button>
        <button :class="{current: type=='Groups'}" @click="changeType('Groups')" class="button text-xl w-32 h-10 m-2 rounded-xl">Grupės</button>
    </div>
    <KeepAlive>
        <component :is="asyncComponents[type]" ></component>
    </KeepAlive>
   
</div>
</template>

<style scoped>


</style>