import { postData, updateData, deleteData } from "@/services/APIService";
import { ref } from "vue";
import { useNotificationStore } from "@/stores/NotificationStore";
import { useModalStore } from "@/stores/ModalStore";

export function useCollectionsUpdater(collectionUrl: String){
    const NotificationStore = useNotificationStore()
    const collection = ref<String>(collectionUrl)
    const ModalStore = useModalStore()

    async function postModalData(data: Object, message: String): Promise<void>{

        const res = await postData(collection.value, data)
        if(res.error){
            NotificationStore.errorNotification(`${res.message}`)
            ModalStore.ResetModal()
            return 
        }
        NotificationStore.successNotification(`${message}`)
        ModalStore.TriggerChange()
        ModalStore.ResetModal()
    }

    async function updateModalData(data: Object, message: String): Promise<void>{

        const res = await updateData(collection.value, data)
        if(res.error){
            NotificationStore.errorNotification(`${res.message}`)
            ModalStore.ResetModal()
            return 
        }
        NotificationStore.successNotification(`${message}`)
        ModalStore.TriggerChange()
        ModalStore.ResetModal()
    }
    
    async function deleteModalData(message: String): Promise<void>{

        const res = await deleteData(collection.value)
        if(res.error){
            NotificationStore.errorNotification(`${res.message}`)
            ModalStore.ResetModal()
            return 
        }
        NotificationStore.successNotification(`${message}`)
        ModalStore.TriggerChange()
        ModalStore.ResetModal()
    }

    return {postModalData, updateModalData, deleteModalData}
}
