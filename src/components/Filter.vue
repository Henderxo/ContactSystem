<script setup lang="ts">
import { ref, watch, type PropType, computed } from 'vue';
import { useCollections } from '@/composables/getData';
import { onMounted } from 'vue';
import { type FilterOptions } from '@/types/FilterOptions';
const props = defineProps({
    label: {type: String, required: true},
    placeHolder: {type: String, default: ''},
    collectionName: {type: String, required: true},
    isBase: {type: Boolean, required: false, default: false},
    filterOptions: {type: Object as PropType<FilterOptions>, required: false}
})
const filter = computed(() => props.filterOptions)
const flag = computed(()=>props.filterOptions?.flag)
const emits = defineEmits(['filter-input-change', 'filter-update'])
const {data, isLoading, getCollection, resetData, totalItems} = useCollections()
onMounted(async ()=>{
    props.filterOptions?null:getCollection({collectionName: props.collectionName})
})
const filterValue = ref<String>('')

filter.value?watch(flag as Object, ()=>{ 
    if(props.isBase){
        if(!filter.value?.parentId){
            filterValue.value=''
        }
        emits('filter-input-change', filterValue.value)
    }
    filter.value?.parentId?getCollection({collectionName: `${filter.value?.parentCollection}_${props.collectionName}`, filter: {variableId: filter.value?.parentId as string, variableName:filter.value?.parentName as string}, expand: filter.value?.expand}):resetData()
    filterValue.value = ''
    emits('filter-update', filterValue.value)
}):''

function onChange(){
    if(props.isBase){
        emits('filter-input-change', filterValue.value)
    }else{
        emits('filter-update', filterValue.value)
    }
}


</script>

<template>
<div class="main flex flex-col">
    <label class="text-sm">{{ label }}</label>
    <select class="rounded-md text-sm" @change="onChange()" v-model="filterValue">
        <option class="select_option" value="" >{{ placeHolder }}</option>
        <option class="select_option" v-if="!isLoading && filter?.parentCollection?false:true" :value="item.id"  v-for="item in data" :key="(item.id as PropertyKey)">{{ item.name }}</option>
        <option class="select_option" v-else-if="!isLoading" :value="item.expand[filter?.expand].id"  v-for="item in data" :key="(item.expand.id as PropertyKey)">{{ item.expand[filter?.expand].name}}</option>
    </select>
</div>
</template>

<style scoped>
select:focus{
    border-color: black;
}
.select_option{
    background-color: white;
}
select{
    height: 30px;
    background-color: white;
    border: 2px solid;
    border-color: #E0E0E0;
    color: #414042;
}
.main{
    width: 100%;
}
label{
    color: black;
}


</style>