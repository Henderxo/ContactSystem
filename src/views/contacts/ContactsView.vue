<script setup lang="ts">
import { useCollections } from '@/composables/getData';
import ContactGrid from '@/components/displays/ContactGridDisplay.vue';
import ContactTable from '@/components/displays/ContactTableDisplay.vue';
import { ref, shallowRef, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import Pagination from '@/components/Pagination.vue';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import type { Contact } from '@/types/Contact';
import Search from '@/components/Search.vue';
import type {  Filter  as dataFilter} from '@/types/GetAllDataOptions';
import Filter from '@/components/Filter.vue';
import { useModalStore } from '@/stores/ModalStore';
import { type ModalState } from '@/types/ModalState';
import CreateContactComponenet from '@/components/modals/CreateContactComponenet.vue';
const {data, isLoading, totalItems, totalPages, currentPage, getCollection} = useCollections(25)

onMounted(async () => {
    await getCollection({collectionName: 'employees', expand: 'office_id'});
    watch((useModalStore().isTrigger as Object), async ()=>{
        loadNewPage(currentPage.value, searchQuery.value)
    })
})
async function loadNewPage(newPage: Number, searchInput: String){
    const filter = [] as dataFilter[]
    companyFilter.value?filter.push({variableName: 'company_id', variableId: companyFilter.value}):null
    officeFilter.value?filter.push({variableName: 'office_id', variableId: officeFilter.value}):null
    divisionFilter.value?filter.push({variableName: 'division_id', variableId: divisionFilter.value}):null
    departmentFilter.value?filter.push({variableName: 'department_id', variableId: departmentFilter.value}):null
    groupFilter.value?filter.push({variableName: 'group_id', variableId: groupFilter.value}):null
    const finalFilter = filter.length > 0 ? filter : undefined

    await getCollection({collectionName: 'employees', expand: 'office_id', page: newPage, search: searchInput, filter: finalFilter});
}
const searchQuery = ref<String>('')

const companyFilter = ref<String>('')
const officeFilter = ref<String>('')
const departmentFilter = ref<String>('')
const divisionFilter = ref<String>('')
const groupFilter = ref<String>('')

const companytriggerFlag = ref<boolean>(false)
const officetriggerFlag = ref<boolean>(false)
const departmenttriggerFlag = ref<boolean>(false)
const  divisiontriggerFlag = ref<boolean>(false)

const displayGrid = ref(true)
const mountedComponenet = shallowRef(ContactGrid)
function changeLayout(): void{
    if(displayGrid.value){
        mountedComponenet.value = ContactTable
        displayGrid.value = false
    }
    else{
        mountedComponenet.value = ContactGrid
        displayGrid.value = true
    }
}


function OpenModal(modalOptions :ModalState){
    useModalStore().SetModal({component: modalOptions.component, componentProps: modalOptions.componentProps})
}

</script>

<template>
<div class="block items-center justify-center mx-auto max-w-6xl">
    <h1 style="padding: 20px;" class=" flex-1 text-5xl">Kontaktų sistema</h1>
    <div class="flex">
        <Search @search-input="(searchInput) => 
            {searchQuery = searchInput 
            loadNewPage(1, searchQuery)}" 
            :place-holder="'Ieškoti kontakto...'"></Search>
        <div style="background-color: #0054A6; width: 60px;" class="iconPointer rounded-full ml-4 flex justify-center items-center">
            <img style="width: 40px; height: 35px;" src="@/assets/img/Filter_contact.png">
        </div>
        <div @click="changeLayout"style="background-color: #0054A6; width: 60px;" class="iconPointer ml-6 rounded-full flex justify-center items-center">
            <img v-if="!displayGrid" src="@/assets/img/List_line.png">
            <img v-else src="@/assets/img/List_card.png">
        </div>
        <div @click="OpenModal({component: CreateContactComponenet, componentProps: {}})" v-if="useAuthStore().currentUser?.expand.permissions_id?.edit_employees" style="background-color: #0054A6; width: 60px;" class="iconPointer ml-6 rounded-full flex justify-center items-center">
            <img  src="@/assets/img/Add_contact.png">
        </div>
    </div>
    <div class="mt-2 mb-2">Iš viso rasta: <a class="font-bold">{{ totalItems }} kontaktų</a></div>
    <div style="padding: 2px;" class="mb-3 grid grid-cols-5 gap- justify-items-center font-bold" >
                <div class="filter-div"><Filter @filter-input-change="(input) => {companyFilter=input
                    loadNewPage(1, searchQuery) }" @filter-update="(input)=>{companyFilter=input
                        companytriggerFlag=!companytriggerFlag}"
                    :collection-name="'companies'" 
                    :label="'Įmonė:'" 
                    :place-holder="'Filtruoti įmones...'"></Filter></div>
                
                <div class="filter-div"><Filter @filter-input-change="(input) => {officeFilter=input
                    loadNewPage(1, searchQuery) }" @filter-update="(input)=>{officeFilter=input
                        officetriggerFlag=!officetriggerFlag}"
                    :filter-options="{flag: companytriggerFlag, expand: 'office_id', parentName: 'company_id', parentId: companyFilter, parentCollection: 'companies'}" 
                    :collection-name="'offices'" 
                    :label="'Ofisas:'" 
                    :place-holder="'Filtruoti ofisus...'"></Filter></div>
               
               <div class="filter-div"><Filter @filter-input-change="(input) => {divisionFilter=input
                    loadNewPage(1, searchQuery)}" @filter-update="(input)=>{divisionFilter=input
                        departmenttriggerFlag=!departmenttriggerFlag}"
                    :filter-options="{flag: officetriggerFlag, expand: 'division_id', parentName: 'office_id', parentId: officeFilter, parentCollection: 'offices'}"
                    :collection-name="'divisions'" 
                    :label="'Padalinys:'" 
                    :place-holder="'Filtruoti padalinius...'"></Filter></div>
                
                <div class="filter-div"><Filter @filter-input-change="(input) => {departmentFilter=input
                    loadNewPage(1, searchQuery)}" @filter-update="(input)=>{departmentFilter=input
                        divisiontriggerFlag=!divisiontriggerFlag}"
                    :filter-options="{flag: departmenttriggerFlag, expand: 'department_id', parentName: 'division_id', parentId: divisionFilter, parentCollection: 'divisions'}"
                    :collection-name="'departments'" 
                    :label="'Skyrius:'" 
                    :place-holder="'Filtruoti skyrius...'"></Filter></div>
                
                
                <div class="filter-div"><Filter @filter-input-change="(input) => {groupFilter=input
                    loadNewPage(1, searchQuery)}"  @filter-update="()=>{groupFilter=''}"
                    :filter-options="{flag: divisiontriggerFlag, expand: 'group_id', parentName: 'department_id', parentId: departmentFilter, parentCollection: 'departments'}"
                    :collection-name="'groups'" 
                    :label="'Grupė:'" 
                    :place-holder="'Filtruoti grupes...'"
                    :isBase="true"></Filter></div>
    </div>
    <component v-if="!isLoading && totalItems !== 0" :is="mountedComponenet" :contacts="(data as Contact[])"></component>
    <NoDataFoundDisplay v-if="totalItems===0"></NoDataFoundDisplay>
</div>
<Pagination @load-new-page="(newPage) => loadNewPage(newPage, searchQuery)" :currentPage="(currentPage as number)" :totalPages="(totalPages as number)"></Pagination>
</template>

<style scoped>
.filter-div{
    width: 250px;
}
</style>