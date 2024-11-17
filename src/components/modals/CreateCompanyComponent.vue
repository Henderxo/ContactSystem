<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';
import Input from '../Input.vue';
import { Form } from 'vee-validate';
import { createCompany } from '@/validation/validationShemas';
import { useCollectionsUpdater } from '@/composables/postData';

const {postModalData} = useCollectionsUpdater('collections/companies/records')

function onSubmit(values: any){
    postModalData({name: values.company}, `Įmonė ${values.company} sėkmingai sukurta`)
}

</script>

<template>
<div id="createModal" class="modalBlock p-2 flex  w-full">
    <div class="flex w-full ml-10">
        <div class="w-full">
            <Form @submit="onSubmit" :validation-schema="createCompany">
                <div class="flex flex-col mr-2 w-full flex-col">
                    <div class="mt-12">
                        <a class="text-2xl">Pridėti naują įmonę:</a>
                    </div>
                    <div class="flex mt-6">
                        <Input class=" mt-2"  :name="'company'" :label="'Įmonės pavadinimas:'" :place-holder="'Įveskite pavadinimą...'"/>
                    </div>
                    <div class="mt-3 ">
                        <button type="submit" class="button rounded-sm w-full h-12"><a class="text-xl">Pridėti</a></button>
                    </div>
                </div>
            </Form>
        </div>
        <div class=" justify-center mt-2 mr-2">
            <img @click="useModalStore().ResetModal()"  class=" p-2 iconPointer w-12 h-12 rounded-full rotate-45" src="@/assets/img/Add_contact.png">
        </div> 
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
</style>