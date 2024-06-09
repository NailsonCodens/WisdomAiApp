import { Heading, KeyboardAvoidingView, ScrollView, Text, VStack, Image, Center, Button, ButtonText, ButtonIcon, Spinner, useToast, Toast, ToastTitle, ToastDescription } from "@gluestack-ui/themed"
import { Platform } from "react-native"
import { BaseInput } from "../components/Input"
import logoWisdomAI from '../assets/logo.png'
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "../routes/auth.routes"
import wrongToast from "../components/WrongToast"
import { useAuth } from "../hooks/useAuth"

export const SignIn = () =>{
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const toast = useToast()

  const {user, signIn} = useAuth()
console.log(user, signIn)

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  
  async function handleAuth(){
    if(userName === '' || password === ''){
      setIsLoading(false) 
      toast.show({id: 'wrongAuth', 
      placement: "top",
      render: ({ id }) => wrongToast(id)}) 
      return 
    }

    try {
      setIsLoading(true)
      signIn(userName, password)
      
    } catch (error) {
      console.log(error)
      setIsLoading(false) 
      toast.show({id: 'wrongAuth', 
      placement: "top",
      render: ({ id }) => wrongToast(id)}) 
    }   
  }

  function handleLinkSignUp(){
    navigation.navigate('signUp');
  }



  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      bgColor='$red400'     
    >
      <VStack
        space="lg"   
        px={14}
        flex={1}
        justifyContent="center"
        bgColor='$wisdomia700'
        pb={Platform.OS === 'ios' ? 4 : 16}        
      >
        <Center mb={15}>
          <Image
            resizeMode='contain'    
            width={300}   
            h={140}     
            alt="Logo"
            source={logoWisdomAI}
          />     
        </Center>
        <BaseInput
          type="text"
          placeholder="E-mail"
          onChangeText={setUserName}
          value={userName}
/>
        <BaseInput type="password" placeholder="Senha"
                  onChangeText={setPassword}
                  value={password}/>
        <Button
          mt={14}
          size="md"
          h={54}
          px={14}
          variant="solid"
          bgColor="$white"
          action="positive"
          isDisabled={false}
          isFocusVisible={false}
          sx={{
            ":active": {
              bg: "#9171f2",
            },
          }}        
          onTouchEndCapture={handleAuth}
          disabled={isLoading ? true : false}
        >
          
          {
            isLoading ? 
            (<Spinner size="large" color="$wisdomia300"/>)
            : (<ButtonText 
              color="$wisdomia700" 
              fontFamily="$button" 
              fontSize="$lg"
            >
                Acessar 
            </ButtonText>)
          }

        </Button>        
        <Button
          mt={10}
          size="md"
          h={64}
          px={14}
          variant="solid"
          bgColor="$wisdomia700"
          action="positive"
          isDisabled={false}
          isFocusVisible={false}
          sx={{
            ":active": {
              bg: "#6b39ce",
            },
          }}        
          onTouchEndCapture={handleLinkSignUp}
        >
          
        <ButtonText 
              color="$white" 
              fontFamily="$button" 
              fontSize="$lg"
            >
                Cadastre-se 
            </ButtonText>
        </Button>    

      </VStack>
    </KeyboardAvoidingView>
  )
}