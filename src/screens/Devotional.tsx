import { View, Text, HStack, Button, ButtonText, ScrollView, Box, Image, Pressable } from "@gluestack-ui/themed";
import { CaretLeft, PlusCircle } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { ellipsisText } from "../utils";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { DevotionalsProps } from "../dto/devotionalDTO";
import { api } from "../service/api";
import { endpointImages } from "../utils/endpointImages";
import { useTheme } from "../hooks/useTheme";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { useWindowDimensions } from "react-native";

export function Devotional(){
  const {width, height} = useWindowDimensions()

  const [devotionals, setDevotionals] = useState<DevotionalsProps[]>([] as DevotionalsProps[]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const {colors, fontSizes} = useTheme()  

  const loaders = Array.from({ length: 5 }); // Cria um array com 5 elementos

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function fetchDevotionals(){
    try {
      const response = await api.get('devotionals')

      if(response.data.devotionals.length === 0){
        setIsEmpty(true)
      }else{
        setDevotionals(response.data.devotionals)
      }

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)      
    }
  }

  async function handleClickDevotional(devotional: DevotionalsProps){
    navigation.navigate('single_devotional', {
      devotional
    });    
  }
 
  function handleGoBack(): void {
    navigation.navigate('home')
  }

  const handleGenerateDevotional = async () => {
    navigation.navigate('generate_devotional');  
  }

  useEffect(() => {
    fetchDevotionals()

/*    return () => {
    }*/
  }, [])
  

  return (
    <View paddingHorizontal="$horizontalside" mt="$0">  
      <Pressable onPress={handleGoBack} mt="$10" ml="$0">
        <CaretLeft color={colors.wisdomia700} size={fontSizes["4xl"]}/>
      </Pressable>    
      <View pb="$4">
        <Text 
          fontSize="$lg"
          pt="$6"
          color="$wisdomia300"
          fontFamily="$semibold" 
          >
          Meus Devocionais
        </Text>        
        <Pressable
          mt="$6"
          height="$12"
          bgColor="$wisdomia700"
          borderRadius="$3xl"
          sx={{
            ":active": {
              bg: "#6b39ce",
            },
          }} 
          onPress={handleGenerateDevotional}
                 
          //onTouchEndCapture={handleLinkSignUp}
        >         
          <HStack justifyContent="center" alignContent="center" alignItems="center" pt="$3">
            <PlusCircle color="white" size={22}/>
            <Text 
              color="$white" 
              fontFamily="$body" 
              fontSize="$subtitle"
              ml="$2"
            >
                Novo Devocional
            </Text>
          </HStack> 
        </Pressable> 
      </View>   
      <ScrollView
        showsVerticalScrollIndicator={false}
      >        
      <View mt="$4" pb="$56">
        {isEmpty ? (
          <View>
            <Text textAlign="center" fontSize="$sm">Você ainda não tem nenhum devocional gerado.</Text>
            <Text textAlign="center" fontSize="$sm" fontFamily="$semibold" color="$wisdomia900">Clique no botão "Novo Devocional"</Text>
          </View>
        ) : null}
        {
          isLoading ? (
            <>
              {loaders.map((_, index) => (
                <ContentLoader
                  key={index}
                  speed={2}
                  width={width}
                  height={84}
                  viewBox={`0 0 ${width} 84`}
                  backgroundColor="#c6c6c6"
                  foregroundColor="#d6d6d6"
                >
                  <Rect height="15" rx="0" ry="0" width="290" x="96" y="10" />
                  <Rect height="15" rx="0" ry="0" width="140" x="96" y="35" />
                  <Rect height="75" rx="16" ry="16" width="75" x="10" y="0" />
                </ContentLoader>
              ))}            
            </>
          ) : 
          (
            <>
              {
                devotionals && devotionals.map((devotional, index) => {
                return (
                  <Pressable 
                  onPress={() => handleClickDevotional(devotional)} 
                  key={index} 
                  h={92}
                  sx={{ ":active": { bg: "$blueGray200" } }}
                  rounded="$2xl"
                  mb="$1"
                >
                  <Box key={devotional.id} rounded="$sm" padding="$2">
                    {devotional.main_title}
                    <HStack>
                      <Image 
                        source={{
                          uri: `${endpointImages}devotionals/${devotional.id}.jpg`
                        }} 
                        w={75}
                        h={75}
                        alt=""
                        rounded="$2xl"
                      />
                      <View ml="$3" pt="$1" h={90}>
                        {
                          devotional.devotional.main_title ?
                          (<Text fontSize="$sm" fontFamily="$semibold" width="$72">{ellipsisText(devotional.devotional.main_title, 33)}</Text>): null
                        }
                        <Text fontSize="$subtitle_cards"  color="$wisdomia300" >{devotional.devotional.daily_devotionals.length} dias de devocional</Text>
                      </View>
                    </HStack>
                  </Box>
                </Pressable>
                )
                }) 
              }
            </>
          )
        }
      </View>      
      </ScrollView>
    </View>
  ) 
}