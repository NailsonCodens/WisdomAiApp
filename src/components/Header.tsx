import { Avatar, AvatarFallbackText, Box, Button, ButtonText, HStack, Link, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useAuth } from "../hooks/useAuth";
import { SignOut } from "phosphor-react-native";
import { useTheme } from "../hooks/useTheme";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { externalUserId, tagUserInfo } from "../notifications/notificationsTags";
import { useEffect } from 'react';
import { Platform } from "react-native";
import DeviceInfo from 'react-native-device-info';
import { api } from "../service/api";


export function Header(){
  const {fontSizes} = useTheme()

  const {user, signOut} = useAuth()

  externalUserId(user.id)
  tagUserInfo({
    user_email: user.email,
    user_name: user.name
  })

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToStartHere(){
    navigation.navigate('profile'); 
  }


  async function getDeviceUser(){
    const deviceId = DeviceInfo.getUniqueIdSync();

    const platform = Platform.OS

    try {
      const response = await api.get(`/devices`)
  
      if(!response.data){
        const data = {
          device_id: deviceId,
          type: platform
        }
  
        await api.post('/devices/', data)
      }
        
    } catch (error) {
    console.log(error)      
    }

  }

  useEffect(() => {
    getDeviceUser()
  }, [])


  return (
    <>
      <Box bg="$wisdomia700" padding="$horizontalside" h="$32" justifyContent="center">
        <HStack pt="$8" alignContent="center" alignItems="center" justifyContent="space-between">
          <HStack alignItems="center">
            <Link onPress={() => handleNavigateToStartHere()}>
              <Avatar bgColor='$wisdomia300' size="md" borderRadius="$full" mr="$4">
                <AvatarFallbackText>{user.name}</AvatarFallbackText>
              </Avatar>
            </Link>
            <VStack>
              <Text 
                color="white"
                fontFamily="$semibold" 
                fontSize="$md">Olá {user.name.charAt(0).toUpperCase() + user.name.slice(1)},
              </Text>
              <Text
                color="white"
                fontFamily="$body"
                fontSize="$xs"
                width={250}
                lineHeight={15}
              >
                O primeiro app com IA Gospel
              </Text>
            </VStack>
          </HStack>
          <HStack>
            <Pressable onPress={signOut}>
              <SignOut color="#fff" size={fontSizes.icons}/>
            </Pressable>
          </HStack>
        </HStack>
      </Box>
    </>
  )
}