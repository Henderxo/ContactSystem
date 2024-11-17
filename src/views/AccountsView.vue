<script  setup lang="ts">
import AccountTableDisplay from '@/components/displays/AccountTableDisplay.vue';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import Pagination from '@/components/Pagination.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import type { Account } from '@/types/Account';
const {data, isLoading, totalItems, totalPages, currentPage, getCollection} = useCollections()

onMounted(async () => {
    await getCollection({collectionName: 'users'});  
})
async function loadNewPage(newPage: Number){
    await getCollection({collectionName: 'users', page: newPage});
}
</script>

<template>
<div class="block items-center justify-center mx-auto max-w-6xl">
    <h1 style="padding: 20px;" class=" flex-1 text-5xl">Admin paskyros</h1>
    <div v-if="useAuthStore().currentUser?.expand.permissions_id?.edit_permissions" class="flex mb-10">
        <div @click=""style="background-color: #0054A6; width: 50px; height: 50px;" class="iconPointer ml-6 rounded-full flex justify-center items-center">
            <img src="@/assets/img/Add_contact.png">
        </div>
        <div class="text-xl flex items-center justify-center pl-10">Sukurti naują admin paskyrą: </div>
    </div>
    <AccountTableDisplay v-if="!isLoading" :data="(data as Account[])"></AccountTableDisplay>
    <NoDataFoundDisplay v-if="totalItems===0"></NoDataFoundDisplay>
</div>
<Pagination @load-new-page="(newPage) => loadNewPage(newPage)"  :currentPage="(currentPage as number)" :totalPages="(totalPages as number)"></Pagination>
</template>

<style scoped>


</style>