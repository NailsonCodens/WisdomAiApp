import { GluestackUIProvider, StatusBar, Text } from "@gluestack-ui/themed"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import {Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { OneSignal } from 'react-native-onesignal';
import { Platform } from "react-native";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { storageUserRemove } from "./src/storage/storageUser";
import { config } from "./config/gluestack-ui.config";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { NotificationContextProvider } from "./src/Providers/NotificationProvider";

const oneSignalAppId = Platform.OS === "ios" ? 
  "c03c8c54-fa6e-4b45-855e-f5e24aa67529"
  :
  "d7a6d363-34e7-4d2c-876a-fee91293c5f9"

  OneSignal.initialize(oneSignalAppId)
  OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <NotificationContextProvider>
            {fontsLoaded ? <Routes/> : <Loading/>}
          </NotificationContextProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
