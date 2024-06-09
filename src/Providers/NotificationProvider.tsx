import { ReactNode, useState } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export type NotificationContextProviderProps = {
  children: ReactNode
}


export function NotificationContextProvider({children }: NotificationContextProviderProps){
  const [routePreviewDevotional, setPreviewDevotionalRoute] = useState<string>('')
  const [idPreviewDevotional, setIdPreviewDevotional] = useState<string>('')

  const value = {routePreviewDevotional, setPreviewDevotionalRoute, idPreviewDevotional, setIdPreviewDevotional}

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>       
  )
}