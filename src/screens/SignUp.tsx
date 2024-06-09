import { Heading, KeyboardAvoidingView, Pressable, ScrollView, Text, VStack, Image, Center, Button, ButtonText, ButtonIcon, Spinner, useToast, Toast, ToastTitle, ToastDescription } from "@gluestack-ui/themed"
import { Platform,  } from "react-native"
import { BaseInput } from "../components/Input"
import { useState } from "react"
import { api } from "../service/api"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "../routes/auth.routes"
import { CaretLeft } from "phosphor-react-native"
import { useTheme } from "../hooks/useTheme";
import wrongToast from "../components/WrongToast"

export const SignUp = () =>{
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const toast = useToast()
  const {colors, fontSizes} = useTheme()  
  
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  
  async function handleSignUp(){
    if(userName === '' || password === ''){
      setIsLoading(false) 
      toast.show({id: 'wrongAuth', 
      placement: "top",
      render: ({ id }) => wrongToast(id, 'Adicione seus dados para criar um usuário.')}) 
      return 
    }
    
    try {
      await api.post('user', {
        email: userEmail,
        name: userName,
        password: password
      });

      toast.show({id: 'successSignUp', 
      placement: "top",
      render: ({ id }) => successSignUp(id)}) 

      navigation.navigate('signIn');

    } catch (error) {
     
      toast.show({id: 'wrongAuth', 
      placement: "top",
      render: ({ id }) => wrongToast(id, 'Este usuário já existe')}) 
    }
  }

  async function handleLinkSignIn(){
    navigation.navigate('signIn');

  }

  function successSignUp(id: string){
    return (
      <Toast nativeID={id} action="error" bgColor="$green400">
        <VStack width={"80%"}>
          <ToastDescription flex={1}>
            <Text color="$wisdomia900">Cadastrado com sucesso</Text>
          </ToastDescription>
        </VStack>
      </Toast>
    )
  }  

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      bgColor='$wisdomia700'     
    >
      <Pressable onPress={handleLinkSignIn} mt="$16" ml="$4">
        <CaretLeft color={colors.white} size={fontSizes.icons}/>
      </Pressable>

      <VStack
        space="lg"   
        px={14}
        flex={1}
        justifyContent="center"
        bgColor='$wisdomia700'
        pb={Platform.OS === 'ios' ? 4 : 16}        
      >
        <Center mb={15}>
          <Text color="$white" fontSize={"$lg"}>Cadastre-se e acesse o</Text>   
          <Text color="$white" fontSize={"$lg"}>seu guia de bolso da fé</Text>
        </Center>
        <BaseInput
          type="text"
          placeholder="Nome"
          onChangeText={setUserName}
          value={userName}
        />
        <BaseInput
          type="text"
          placeholder="Email"
          onChangeText={setUserEmail}
          value={userEmail}
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
          onTouchEndCapture={handleSignUp}
        >
          <ButtonText 
              color="$wisdomia700" 
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