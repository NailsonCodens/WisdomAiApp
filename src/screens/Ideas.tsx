import { Heading, View, Text, Center, useToast, Box, ButtonText, Button, ScrollView, ButtonGroup, AlertDialogFooter, AlertDialog, AlertDialogContent, AlertDialogBackdrop, AlertDialogHeader, AlertDialogBody, AlertDialogCloseButton, Icon, CloseIcon, Textarea, TextareaInput } from "@gluestack-ui/themed";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { api } from "../service/api";
import { Alert } from "react-native";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";


export default function Ideas(){
  const {user, signOut} = useAuth()
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [message, setMessage] = useState<string>("")


  const navigation = useNavigation<AppNavigatorRoutesProps>();


  const toast = useToast()
  
  async function handleSendFeedbackAndIdeas(){
  
    try{
      await api.post(`/feedback/`, {message: message})

      setShowAlertDialog(false)

      setTimeout(() => {
        Alert.alert('Enviado com sucesso', 'Obrigado!', [
          {
            text: 'Ir para o início',
            onPress: () => handleGoBack(),
          }
        ]);

      }, 200)
    }catch(error){ 
      console.log(error)
      Alert.alert('Algo deu errado, tente novamente')
    }
  }

 
  function handleGoBack(): void {
    navigation.navigate('home')
  }  

  const handleLinkSignUp = async () => {
    setShowAlertDialog(true)
  }

  return (
    <View>
      <Header/>
      <ScrollView
        maxHeight="$full"
        showsVerticalScrollIndicator={false}
      >  
        <Button
            m="$2"
            mt="$10"
            size="$md"
            h={54}
            px={14}
            variant="solid"
            bgColor="$black"
            action="positive"
            isDisabled={false}
            isFocusVisible={false}
            sx={{
              ":active": {
                bg: "#000",
              },
            }}        
            onTouchEndCapture={handleLinkSignUp}
          >
            
            <ButtonText 
              color="$white" 
              fontFamily="$button" 
              fontSize="$md"
            >
              Dar feedback e sugerir de ideias
            </ButtonText>
          </Button> 
        <View paddingHorizontal="$4" paddingBottom="$72">
          <Center mt="$6">
              <Text fontSize="$md" fontFamily="$semibold" textAlign="center">
                Veja algumas ideias que temos para o aplicativo!
              </Text>      
            </Center>
          <Box>
            <Text
                fontSize="$md"
                pt="$6"
                pb="$2"
                color="$wisdomia300"
                fontFamily="$semibold"         
            >
            - Bíblia na ordem de conhecimento
            </Text>
            <Text fontSize="$sm" pl="$3">
              Através de perguntas básicas que o IA fará a você, sua bíblia sera montada e organizada de acordo
              com seu nível de entendimento afim de tornar fácil a sua evolução na fé cristã na leitura diária da bíblia.
              Dando um resumo e entregando o principal objetivo da mensagem lida.
            </Text>            
          </Box>
          <Box>
            <Text
                fontSize="$md"
                pt="$6"
                pb="$2"
                color="$wisdomia300"
                fontFamily="$semibold"         
            >
              - Bíblia de estudo com IA
            </Text>
            <Text fontSize="$sm" pl="$3">
              Este recurso vai sugerir estudos e referências dos grandes mestres teólogos da atualidade do captulo que está sendo lído
            </Text>            
          </Box>
          <Box>
            <Text
                fontSize="$md"
                pt="$6"
                pb="$2"
                color="$wisdomia300"
                fontFamily="$semibold"         
            >
              - Devocionais
            </Text>
            <Text fontSize="$sm" pl="$3">
              Devocionais baseado no que você está precisando espiritualmente para o mês atual
            </Text>            
          </Box>


          <Box>
            <Text
                fontSize="$md"
                pt="$6"
                pb="$2"
                color="$wisdomia300"
                fontFamily="$semibold"         
            >
              - Direcionamento para sua fé

            </Text>
            <Text fontSize="$sm" pl="$3">
              Trilha personalizada de conteúdo baseado no seu nível de conhecimento para você possa crescer na fé.
            </Text>            
          </Box>                       
        <AlertDialog
          isOpen={showAlertDialog}
          onClose={() => {
            setShowAlertDialog(false)
          }}
        >
          <AlertDialogBackdrop/>
          <AlertDialogContent  mb='40%'>
            <AlertDialogHeader>
              <Heading size="md">FeedBacks e sugestões de ideias!</Heading>
              <AlertDialogCloseButton>
                <Icon as={CloseIcon} />
              </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>
            <Textarea size="md" isReadOnly={false} isInvalid={false} isDisabled={false}  w='$full' h="$40">
              <TextareaInput
                placeholder="Deixe aqui suas ideias para o aplicativo e seu feedback"
                onChangeText={setMessage}
              />
            </Textarea>
                      
            </AlertDialogBody>
            <AlertDialogFooter>
              <ButtonGroup space="lg">
                <Button
                  bg="$success400"
                  action="negative"
                  onPress={() => {
                    handleSendFeedbackAndIdeas()
                  }}
                >
                  <ButtonText>Enviar</ButtonText>
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>  
        </View>                     
      </ScrollView>
    </View>
  )
}