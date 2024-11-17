import { type AxiosResponse } from "axios"
import axios from "axios";
class HttpError extends Error {
    constructor(message?: string) {
      super(message)
      this.name = 'HttpError'
      Object.setPrototypeOf(this, new.target.prototype) 
    }
}
export interface CustomAxiosReponse extends AxiosResponse{
    error: boolean,
    message: String,
    data: any
}

function formResponse(message: String, code: Number, isError: boolean, response?: AxiosResponse): CustomAxiosReponse{
    return {
        error: isError,
        message: message,
        data: isError?[]:response?.data, 
        status: code, 
        statusText: isError ? 'Error' : 'OK',
        headers: response?.headers??{}, 
        config: response?.config??{}, 
        request: response?.request??{},
    } as CustomAxiosReponse; 
}
function httpErrorHandler(error: any){
    if(error === null) throw new Error('Netikėta klaida')
    if(axios.isAxiosError(error)){
        const response = error?.response
        const statusCode = response?.status??500;
        switch (statusCode) {
            case 400:
                if(error.response?.data.data.name.code === 'validation_not_unique'){
                    return formResponse('Bloga užklausa: Kolekcijos narys tokiu pavadinimu jau egzistuoja!!',statusCode, true, response);
                }
                return formResponse('Bloga užklausa: Serveris nesugebėjo suprasti užklausos dėl neteisingos sintaksės ar duomenų.',statusCode, true, response);
            case 401:
                return formResponse('Nepakanka teisių: Prieiga yra atmetama dėl nepakankamų teisių.', statusCode, true, response);
            case 403:
                return formResponse('Draudžiama: Neturite teisės pasiekti šios kolekcijos.', statusCode, true, response);
            case 404:
                return formResponse('Nerasta: Tokia kolekcija nerasta.', statusCode, true, response);
            case 500:
                return formResponse('Serverio klaida: Serveris šiuo metu nepasiekiamas.', statusCode, true, response);
            case 503:
                return formResponse('Paslauga nepasiekiama: Serverio paslaugos šiuo metu nepasiekiamos.', statusCode, true, response);
            default:
                return formResponse(`Netikėta klaida.`, statusCode, true, response);
        }
    }
    return formResponse('Netikėta klaida.', -200, true)
}

export function responseErrorHandler(response: AxiosResponse<any>) {
    return httpErrorHandler(response)
 }

export function responseHandler(response: AxiosResponse<any>) {

    if(response.status == 200){

        const data = response?.data
        if(!data){
            throw new HttpError('API klaida: Duoneų negauta')
        }
        return formResponse('Užklausa įvykdyta', 200, false, response)
    }
    if(response.status = 204){
        return formResponse('Užklausa įvykdyta', 204, false, response)
    }
    throw new HttpError()
}