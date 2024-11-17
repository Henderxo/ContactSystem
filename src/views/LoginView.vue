<script setup lang="ts">
import Input from '@/components/Input.vue';
import { Form } from 'vee-validate';
import { useAuthStore } from '@/stores/AuthStore';
import { loginShema } from '@/validation/validationShemas';
import { useRouter } from 'vue-router';
const router = useRouter()
function onSubmit(values: any){
    useAuthStore().logUserIn(values.email, values.password)
}
function back(): void{
    router.push({name: 'contacts'})
}
</script>

<template>

<div class=" background flex items-center justify-center h-full w-full">
    <div @click="back()" class="back-icon absolute top-20 left-20 iconPointer flex items-center justify-center rounded-full">
        <img  src="@/assets/img/Back_Arrow.png">
    </div>

    <div class="box p-10 flex-col flex items-center">
        <div>
            <a class="text-5xl">Admin prisijungimas:</a>
        </div>
        <div style="width: 450px;" class="mt-16">
            <Form @submit="onSubmit" :validation-schema="loginShema">
                <Input class="" :left-icon="'https://cdn-icons-png.flaticon.com/256/646/646094.png'" :name="'email'" :label="'Elektroninis paštas:'" :place-holder="'Įveskite el. pašto adresą...'"/>
                <Input class="mt-5 mb-5" :type="'password'" :right-icon="'https://icons.veryicon.com/png/o/miscellaneous/simple-linetype-icon/eye-43.png'" :left-icon="'https://cdn-icons-png.flaticon.com/512/61/61457.png'" :name="'password'" :label="'Slaptažodis:'" :place-holder="'Įveskite slaptažodį...'"/>
                <div class="flex mt-10 items-center justify-center">
                    <button class="button rounded-sm w-48" type="submit">Prisijungti</button>
                </div>
            </Form>
        </div>
    </div>
</div>

</template>

<style scoped>
.box{
    width: 700px;
    height: 810px;
    background-color: white;

}
.background{
    background-color: #1F3F77;
    height: 100vh;
    min-width: 1000px;
    min-height: 850px;

}
.back-icon{
    width: 50px;
    height: 50px;
    padding: 10px 10px;
    background-color: white;

}


</style>