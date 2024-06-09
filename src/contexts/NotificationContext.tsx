import { ReactNode, createContext } from "react";

export type NotificationContextProps = {
  routePreviewDevotional: string,
  idPreviewDevotional: string,
  setPreviewDevotionalRoute: (route: string) => void,
  setIdPreviewDevotional: (id: string) => void
}


export const NotificationContext = createContext<NotificationContextProps>({} as NotificationContextProps);
