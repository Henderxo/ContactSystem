<script setup lang="ts">
import {useNotificationStore } from '@/stores//NotificationStore'
import type { Notification } from '@/types/Notification.js'
import type { PropType } from 'vue';
const Notifications = useNotificationStore()
const props = defineProps({
    Notification: {type: Object as PropType<Notification>, required: true},
})
</script>

<template>
    <div class="Success flex rounded-md shadow-xl w-64 break-words mt-2" @click="Notifications.removeNotificationById(Notification.id)" :class="{Error: props.Notification.type === 'error'}">
        <div class="line rounded-md items-center"></div>
        <div class="text justify-center items-center flex ml-5">
            <span>{{ props.Notification.message }}</span>
        </div>
    </div>
</template>

<style scoped>
.Success {
    background-color: white; /* Set the background to white */
}
.Success .text{
    color: #00af0fa6;
}
.Success .line{
    background-color: #00af0fa6;
    height: 100px;
    width: 10px;
}
.Error .line{
    background-color: #A61A11;
    height: 100px;
    width: 10px;
}
.Error .text{
    color: #A61A11;
}

</style>