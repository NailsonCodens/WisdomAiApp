import { Box, Center, FlatList, HStack, Image, Pressable, Progress, ProgressFilledTrack, ScrollView, Spinner, Text, VStack, View } from "@gluestack-ui/themed";
import { Header } from "../../components/Header";
import { api } from "../../service/api";
import React, { useCallback, useEffect, useState } from "react";
import Banner from '../../assets/banner.png'
import StartHere from '../assets/starthere.png'

import { Chat, ChatCentered} from 'phosphor-react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import Chats from "./Components/Chats";
import { Devotional, DevotionalsProps } from "../../dto/devotionalDTO";
import { endpointImages } from "../../utils/endpointImages";
import ContentLoader, { Circle, Path, Rect } from "react-content-loader/native";
import { useWindowDimensions } from "react-native";

type chatProps = {
  id: string
  name: string
}

type devotionalProps = {
  main_title: string,
  image: string,
  devotional: Devotional
}


type itemDevotionalProps = {
  item: DevotionalsProps
  index: number
}

export function Home(){
  const {width, height} = useWindowDimensions()

 const [chats, setChats] = useState<chatProps[]>();
 const [isLoading, setIsLoading] = useState<boolean>(false)
 const [isEmpty, setIsEmpty] = useState<boolean>(false)
 const [devotionals, setDevotionals] = useState<devotionalProps[]>([] as devotionalProps[])
 const [currentDevotional, setCurrentDevotional] = useState<devotionalProps>({} as devotionalProps)
 const [isLoadingCurrentDevotional, setIsLoadingCurrentDevotional] = useState<boolean>(true)
 const [isEmptyCurrentDevotional, setIsEmptyCurrentDevotional] = useState<boolean>(false)
 const [isLoadingDevotionals, setIsLoadingDevotionals] = useState<boolean>(true)
 const [isEmptyDevotionals, setIsEmptyDevotionals] = useState<boolean>(false)

 const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function handleNavigateToIdea(){
    navigation.navigate('ideas'); 
  }
  
  async function loadChats(){
    try {
      const response = await api.get("chat") 

      if(response.data.listChat.length === 0){
        setIsEmpty(true)
      }else{
        setChats(response.data.listChat);
      }

      setIsLoading(false)

    } catch (error) {
      console.log('eeerr')
      setIsLoading(false)
    }
  }

  async function fetchDevotionals(){
    try {
      const response = await api.get('devotionals')

      if(response.data.devotionals.length === 0){
        setIsEmptyDevotionals(true)
      }else{
        setDevotionals(response.data.devotionals)
      }

      setIsLoadingDevotionals(false)

    } catch (error) {
      console.log('eeerr')

      setIsLoadingDevotionals(false)
      console.log(error)
    } 
  }

  async function fetchCurrentDevotional(){
    try {
      const response = await api.get('devotionals/current')


      if(response.data.devotional === null){
        setIsEmptyCurrentDevotional(true)
      }else{
        setCurrentDevotional(response.data.devotional)    
      }

      setIsLoadingCurrentDevotional(false)

    } catch (error) {
      console.log('eeerr')

      setIsLoadingCurrentDevotional(false)
      console.log(error)
    }     
  }

  function handleNavigateToStartHere(){
    navigation.navigate('starthere'); 
  }

  function handleNavigateToChat(){
    navigation.navigate('chat'); 
  }

  function handleGoToCurrentSingleDevotional(){
    navigation.navigate('single_devotional', {
      devotional: currentDevotional
    });
  }

  function handleGoToSingleDevotional(devotional: DevotionalsProps){
    navigation.navigate('single_devotional', {
      devotional
    });
  }

  function handleGoToGenerateDevotional(){
    navigation.navigate('generate_devotional');  
  }

  function handleGoToChat(){
    navigation.navigate('chat');  
  }

  useEffect(() => {
    fetchCurrentDevotional()
    fetchDevotionals()
    loadChats()
  }, [])
  

    const renderItem = ({ item, index }: itemDevotionalProps) => (
      <Pressable 
      onPress={() => handleGoToSingleDevotional(item)}>
        <Box w="$80" h="$full" bgColor="$trueGray200" mr="$4" rounded="$2xl">
          <HStack>
              <Image
                w={"$24"}
                h="$24"
                resizeMode='cover'            
                alt="Logo"
                rounded="$2xl"
                m="$2"
                source={{
                  uri: `${endpointImages}devotionals/${item.id}.jpg`
                }}
              /> 
              <VStack>
              <Text fontSize="$sm" w="$48" mt="$2" mr="$2" fontFamily="$semibold" color="$wgray500" mb={-4}>{item.devotional.main_title}</Text>
              <Text fontSize={10}>
                Devocional de {item.devotional.daily_devotionals.length} {item.devotional.daily_devotionals.length === 1 ? 'dia' : 'dias'}
              </Text>
              {
                index === 0 ?
                (
                  <Text color="$white" backgroundColor="$green300" paddingHorizontal="$1" fontSize={10} width={50} textAlign="center" rounded={10}>Novo</Text>
                ): null
              }
              </VStack>
          </HStack>
        </Box>
      </Pressable> 
    );



  return (<>
    <View>
      <Header/>
      <ScrollView
        marginBottom="$24"
        horizontal={false}
      >  
        <View id="containerHome" mt="$4" paddingHorizontal="$horizontalside">
          <View paddingHorizontal="$horizontalside" mt="$2">
            <Text textAlign="center" textTransform="uppercase" fontWeight="$thin" color="$wisdomia300" mb="$4">
              Billy Graham
            </Text>            
            <Text textAlign="center" fontSize="$lg">"O amor é a linguagem universal, e todos precisam dele."</Text>
          </View>
          <Box mt="$6" mb="$10">
            <View>
              <HStack mb="$2">
                <Text 
                  fontFamily="$semibold" 
                  fontSize="$lg"
                  color="$wgray500"                
                >Devocional Atual </Text>
              </HStack>
              {
                isEmptyCurrentDevotional ? (
                  <>
                    <Text textAlign="center" m="$6">Você ainda não tem nenhum devocional escolhido.</Text>
                    <Pressable backgroundColor="$white" m="$3" onPress={handleGoToGenerateDevotional}>
                      <Text textAlign="center" color="$wisdomia900" textDecorationLine="underline">Criar meu devocional Inteligente</Text>
                    </Pressable>
                  </>
                ) :
                null
              }
              {
              isLoadingCurrentDevotional ? (
                  <Text textAlign="center" fontSize="$sm" fontFamily="$semibold">Carregando...</Text>
              ) : (
                <>
                  {
                    currentDevotional && currentDevotional.devotional ?
                    (
                      <Pressable 
                        onPress={() => handleGoToCurrentSingleDevotional()}>
                        <Box bgColor="$wisdomia100" rounded="$2xl" height="$48">
                          <Image
                            w="$full"
                            h="$32"
                            resizeMode='cover'     
                            resizeMethod="auto"      
                            alt="Logo"
                            borderTopRightRadius="$2xl"
                            borderTopLeftRadius="$2xl"
                            source={{
                              uri: `${endpointImages}devotionals/${currentDevotional.id}.jpg`
                            }}
                          />       
                          <View ml="$2" mr="$2">
                            <HStack justifyContent="space-between" alignItems="center">
                              <Text mt="$2" color="$wisdomia500" fontFamily="$semibold">{currentDevotional.devotional.main_title}</Text>
                              <Text fontSize={9} mt="$2">
                                Devocional de {currentDevotional.devotional.daily_devotionals.length} {currentDevotional.devotional.daily_devotionals.length === 1 ? 'dia' : 'dias'}
                              </Text>                    
                            </HStack>
                            {
                                /*
                                  <Progress value={40} w="$full" size="sm" mt="$2" bgColor="$wisdomia100">
                                    <ProgressFilledTrack bgColor="$green500" />
                                  </Progress>
    
                                */
                            }
                          </View>          
                        </Box>
                      </Pressable>   
                    ) : null
                  }
                </>
              )
            }

            </View>          
            <View pt="$6">
              <HStack mb="$2">
                <Text 
                  fontFamily="$semibold" 
                  fontSize="$lg"
                  color="$wgray500"                
                >Devocionais </Text>
                <Text 
                  color="$wisdomia700" 
                  rounded="$md"  
                  textAlign="center"
                  fontFamily="$semibold"
                  fontSize={10}
                >IA</Text>
              </HStack>
              <Box w="$full" h={113} rounded="$md">
                {
                  isEmptyDevotionals ? (
                    <>
                      <Text textAlign="center" m="$6">Nenhum devocional encontrado.</Text>
                      <Pressable backgroundColor="$white" m="$3" onPress={handleGoToGenerateDevotional}>
                        <Text textAlign="center" color="$wisdomia900" textDecorationLine="underline">Criar meu devocional Inteligente</Text>
                      </Pressable>
                    </>
                  ) :
                  null
                }
                {
                  isLoadingDevotionals ? (
                    <Text textAlign="center" fontSize="$sm" fontFamily="$semibold">Carregando...</Text>
                  ) : (
                    <FlatList
                      horizontal
                      data={devotionals}
                      renderItem={renderItem}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item.id}
                    />
                  )
                }
              </Box>
            </View>              
            <Text 
              fontFamily="$semibold" 
              fontSize="$lg"
              color="$wgray500" 
              mt="$6"
              mb="$2"
              paddingBottom="$2"
            >
              Conversas com SabedorIA
            </Text>
            <ScrollView 
              maxHeight="$full" 
              marginBottom={100}
            >
              {isEmpty ? (
                <Center  borderColor="$wisdomia100" bgColor="$wisdomia100" padding="$6" borderRadius="$lg" borderWidth="$1">
                  <Text textAlign="center" w="$full" color="$black" fontSize="$md">Olá, bem-vindo ao <Text fontFamily="$semibold" color="$wisdomia700">SabedorIA. </Text> 
                  Clique no botão abaixo e tenha sua primeira experiência por aqui.</Text>
                  <Pressable 
                    bg="$wisdomia700" 
                    padding="$1" 
                    rounded="$md"
                    mt="$3"
                    paddingHorizontal="$1/4"
                    sx={{ ":active": { bg: "$wisdomia300" } }}
                    onPress={() => handleNavigateToChat()} 
                  >
                    <HStack justifyContent="center" alignItems="center" gap="$1">
                      <ChatCentered size={32} color="white"/>
                      <Text fontFamily="$semibold" color="$white">SabedorIA</Text>
                    </HStack>
                  </Pressable>
                </Center>
              ) : null}

              <Box bgColor="$trueGray200" rounded="$2xl">
                {
                  isLoading ? (
                    <Center mt="$1/4">
                      <Spinner size="large" color="#6B39CE"/>
                      <Text size="md">Carregando</Text>
                    </Center> 
                  ) : (
                    <Chats chats={chats}/>
                  )
                }
              </Box>
            </ScrollView>
          </Box>
        </View>
      </ScrollView>
    </View>
  </>)
}