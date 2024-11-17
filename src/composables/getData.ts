import { ref, readonly } from 'vue'
import { type Office } from '@/types/Office'
import type { Department } from '@/types/Department'
import type { Division } from '@/types/Division'
import type { Group } from '@/types/Group'
import type { Company } from '@/types/Company'
import type { Account } from '@/types/Account'
import type { Contact } from '@/types/Contact'
import { getData } from '@/services/APIService'
import { useNotificationStore } from '@/stores/NotificationStore' 
import { type Filter, type GetAllDataOptions } from '@/types/GetAllDataOptions'  

export function useCollections(showPerPage: Number|null = null){
    const Notifications = useNotificationStore()
    const isLoading = ref<boolean>(true)
    const dataList = ref<Account[]|Contact|Office[]|Department[]|Division[]|Group[]|Company[]|Contact[]>([])
    const totalItems = ref<Number>()
    const totalPages = ref<Number>(0)
    const currentPage = ref <Number>(0)

    async function getCollection({collectionName, expand = null, perPage = showPerPage, page = null, id, search = null, filter = null}: GetAllDataOptions){
        const url = formUrl(collectionName,expand,page,perPage,id,search, filter)
        isLoading.value = true
        const res = await getData(url)
        if(res.error === true){
            Notifications.errorNotification(`${res.message}`)
            dataList.value = []
            totalItems.value = 0
            isLoading.value = true
            return
        }
        if(res.totalPages as number > 1  && (res.data as []).length == 0){
            getCollection({collectionName: collectionName, expand: expand, perPage: showPerPage, page: page as number-1, id: id, search: search, filter: filter})
            return
        }
        dataList.value = res.data as Account[]|Office[]|Department[]|Division[]|Group[]|Company[]|Contact[]
        totalItems.value = res.totalItems??0
        totalPages.value = res.totalPages??0
        currentPage.value = res.page??0
        isLoading.value = false
    }

    function resetData(): void{
        dataList.value = []
        totalItems.value = 0
        totalPages.value = 0
        currentPage.value = 0
        isLoading.value = true
    }
    
    return {resetData, getCollection ,isLoading: readonly(isLoading), data: readonly(dataList), totalItems: readonly(totalItems), totalPages: readonly(totalPages), currentPage: readonly(currentPage)}
}

function formUrl(collectionName: String, expand: String|null, page: Number|null = null, perPage: Number|null = null, id?: String, search: String|null = null, filter: Filter|Filter[]|null = null): String{
    const baseUlr = `collections/${collectionName}/records`
    let urlQ = id ? `${baseUlr}/${id}` : baseUlr

    const params: string[] = []

    if(expand){
        params.push(`expand=${expand}`)
    }
    if (page !== null || perPage !== null) {
        params.push(`perPage=${perPage??25}`)
        params.push(`page=${page??1}`)
    }
    if(filter || search) {
        let filterQuery = `filter=(`
        if (filter) {
            const filtersArray = Array.isArray(filter) ? filter : [filter]
    
            filtersArray.forEach((f, index) => {
                if (f.variableName && f.variableId) {
                    const condition = `${f.variableName}~'${f.variableId}'`
                    filterQuery += index === 0 ? condition : `%26%26${condition}`
                }
            });
        }
        if (search) {
            const searchConditions = [
                `name~'${search}'`,
                `surname~'${search}'`,
                `email~'${search}'`,
                `position~'${search}'`,
                `phone_number~'${search}'`
            ];
            
            if (filter) {
                filterQuery += `%26%26(${searchConditions.join(' || ')})`;
            } else {
                filterQuery += searchConditions.join(' || ')
            }
        }
    
        filterQuery += ')'
        params.push(filterQuery)
    }     
    if (params.length > 0) {
        urlQ += '?' + params.join('&')
    }
    
    return urlQ
}




