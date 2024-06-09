import axios, { AxiosError, AxiosInstance } from "axios";
import { AppError } from "../utils/AppError";
import { storageAuthTokenSave } from "../storage/storageAuthToken";


type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

/**/
const api = axios.create({
  baseURL: 'https://wisdomapi.codens.com.br/', //https://wisdomapi.codens.com.br/,
}) as APIInstanceProps;

let failedQueued: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = singOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => response, async (requestError) => {
    if(requestError.response?.status === 401) {
      if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'Invalid token') {

        const originalRequestConfig = requestError.config;

        if(isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueued.push({
              onSuccess: (token: string) => { 
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              },
            })
          })
        }

        isRefreshing = true

        return new Promise(async (resolve, reject) => {
          console.log('tentando atualizar o token com refresh token')
          try {
            const {data} = await api.patch('authenticate/token/refresh')            
            await storageAuthTokenSave(data.token);
            console.log('consegui mas não deveria')

            if(originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }

            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` };
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            failedQueued.forEach(request => {
              request.onSuccess(data.token);
            });

            console.log("TOKEN ATUALIZADO");

            resolve(api(originalRequestConfig));
          } catch (error: any) {
            console.log(error)
            console.log('precisa deslogar')
            failedQueued.forEach(request => {
              request.onFailure(error);
            })

            singOut();
            reject(error);
          } finally {
            isRefreshing = false;
            failedQueued = []
          }
        })

      }
      
      singOut();
      
    }

    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}



export { api };