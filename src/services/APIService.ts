import axios from "axios";
import { type APIRequest } from "@/types/APIRequest";
import { getAuthHeaders } from "./AuthService";
import { type CustomAxiosReponse, responseHandler, responseErrorHandler } from "./AxiosResponseHandlerService";

const instance = axios.create({
    baseURL: global.api 
})
instance.defaults.headers.common['Authorization'] = getAuthHeaders() as string
instance.defaults.headers.post["Content-Type"] = 'multipart/form-data'
instance.interceptors.response.use(responseHandler, responseErrorHandler)

function resetInstance(): void{
    instance.defaults.headers.common['Authorization'] = ''
}

async function getData(dateName: String):Promise<APIRequest>{
    const res = (await instance.get((dateName as string)) as CustomAxiosReponse)
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data,
        totalItems: res.data.totalItems,
        totalPages: res.data.totalPages,
        page: res.data.page
    }
}

async function postData(dateName: String, data: Object):Promise<APIRequest>{
    const res = (await instance.post((dateName as string), data) as CustomAxiosReponse)
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data,
        totalItems: res.data.totalItems,
        totalPages: res.data.totalPages,
        page: res.data.page
    }
}

async function deleteData(dateName: String):Promise<APIRequest>{
    const res = (await instance.delete((dateName as string)) as CustomAxiosReponse)
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data,
        totalItems: res.data.totalItems,
        totalPages: res.data.totalPages,
        page: res.data.page
    }
}

async function updateData(dateName: String, data: Object):Promise<APIRequest>{
    const res = (await instance.patch((dateName as string), data) as CustomAxiosReponse)
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data,
        totalItems: res.data.totalItems,
        totalPages: res.data.totalPages,
        page: res.data.page
    }
}

async function refreshAuthToken(){
    const res = (await instance.post('collections/users/auth-refresh?expand=permissions_id')as CustomAxiosReponse)
    instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.record??res.data,
        totalItems: res.data.totalItems,
        token: res.data.token,
        totalPages: res.data.totalPages,
        page: res.data.page
    }
}
async function getUserAuthData(email: String, passw: String): Promise<APIRequest> {

    const res = (await instance.post('collections/users/auth-with-password?expand=permissions_id', {identity: email, password: passw} ) as CustomAxiosReponse)
    instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.record??res.data,
        totalItems: res.data.totalItems,
        token: res.data.token,
        totalPages: res.data.totalPages,
        page: res.data.page
    }
}

export {getData, postData, deleteData, getUserAuthData, refreshAuthToken, resetInstance, updateData}