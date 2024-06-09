import { Actionsheet, ActionsheetBackdrop, ActionsheetContent,Text, Pressable, Image, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText, Box, Button, ButtonText, ScrollView, View, HStack, VStack } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { useNotification } from "../hooks/useNotification";
import { DevotionalsProps } from "../dto/devotionalDTO";
import { api } from "../service/api";
import { endpointImages } from "../utils/endpointImages";
import { ellipsisText } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

export function PreviewDevotional(){
  const [showActionsheet, setShowActionsheet] = useState(false)
  const [previewDevotional, setPreviewDevotional] = useState<DevotionalsProps>({} as DevotionalsProps);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const {setIdPreviewDevotional, setPreviewDevotionalRoute, idPreviewDevotional, routePreviewDevotional} = useNotification()

  async function handleOpenActionSheet(idPreviewDevotional: string){
    if(idPreviewDevotional !== null){
      setShowActionsheet(true)
    }
  }

  const handleClose = () => {
    setShowActionsheet(!showActionsheet)
    setIdPreviewDevotional('')
  }

  const handleGoToDevotional = () => {
    navigation.navigate('single_devotional', {
      devotional: previewDevotional
    })
  }

  async function fetchDevotionalById(id: string){
    try {
      const response = await api.get(`devotionals/${id}`)
      setPreviewDevotional(response.data.devotionals)
      console.log(response.data.devotionals.devotional.main_title)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDevotionalById(idPreviewDevotional)
  }, [idPreviewDevotional])  

  useEffect(() => {
    handleOpenActionSheet(idPreviewDevotional)
  }, [idPreviewDevotional])

  
  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent h="$full" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
          {
            previewDevotional && previewDevotional.devotional ? (
              <View h="$64">
                <Text marginVertical="$4" fontSize="$md" fontFamily="$semibold" color="$wisdomia700">Seu novo devocional está disponível!</Text>
                <Box w="$80" bgColor="$trueGray200" mr="$4" rounded="$2xl" >
                  <HStack>
                      <Image
                        w={"$24"}
                        h="$24"
                        resizeMode='cover'            
                        alt="Logo"
                        rounded="$2xl"
                        m="$2"
                        source={{
                          uri: `${endpointImages}devotionals/${previewDevotional.id}.jpg`
                        }}
                      /> 
                      <VStack>
                        <Text fontSize="$sm" w="$48" mt="$2" mr="$2" fontFamily="$semibold" color="$wgray500" mb={-4}>{previewDevotional.devotional.main_title}</Text>
                        <Text fontSize={10}>
                          Devocional de {previewDevotional.devotional.daily_devotionals.length} {previewDevotional.devotional.daily_devotionals.length === 1 ? 'dia' : 'dias'}
                        </Text>
                        <Text color="$white" backgroundColor="$green300" paddingHorizontal="$1" fontSize={10} width={50} textAlign="center" rounded={10}>Novo</Text>
                      </VStack>
                  </HStack>
                  <Pressable backgroundColor="$wisdomia700" h="$10" borderBottomLeftRadius="$2xl" borderBottomRightRadius="$2xl" paddingTop="$2" onPress={handleGoToDevotional}>
                    <Text textAlign="center" color="$white">Iniciar este devocional!</Text>
                  </Pressable>
                </Box>
              </View>
            ): null
          }
      </ActionsheetContent>
    </Actionsheet>    
  )
}