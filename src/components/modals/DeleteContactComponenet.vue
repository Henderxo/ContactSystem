<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';
import Input from '../Input.vue';
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import { onMounted, ref } from 'vue';
import { createContact } from '@/validation/validationShemas';
import  FileInput  from '@/components/FileInput.vue'
import { useCollectionsUpdater } from '@/composables/postData';
import { useCollections } from '@/composables/getData';
import { type Contact } from '@/types/Contact';
import { useNotificationStore } from '@/stores/NotificationStore';
import Modal from '../Modal.vue';

const props = defineProps({
    id: {type: String}
})

onMounted(async ()=>{
    await getCollection({collectionName: `employees`, id: props.id, expand: 'company_id,office_id,division_id,department_id,group_id'})
})
const {deleteModalData} = useCollectionsUpdater(`collections/employees/records/${props.id}`)
const {data, getCollection, isLoading} = useCollections()

function onSubmit(){
    deleteModalData(`Kontaktas ${data.value.name} ${data.value.surname} sėkmingai panaikintas`)
}


</script>

<template>
<div id="createModal" class="modalBlock p-10 flex flex-col">
    <div class="flex justify-start w-full">
        <a class="text-2xl">Ar tinkrai norite ištrinti kontaktą?</a>
    </div>
    <div class="flex justify-start w-full mt-5">
        <a class="">Vardas ir pavardė: {{ (data as Contact).name }} {{ (data as Contact).surname }}</a>
    </div> 
    <div class="flex justify-start w-full mt-1">
        <a class="">El. paštas: {{ (data as Contact).email }}</a>
    </div>  
    <div class="flex justify-start w-full mt-1">
        <a class="">Pozicija: {{ (data as Contact).position }}</a>
    </div>  
    <div class="flex justify-start w-full mt-1">
        <a class="">Adresas: {{ (data as Contact).expand?.office_id?.name }}</a>
    </div> 
    <div class="flex justify-end w-full mt-12">
        <button @click="onSubmit()" class="yes rounded-xl text-2xl mr-2">Taip</button> 
        <button @click="useModalStore().ResetModal()" class="no rounded-xl text-2xl ml-2">Ne</button>
    </div> 
</div>

</template>

<style scoped>
.modalBlock{
    width: 800px;
    height: 300px;
}
img{ 
    border: solid;
    border-color: #0054A6;
    background-color: #0054A6;
    color:white;
}
button{
    background-color: transparent;
    width: 80px;
}
button:hover.yes{
    color: #A61A11;
    border: solid;
    border-color: #A61A11;
}
button:hover.no{
    color:#0054A6;
    border: solid;
    border-color: #0054A6;
}

</style>