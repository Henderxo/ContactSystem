<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';
import Input from '../Input.vue';
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import { onMounted, ref, type PropType } from 'vue';
import { createContact } from '@/validation/validationShemas';
import  FileInput  from '@/components/FileInput.vue'
import { useCollectionsUpdater } from '@/composables/postData';
import { useCollections } from '@/composables/getData';
import { type Contact } from '@/types/Contact';
import { useNotificationStore } from '@/stores/NotificationStore';

const props = defineProps({
    id: {type: String}
})

onMounted(async ()=>{
    await getCollection({collectionName: `employees`, id: props.id, expand: 'company_id,office_id,division_id,department_id,group_id'})
})

const {data, getCollection, isLoading} = useCollections()
const {updateModalData} = useCollectionsUpdater(`collections/employees/records/${props.id}`)

function onSubmit(values: any){

    if((data.value as Contact).name != values.name || (data.value as Contact).surname != values.surname
    || (data.value as Contact).email != values.email|| (data.value as Contact).position != values.position||  (data.value as Contact).phone_number != values.phone 
    || (data.value as Contact).expand?.company_id?.id !== (values.company===''?undefined:values.company)
    || (data.value as Contact).expand?.office_id?.id !== (values.office===''?undefined:values.office)
    || (data.value as Contact).expand?.division_id?.id !== (values.division===''?undefined:values.division)
    || (data.value as Contact).expand?.department_id?.id !== (values.department===''?undefined:values.department)
    || (data.value as Contact).expand?.group_id?.id !== (values.group===''?undefined:values.group)){
        updateModalData({name: values.name, surname: values.surname, 
        email: values.email, phone_number: values.phone, position: values.position,
        company_id: values.company, office_id: values.office, division_id: values.division, 
        department_id: values.department, group_id: values.group, photo: values.photo
    }, `Kontaktas ${values.name} ${values.surname} sėkmingai atnaujintas`)
    }else{
        useNotificationStore().errorNotification(`Kontakto ${values.name} ${values.surname} informacija nepasikeitė, atnaujinti nepavyko!!`)
    }


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
                        <a class="text-2xl">Redaguoti kontaktą:</a>
                        <Input v-if="!isLoading" class=" mt-6" :value="((data as Contact).name as string)" :name="'name'" :label="'Vardas:'" :place-holder="'Įveskite vardą...'"/>
                        <Input v-if="!isLoading" class=" mt-6" :value="((data as Contact).surname as string)" :name="'surname'" :label="'Pavardė:'" :place-holder="'Įveskite pavardę...'"/>
                        <Input v-if="!isLoading" class=" mt-6" :value="((data as Contact).position as string)" :name="'position'" :label="'Pozicija:'" :place-holder="'Įveskite poziciją...'"/>
                    </div>
                    <div class="flex flex-col mt-10">
                        <a class="text-2xl">Kontaktinė informacija:</a>
                        <Input v-if="!isLoading" class=" mt-6" :value="((data as Contact).email as string)" :name="'email'" :label="'Elektroninis paštas:'" :place-holder="'Įveskite el. paštą...'"/>
                        <Input v-if="!isLoading" class=" mt-6" :value="((data as Contact).phone_number as string)" :name="'phone'" :label="'Telefono numeris:'" :place-holder="'Įveskite telefono numerį...'"/>
                    </div>
                </div>
                <div class="flex flex-col ml-10 w-96">
                    <div class="">
                        <div class="flex">
                            <a class="text-2xl">Įmonės detalės:</a>
                        </div>
                        <Select v-if="!isLoading" class="mt-6 "
                        :value="((data as Contact).expand?.company_id?.id as string)"
                        :collection-name="'companies'" 
                        :model-value="companyValue" @update:model-value="(value)=>{companyValue = value}" 
                        :name="'company'" 
                        :label="'Imonė:'" 
                        :place-holder="'Pasirinkite imonę..'"></Select>

                        <Select v-if="!isLoading" class="mt-6"
                        :value="((data as Contact).expand?.office_id?.id as string)"
                        :filter-options="{parentId: companyValue, parentCollection: 'companies', parentName: 'company_id', expand: 'office_id'}" 
                        :collection-name="'offices'" 
                        :model-value="officeValue" @update:model-value="(value)=>{officeValue = value}" 
                        :name="'office'" 
                        :label="'Ofisas:'" 
                        :place-holder="'Pasirinkite ofisą..'"></Select>

                        <Select v-if="!isLoading" class="mt-6"
                        :value="((data as Contact).expand?.division_id?.id as string)"
                        :filter-options="{parentId: officeValue, parentCollection: 'offices', parentName: 'office_id', expand: 'division_id'}" 
                        :collection-name="'divisions'" 
                        :model-value="divisionValue" @update:model-value="(value)=>{divisionValue = value}" 
                        :name="'division'" 
                        :label="'Padalinys:'" 
                        :place-holder="'Pasirinkite padalinį..'"></Select>

                        <Select v-if="!isLoading" class="mt-6"
                        :value="((data as Contact).expand?.department_id?.id as string)"
                        :filter-options="{parentId: divisionValue, parentCollection: 'divisions', parentName: 'division_id', expand: 'department_id'}" 
                        :collection-name="'departments'" 
                        :model-value="departmentValue" @update:model-value="(value)=>{departmentValue = value}" 
                        :name="'department'" 
                        :label="'Skyrius:'" 
                        :place-holder="'Pasirinkite skyrių..'"></Select>

                        <Select v-if="!isLoading" class="mt-6"
                        :value="((data as Contact).expand?.group_id?.id as string)"
                        :filter-options="{parentId: departmentValue, parentCollection: 'departments', parentName: 'department_id', expand: 'group_id'}" 
                        :collection-name="'groups'" 
                        :model-value="groupValue" @update:model-value="(value)=>{groupValue = value}" 
                        :name="'group'" 
                        :label="'Grupė:'" 
                        :place-holder="'Pasirinkite grupę..'"></Select>

                        <FileInput :type="'file'" :placeholder="'Įkelkite nuotrauką'" :accept="'image/*'" class=" mt-6"  :name="'photo'" :label="'Nuotrauka:'"/>
                           
                    </div>
                    <div class="mt-12 ">
                        <button type="submit" class="button rounded-sm w-full h-12"><a class="text-xl">Redaguoti</a></button>
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