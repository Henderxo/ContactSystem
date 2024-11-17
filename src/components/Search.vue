<script setup lang="ts">
import {ref, watch} from 'vue'
import debounce from 'lodash.debounce'
const props = defineProps({
    placeHolder: {type: String, required: true}
})
const emits = defineEmits(['search-input'])
const inputValue = ref('')
function submitInput(){
    emits('search-input', inputValue.value as String)
}
watch(inputValue, debounce(()=>{
    submitInput()
}, 2000))
</script>

<template>

<div type="input" class="textField flex items-center rounded-sm p-3">
        <img class="icon ml-1 mr-2" src="@/assets/img/Search.png">
        <input :placeholder="placeHolder" type="text" v-model="inputValue"/>
</div>  
</template>

<style scoped>

.icon{
    width: 20px;
    height: 20px;
}
input{
    border:none;
    background-color: transparent;
    width: 100%;
}
.textField{
    background-color: #F1F2F4;
}
.textField:focus-within{
    border: 2px solid #0054A6;
}

input:focus{
    outline: none;
}
.main input:-webkit-autofill{
    -webkit-box-shadow: 0 0 0 30px white inset;
    box-shadow: 0 0 0 30px #F1F2F4 inset;
}

</style>