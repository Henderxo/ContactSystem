<script setup lang="ts">
import { useNotificationStore } from '@/stores/NotificationStore';
import Notification from './Notification.vue';
const notificationStore = useNotificationStore()

</script>

<template>
    <div class="top-15 right-0 absolute">
        <div class="" style="height: auto; z-index: 10;" v-for="notification in notificationStore.shorteneNotificationList" :key="(notification.id as number)">
            <Notification :Notification="notification"></Notification>
        </div>
    </div>

</template>

<style scoped>

</style>