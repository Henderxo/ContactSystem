<script  setup lang="ts">
import CompanyTableDisplay from '@/components/displays/CompanyTableDisplay.vue';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import Pagination from '@/components/Pagination.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, watch } from 'vue';
import { useCollections } from '@/composables/getData';
import type { Company } from '@/types/Company';
import type { ModalState } from '@/types/ModalState';
import { useModalStore } from '@/stores/ModalStore';
import CreateCompanyComponent from '@/components/modals/CreateCompanyComponent.vue';
const {data, isLoading, totalItems, totalPages, currentPage, getCollection} = useCollections(2)

onMounted(async () => {
      await getCollection({collectionName: 'Companies'});
      watch((useModalStore().isTrigger as Object), async ()=>{
        loadNewPage(currentPage.value)
    })  
})
async function loadNewPage(newPage: Number){
    await getCollection({collectionName: 'Companies', page: newPage});
}
function OpenModal(modalOptions :ModalState){
    useModalStore().SetModal({component: modalOptions.component, componentProps: modalOptions.componentProps})
}

</script>   

<template>
<div class="block items-center justify-center mx-auto max-w-6xl">
    <h1 style="padding: 20px;" class=" flex-1 text-5xl">Įmonės</h1>
    <div v-if="useAuthStore().currentUser?.expand.permissions_id?.edit_companies" class="flex">
        <div @click="OpenModal({component: CreateCompanyComponent, componentProps: {}})"style="background-color: #0054A6; width: 50px; height: 50px;" class="iconPointer ml-6 rounded-full flex justify-center items-center">
            <img src="@/assets/img/Add_contact.png">
        </div>
        <div class="text-xl flex items-center justify-center pl-10">Pridėti naują įmonę: </div>
    </div>
    <p class='mb-10 mt-2 ml-4'>Iš viso rasta: <a class="font-bold">{{ totalItems }} įmonių</a></p>
    <CompanyTableDisplay v-if="!isLoading" :data="(data as Company[])"></CompanyTableDisplay>
    <NoDataFoundDisplay v-if="totalItems===0"></NoDataFoundDisplay>
</div>
<Pagination @load-new-page="(newPage) => loadNewPage(newPage)"  :currentPage="(currentPage as number)" :totalPages="(totalPages as number)"></Pagination>
</template>

<style scoped>


</style>