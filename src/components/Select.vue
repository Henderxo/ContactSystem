<script setup lang="ts">
import { toRef, ref, onMounted, computed,watch } from 'vue';
import { useField, type InputType } from 'vee-validate';
import { useCollections } from '@/composables/getData';
import type { FilterOptions } from '@/types/FilterOptions';
import { type PropType } from 'vue';
const props = defineProps({
    name: {type: String, required: true},
    value: {type: String, default: undefined},
    label: {type: String, required: true},
    placeHolder: {type: String, default: ''},
    collectionName: {type: String, required: true},
    filterOptions: {type: Object as PropType<FilterOptions>, required: false}
})
let baseValue = props.value
const filterId = computed(() => props.filterOptions?.parentId)
const filter = computed(() => props.filterOptions)
const emit = defineEmits(['update:modelValue'])
const {data, isLoading, getCollection, resetData, totalItems} = useCollections()
const name = toRef(props, 'name')
const{
    value: selectedValue,
    errorMessage,
    meta,
} = useField(name, undefined, {initialValue: props.value})

function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement
    selectedValue.value = target.value;
    emit('update:modelValue', selectedValue.value)
}

onMounted(async ()=>{
    props.filterOptions?'':getCollection({collectionName: props.collectionName})
    props.value?emit('update:modelValue', selectedValue.value):null
})

filter.value?watch(filterId as Object, ()=>{ 
    filter.value?.parentId?getCollection({collectionName: `${filter.value?.parentCollection}_${props.collectionName}`, filter: {variableId: filter.value?.parentId as string, variableName:filter.value?.parentName as string}, expand: filter.value?.expand}):resetData()
    selectedValue.value = baseValue??''
    baseValue?baseValue = '':null
    emit('update:modelValue', selectedValue.value)
}):''


</script>

<template>
<div
    class="main"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label  :for="name">{{ label }}</label>
    <div type="select" class="textField  items-center rounded-sm">
    <select class="h-12 p-2 shadow-[rgba(0,0,15,0.5)_0px_3px_3px_1px]"
      :value="selectedValue"
      :name="name"
      :id="name"
      :placeholder="placeHolder"
      @change="handleChange"
    > 
        <option value="" >{{ placeHolder }}</option>
        <option v-if="!isLoading && filter?.parentCollection?false:true" :value="item.id" v-for="item in data" :key="(item.id as PropertyKey)">
            {{ item.name }}
        </option>
        <option v-else-if="!isLoading" :value="item.expand[filter?.expand].id" v-for="item in data" :key="(item.expand.id as PropertyKey)">
            {{ item.expand[filter?.expand].name}}
        </option>
    </select>
    </div>
    <p class="help-message text-sm" v-show="errorMessage || meta.valid">
      {{ errorMessage || '' }}
    </p>
</div>

</template>

<style scoped>
.main{
    width: 100%;
}
.help-message{
    color: black;
}
.icon{
    width: 20px;
    height: 20px;
}
select{
    border: none;
    background-color: transparent;
    width: 100%;
}
select:focus{
    outline: none;
}
label{
    color: #414042;
}
.main.textField{
    background-color: #F1F2F4;
}
.textField:focus-within{
    border: 2px solid #0054A6;
}


.main.has-error .textField:focus-within{
    border:  2px solid #A61A11;
}
.main.has-error .textField{
    background-color: #e9a5a0;
}
.main.has-error ::placeholder{
    color:#A61A11
}
.main.has-error .help-message{
    color: #A61A11
}

.main.has-error select:-webkit-autofill{
    -webkit-box-shadow: 0 0 0 30px white inset;
    box-shadow: 0 0 0 30px #e9a5a0 inset;
}
.main select:-webkit-autofill{
    -webkit-box-shadow: 0 0 0 30px white inset;
    box-shadow: 0 0 0 30px #F1F2F4 inset;
}

</style>