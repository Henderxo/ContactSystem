<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import Menu from './Menu.vue';
const router = useRouter()
const AuthStore = useAuthStore()
const api = global.api
const isMenuOpen = ref(false)
function toggleMenu(){
  isMenuOpen.value = !isMenuOpen.value
}
function logOut(){
  toggleMenu()
  AuthStore.logUserOut()
}

</script>

<template>
<div v-if="!$route.meta.hideNavbar" class="topnav">
  <img class="logo" src="@/assets/img/Logo.png">
  <div v-if="useAuthStore().isUserLoggedIn()">
  <router-link :to="{name: 'contacts'}" ><b>Kontaktai</b></router-link>
  <router-link :to="{name: 'companies'}" ><b>Įmonės</b></router-link>
  <router-link :to="{name: 'structures'}"><b>Struktūra</b></router-link>
  <router-link :to="{name: 'accounts'}"><b>Paskyros</b></router-link>
  </div>
  <router-link class="login" v-else  :to="{name: 'login'}"><b>Log In</b></router-link>
  <div class="iconPointer" @click.stop="toggleMenu()">
    <img class="user-icon rounded-full" v-if="AuthStore.isUserLoggedIn() && AuthStore.currentUser?.avatar" :src="`${api}files/${AuthStore.currentUser.collectionId}/${AuthStore.currentUser.id}/${AuthStore.currentUser.avatar}`">
    <img class="user-icon rounded-full" v-else-if="AuthStore.isUserLoggedIn()" src="@/assets/img/User_icon.png">
  </div>
</div>
<Transition name="bounce">
  <Menu  v-if="isMenuOpen" @remove-menu="toggleMenu()" @logout="logOut()"></Menu>
</Transition>

</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.topnav .user-icon{
    float: right;
    width: 75px;
    height: 75px;
    padding: 14px 16px;
}
.topnav .logo{
    float: left;
    width: 300px;
    height: 75px;
    padding: 14px 16px;
}
.topnav .login{
  float: right;
}
.topnav {
  background-color: #1F3F77;
  overflow: hidden;
  min-width: 1400px;
}
    
.topnav a {
  float: left;
  color: #f2f2f2;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  height: 75px;
  width: 125px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

}

.topnav a:hover {
  background-color: #ddd;
  color: #1F3F77;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

@media (max-width: 1000px) {
  .topnav a {
    display: none;
  }
}
</style>