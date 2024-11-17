<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';
import Input from '../Input.vue';
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import { ref } from 'vue';
import { createContact } from '@/validation/validationShemas';
import  FileInput  from '@/components/FileInput.vue'
import { useCollectionsUpdater } from '@/composables/postData';

const {postModalData} = useCollectionsUpdater('collections/employees/records')

function onSubmit(values: any){
    postModalData({name: values.name, surname: values.surname, 
        email: values.email, phone_number: values.phone, position: values.position,
        company_id: values.company, office_id: values.office, division_id: values.division, 
        department_id: values.department, group_id: values.group, photo: values.photo
    }, `Kontaktas ${values.name} ${values.surname} sėkmingai sukurtas`)
}
const companyValue = ref<String>('')
const officeValue = ref<String>('')
const divisionValue = ref<String>('')
const departmentValue = ref<String>('')
const groupValue = ref<String>('')
</script>

<template>
<div id="createModal" class="modalBlock p-24 flex justify-center items-center">
    <div class="flex">
        <Form @submit="onSubmit" :validation-schema="createContact">
            <div class="flex w-full">
                <div class="flex flex-col mr-10 w-96">
                    <div class="flex flex-col">
                        <a class="text-2xl">Pridėti kontaktą:</a>
                        <Input class=" mt-6"  :name="'name'" :label="'Vardas:'" :place-holder="'Įveskite vardą...'"/>
                        <Input class=" mt-6"  :name="'surname'" :label="'Pavardė:'" :place-holder="'Įveskite pavardę...'"/>
                        <Input class=" mt-6"  :name="'position'" :label="'Pozicija:'" :place-holder="'Įveskite poziciją...'"/>
                    </div>
                    <div class="flex flex-col mt-10">
                        <a class="text-2xl">Kontaktinė informacija:</a>
                        <Input class=" mt-6"  :name="'email'" :label="'Elektroninis paštas:'" :place-holder="'Įveskite el. paštą...'"/>
                        <Input class=" mt-6"  :name="'phone'" :label="'Telefono numeris:'" :place-holder="'Įveskite telefono numerį...'"/>
                    </div>
                </div>
                <div class="flex flex-col ml-10 w-96">
                    <div class="">
                        <div class="flex">
                            <a class="text-2xl">Įmonės detalės:</a>
                        </div>
                        <Select class="mt-6 "
                        :collection-name="'companies'" 
                        :model-value="companyValue" @update:model-value="(value)=>{companyValue = value}" 
                        :name="'company'" 
                        :label="'Imonė:'" 
                        :place-holder="'Pasirinkite imonę..'"></Select>
                        
                        <Select class="mt-6"
                        :filter-options="{parentId: companyValue, parentCollection: 'companies', parentName: 'company_id', expand: 'office_id'}" 
                        :collection-name="'offices'" 
                        :model-value="officeValue" @update:model-value="(value)=>{officeValue = value}" 
                        :name="'office'" 
                        :label="'Ofisas:'" 
                        :place-holder="'Pasirinkite ofisą..'"></Select>

                        <Select class="mt-6"
                        :filter-options="{parentId: officeValue, parentCollection: 'offices', parentName: 'office_id', expand: 'division_id'}" 
                        :collection-name="'divisions'" 
                        :model-value="divisionValue" @update:model-value="(value)=>{divisionValue = value}" 
                        :name="'division'" 
                        :label="'Padalinys:'" 
                        :place-holder="'Pasirinkite padalinį..'"></Select>

                        <Select class="mt-6"
                        :filter-options="{parentId: divisionValue, parentCollection: 'divisions', parentName: 'division_id', expand: 'department_id'}" 
                        :collection-name="'departments'" 
                        :model-value="departmentValue" @update:model-value="(value)=>{departmentValue = value}" 
                        :name="'department'" 
                        :label="'Skyrius:'" 
                        :place-holder="'Pasirinkite skyrių..'"></Select>

                        <Select class="mt-6"
                        :filter-options="{parentId: departmentValue, parentCollection: 'departments', parentName: 'department_id', expand: 'group_id'}" 
                        :collection-name="'groups'" 
                        :model-value="groupValue" @update:model-value="(value)=>{groupValue = value}" 
                        :name="'group'" 
                        :label="'Grupė:'" 
                        :place-holder="'Pasirinkite grupę..'"></Select>

                        <FileInput :type="'file'" :placeholder="'Įkelkite nuotrauką'" :accept="'image/*'" class=" mt-6"  :name="'photo'" :label="'Nuotrauka:'"/>
                           
                    </div>
                    <div class="mt-12 ">
                        <button type="submit" class="button rounded-sm w-full h-12"><a class="text-xl">Pridėti</a></button>
                    </div>
                </div>
            </div>
        </Form>
        <div class="w-12 ">
            <img @click="useModalStore().ResetModal()"  class=" p-2 iconPointer w-12 h-12 rounded-full rotate-45" src="@/assets/img/Add_contact.png">
        </div> 
    </div>
</div>

</template>

<style scoped>
.modalBlock{
    width: 1000px;
    height: 800px;
}
img{ 
    border: solid;
    border-color: #0054A6;
    background-color: #0054A6;
    color:white;
}
</style>