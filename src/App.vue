<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import NotificationList from './components/notifications/NotificationList.vue';
import Modal from './components/Modal.vue';
import { useAuthStore } from './stores/AuthStore';
useAuthStore().refreshUserLogin()
</script>

<template>
  <body >
    <header>
    <Navbar></Navbar>
    </header>
  <NotificationList class="z-50"></NotificationList>
  <RouterView/>
  <Modal></Modal>
  </body>
</template>

<style scoped>
body{
  min-width: 500px;
}
</style>
