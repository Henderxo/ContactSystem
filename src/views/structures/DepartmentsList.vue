<script setup lang="ts">
import {onMounted, ref, } from 'vue'
import TableDisplay from '@/components/displays/TableDisplay.vue';
import { useCollections } from '@/composables/getData';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import Pagination from '@/components/Pagination.vue';
import type { Department } from '@/types/Department';
const {data, isLoading, totalItems, totalPages, currentPage, getCollection} = useCollections()

onMounted(async () => {
      await getCollection({collectionName: 'Departments'});  
})
async function loadNewPage(newPage: Number){
    await getCollection({collectionName: 'Departments', page: newPage});
}

</script>

<template>
    <div style="height: 581px">
        <TableDisplay v-if="!isLoading" :data="(data as Department[])"></TableDisplay>
        <NoDataFoundDisplay v-if="totalItems===0"></NoDataFoundDisplay>
    </div>
    <Pagination @load-new-page="(newPage) => loadNewPage(newPage)" :currentPage="(currentPage as number)" :totalPages="(totalPages as number)"></Pagination>
</template>
<style scoped>

</style>