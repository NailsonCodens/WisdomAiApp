import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export function useNotification(){
  //Usamos um hook aqui para poder pegar os dados que estão sendo disponibilizados no contexto
  const context = useContext(NotificationContext);
  //retornamos o contexto
  return context;
}