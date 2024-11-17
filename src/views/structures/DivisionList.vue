<script setup lang="ts">
import {onMounted, ref, } from 'vue'
import TableDisplay from '@/components/displays/TableDisplay.vue';
import { useCollections } from '@/composables/getData';
import Pagination from '@/components/Pagination.vue';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import type { Division } from '@/types/Division';

const {data, isLoading, totalItems, totalPages, currentPage, getCollection} = useCollections()

onMounted(async () => {
      await getCollection({collectionName: 'Divisions'});  
})
async function loadNewPage(newPage: Number){
    await getCollection({collectionName: 'Divisions', page: newPage});
}
</script>

<template>
    <div style="height: 581px">
        <TableDisplay v-if="!isLoading" :data="(data as Division[])"></TableDisplay>
        <NoDataFoundDisplay v-if="totalItems===0"></NoDataFoundDisplay>
    </div>
    <Pagination @load-new-page="(newPage) => loadNewPage(newPage)" :currentPage="(currentPage as number)" :totalPages="(totalPages as number)"></Pagination>
</template>
<style scoped>

</style>