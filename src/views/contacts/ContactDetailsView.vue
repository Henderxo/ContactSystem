<script setup lang="ts">
import { useCollections } from '@/composables/getData';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue'
import ContactDetails from '@/components/contacts/ContactDetails.vue';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
const route = useRoute()
const {data, isLoading, totalItems, getCollection} = useCollections()

onMounted(async () => {
    await getCollection({collectionName: 'employees', expand: 'company_id,office_id,division_id,department_id,group_id', id: route.params.id as String});  
})

</script>

<template>

<div class="block items-center justify-center mx-auto max-w-6xl">
    <h1 style="padding: 20px;" class="text-5xl">Detalesnė kontakto informacija:</h1>
    <ContactDetails v-if="!isLoading" :contact="data"></ContactDetails>
    <NoDataFoundDisplay v-if="totalItems===0 && isLoading"></NoDataFoundDisplay>
</div>

</template>

<style scoped>
.block{
width: 1400px;
max-width: 1400px;
min-width: 1400px;
padding: 15px;
}

</style>