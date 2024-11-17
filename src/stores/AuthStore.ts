import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { type Account } from "@/types/Account";
import { useNotificationStore } from "./NotificationStore";
import { registerNewLogin, removeToken, refreshToken, isTokenValid } from "@/services/AuthService";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', ()=>{
    const currentUser = ref<Account|null>(JSON.parse(localStorage.getItem('currentUser')))
    const authToken = ref<String|null>(localStorage.getItem('token'))
    const Notifications = useNotificationStore()
    const router = useRouter()

    async function logUserIn(email: String, password: String): Promise<void>{
        const res = await registerNewLogin(email, password)
        authToken.value = typeof res.token !== 'undefined' && isTokenValid(res.token) ? res.token : null
        if(res.error || !isUserLoggedIn()){
 
            if(res.code === 500){
                Notifications.errorNotification(`${res.message}`)
                return
            }
            if(res.code===400){
                Notifications.errorNotification(`Prisijungti nepavyko: Neteisingi prisijungimo duomenys!!!!`)
                return
            }
            Notifications.errorNotification(`${res.message}`)
            return
        }
        currentUser.value = res.data as Account
        router.push({name: 'contacts'})
        Notifications.successNotification(`Sveikas atvykęs: ${currentUser.value.name??'N/A'}`)
    }

    async function refreshUserLogin(): Promise<void>{
        if(isUserLoggedIn())
        {
            const res = await refreshToken()
            authToken.value = typeof res.token !== 'undefined' ? res.token : null
            if(res.error || !isUserLoggedIn()){
                if(res.code === 500){
                    Notifications.errorNotification(`${res.message}`)
                    return
                }
                Notifications.errorNotification('Jūsų sesijos laikas pasibaigė')
                return
            }
            currentUser.value = res.data as Account
            //Notifications.successNotification(`Sveikas sugrįžęs: ${currentUser.value.name??'N/A'}`)  
        }
    }

    function isUserLoggedIn(): boolean{
        if(!isTokenValid(authToken.value)){
            if(authToken.value !== null || currentUser.value !== null){
                Notifications.errorNotification('Jūsų sesijos laikas pasibaigė')
                logUserOut(true)
            }
            return false
        }
        return true
    }

    async function logUserOut(noReplace: boolean = false): Promise<void>{
        currentUser.value = null
        authToken.value = null
        removeToken()
        if(!noReplace){
            router.replace({name: 'contacts'})
        }
    }

    return {refreshUserLogin, logUserIn, isUserLoggedIn, logUserOut, currentUser: readonly(currentUser)}
})