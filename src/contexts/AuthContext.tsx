import React, { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../service/api";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/storageUser";
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "../storage/storageAuthToken";
import { Alert } from "react-native";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children }: AuthContextProviderProps){
  const [user, setUser] = useState({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(user: UserDTO, token: string) { 
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user)
  }

  async function storageUserAndTokenSave(user:  UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true);     

      await storageUserSave(user)
      await storageAuthTokenSave(token)        
    } catch (error) {
      throw error;
    }finally{
      setIsLoadingUserStorageData(false);     
    }
  }

  async function signIn(email: string, password: string){
    try {
      const {data} = await api.post('/authenticate', {email, password});

      if(data.user && data.user.token){
        await storageUserAndTokenSave(data.user, data.user.token)
        userAndTokenUpdate(data.user, data.user.token)
      }      
    } catch (error) {
      setIsLoadingUserStorageData(true)

      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }

  }

  async function signOut(){
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()

    } catch (error) {
      throw error;      
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData(){
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if(token && userLogged){
        userAndTokenUpdate(userLogged, token)
      }      
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    }
  }, [signOut])


  return (
    <AuthContext.Provider value={{
      user, signIn, signOut, isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>       
  )
}

