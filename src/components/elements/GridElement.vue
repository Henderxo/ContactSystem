<script setup lang="ts">
import { type PropType, readonly } from 'vue';
import type { Contact } from '@/types/Contact';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import EditContactComponenet from '../modals/EditContactComponenet.vue';
import { type ModalState } from '@/types/ModalState';
import DeleteContactComponenet from '../modals/DeleteContactComponenet.vue';
const props = defineProps({
    contact: {type: Object as PropType<Contact>, required: true},
})
const ModalStore = useModalStore()
const api = global.api
const router = useRouter()

function OpenModal(modalOptions :ModalState){
    useModalStore().SetModal({component: modalOptions.component, componentProps: modalOptions.componentProps})
}
</script>
<template>

<div @click="router.push({name: 'contactDetail', params: {id: (contact.id as string)}})" style="padding: 15px; width: 315px; height: 225px; overflow: hidden;  text-overflow: ellipsis;" class="border-r border-b-1 shadow-xl">
    <div>
        <div class="flex">
            <img class="rounded-full" v-if="props.contact.photo" :src="`${api}files/${props.contact.collectionId}/${props.contact.id}/${props.contact.photo}`" style="width: 50px; height: 50px">
            <img class="rounded-full" v-else src="@/assets/img/User_icon_2.png" style="width: 50px; height: 50px">
            <div style="padding-left: 10px;" class="truncate">
                <a class="text-lg "><b>{{ contact.name }} {{ contact.surname }}</b><br></a>
                <a class="text-xs">Position: {{ contact.position }}</a>
            </div>
        </div>
        <div class="mt-2" style="padding-top: 10px; padding-left: 5px; text-overflow: ellipsis">
            <div class="truncate">Telefonas nr: {{ contact.phone_number }}</div>
            <div class="truncate">El. paštas: {{ contact.email}}</div>
            <div class="truncate">Adresas: {{ contact.expand?.office_id?.street }} {{ contact.expand?.office_id?.street_number}}</div>         
        </div>
        <div class="flex mt-2">
            <div v-if="useAuthStore().currentUser?.expand.permissions_id?.edit_employees" @click.prevent.stop="OpenModal({component: EditContactComponenet, componentProps: {id:contact.id}})" style="background-color: #0054A6; width: 50px; height: 50px;" class="iconPointer ml-6 rounded-full flex justify-center items-center">
                <img  src="@/assets/img/Edit_icon.png">
            </div>
            <div v-if="useAuthStore().currentUser?.expand.permissions_id?.delete_employees" @click.prevent.stop="OpenModal({component: DeleteContactComponenet, componentProps: {id:contact.id}})" style="background-color: #A61A11; width: 50px; height: 50px;" class="iconPointer ml-6 rounded-full flex justify-center items-center">
                <img src="@/assets/img/Delete_icon.png">
            </div>
        </div>
    </div>
</div>

</template>

<style scoped>
.truncate {   
    white-space: nowrap;  
    overflow: hidden;          
    text-overflow: ellipsis; 
    max-width: 340px;
}
</style>