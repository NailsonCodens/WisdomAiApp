import { Box, Center, KeyboardAvoidingView, Text, VStack } from "@gluestack-ui/themed";
import { Platform } from "react-native";
import { Header } from "../components/Header";

export function StartHere(){
  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      bg="$white"
      h="100%"           
    >
      <VStack
        h="100%"
      >
        <Header/>
        <Center>
          <Text color="$wgray500" fontSize="$subtitle" >
            Estamos construindo esta página
          </Text>        
        </Center>        
      </VStack>    
    </KeyboardAvoidingView>
  )
}