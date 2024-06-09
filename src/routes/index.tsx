import { NavigationContainer, DefaultTheme, useNavigation} from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, View, Text, Button, ButtonText, Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator, ActionsheetItem, ActionsheetItemText } from "@gluestack-ui/themed";
import { useAuth } from "../hooks/useAuth";
import { AppNavigatorRoutesProps, AppRoutes } from "./app.routes";
import { Loading } from "../components/Loading";
import React, { useEffect, useRef, useState } from "react";
import { NotificationClickEvent, NotificationWillDisplayEvent, OSNotification, OneSignal } from "react-native-onesignal";
import { Notification } from "../components/Notification";
import { useNotification } from "../hooks/useNotification";
import { PreviewDevotional } from "../components/PreviewDevotional";

export function Routes(){
  const [notification, setNotification] = useState<OSNotification>({} as OSNotification)
  const navigationContainerRef = useRef()

  const {setIdPreviewDevotional, setPreviewDevotionalRoute, idPreviewDevotional, routePreviewDevotional} = useNotification()
  const {user, isLoadingUserStorageData} = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = "#FCFCFC";

  if(isLoadingUserStorageData){
    return <Loading/>
  }

  const handlNotification = (event: NotificationWillDisplayEvent): void => {
    event.preventDefault()
    const response = event.getNotification()
    console.log(response)
    setNotification(response)      
  }

  const listenerNotifications = () => {
    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      handlNotification
    )
  }

  const handleClickNotification = (event: NotificationClickEvent): void => {
    const {route, id} = event.notification.additionalData

    setPreviewDevotionalRoute(route)
    setIdPreviewDevotional(id)
  } 

  const listenerClickNotifications = () => {
    OneSignal.Notifications.addEventListener(
      "click",
      handleClickNotification
    )
  }

  useEffect(() => {
    listenerClickNotifications()

    return () => {
      OneSignal.Notifications.removeEventListener(
        "click",
        handleClickNotification
      )    
    }
  }, [])

/*  useEffect(() => {
    listenerNotifications()

    return () => {
      OneSignal.Notifications.removeEventListener("foregroundWillDisplay", handlNotification)
    }
  }, [])*/

  console.log(user ? 'existe usuário' : 'não existe')

  console.log(user.id ? 'existe usuário' : 'não existe')


  return(
    <Box flex={1}>
      <NavigationContainer  theme={theme}>
        {
          idPreviewDevotional ? (
            <PreviewDevotional/> 
          ) : null
        }
        {user.id ? <AppRoutes/> : <AuthRoutes/>}
        {
          notification?.title &&
          <Notification
            title={notification?.title}
            body={notification.body}
            onClose={() => setNotification(undefined)}
          />
        }      
      </NavigationContainer>
    </Box>
  );
}