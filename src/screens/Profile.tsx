import { Heading, View, Text, Center, useToast, Box, ButtonText, Button, ButtonGroup, AlertDialogFooter, AlertDialog, AlertDialogContent, AlertDialogBackdrop, AlertDialogHeader, AlertDialogBody, AlertDialogCloseButton, Icon, CloseIcon } from "@gluestack-ui/themed";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { api } from "../service/api";
import { Alert } from "react-native";


export default function Profile(){
  const {user, signOut} = useAuth()
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const toast = useToast()
  
  async function handleDeactivateAccount(){
    try{
      await api.put(`/account/`)

      setShowAlertDialog(true)

      setTimeout(() => {
        signOut()
      }, 2000)
    }catch(error){ 
      console.log(error)
      Alert.alert('Algo deu errado, tente novamente')
    }
  }

  return (
    <View backgroundColor="$wisdomia700">
      <Center mt={30}>
        <Heading 
          fontFamily="$semibold" 
          color="$white"
          mt="$12"
          fontSize="$2xl"
          height="$12"
          mb="$2"
          paddingBottom="$2"
        >
          Meu dados
        </Heading> 
      </Center>
      <Center>
        <Box bgColor='$wisdomia300' w={94} h={94} zIndex={9} top={48} position="relative" borderRadius="$full" alignItems="center" justifyContent="center">
          <Text fontSize={42} pt={30} color="$white">{user.name.charAt(0).toUpperCase()}</Text>
        </Box>
        <View backgroundColor="$white" borderTopLeftRadius="$2xl" borderTopRightRadius="$2xl" w="$full"alignItems="center">
          <Text 
            mt="$20"
            pt={10}
            color="$wisdomia700"
            fontFamily="$semibold"
            fontSize={22}>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </Text>  
          <Text 
            mt="$0"
            pt={10}
            color="$wisdomia700"
            fontFamily="$semibold"
            fontSize={22}>{user.email}
          </Text>                  

          <Button
          mt={50}
          zIndex={9}
          size="md"
          h={54}
          w="$80"
          px={14}
          variant="solid"
          bgColor="$error600"
          action="positive"
          isDisabled={false}
          isFocusVisible={false}
          sx={{
            ":active": {
              bg: "#B91C1C"
            },
          }}        
          onPress={() => handleDeactivateAccount()}
        >
          
        <ButtonText 
              color="$white" 
              fontFamily="$button" 
              fontSize={20}
            >
                Desativar minha conta
            </ButtonText>
        </Button>
        <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false)
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Desativar conta</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Você tem certeza que deseja deletar seus dados e cancelar sua conta? Seus dados serão deletados. Você será deslogado automaticamente e não poderá acessar com esta conta novamente.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false)
                }}
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                  setShowAlertDialog(false)
                }}
              >
                <ButtonText>Desativar</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>          
        </View>               
      </Center>
    </View>
  )
}