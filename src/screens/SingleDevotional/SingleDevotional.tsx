import { Text, View, Image, Box, Pressable, FlatList, VStack, HStack} from "@gluestack-ui/themed";
import { DayProps, DevotionalsProps } from "../../dto/devotionalDTO";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ellipsisText } from "../../utils";
import { GroupDays } from "./Components/GroupDays";
import { useEffect, useRef, useState } from "react";
import { ContentDay } from "./Components/ContentDay";
import { CaretCircleLeft, CaretCircleRight } from "phosphor-react-native";
import { endpointImages } from "../../utils/endpointImages";
import { Gesture, GestureDetector, PanGestureHandler, State, ScrollView, GestureType} from "react-native-gesture-handler";
import React from "react";

type RouteParams = {
  devotional: DevotionalsProps;
}

export function SingleDevocional(){
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const [singleDevotional, setSingleDevotional] = useState<DevotionalsProps>({} as DevotionalsProps)
  const [activeScrol, setActiveScrool] = useState(true)

  const panGestureRef = useRef<GestureType>(Gesture.Pan()); 


  const route = useRoute();
  const {devotional} = route.params as RouteParams;

  const loadingSingleDevotional = () => {
    setSingleDevotional(devotional)
  }

  const handlePrevious = async () => {
    if(Number(selectedDay) <= devotional.devotional.daily_devotionals.length){
      if(Number(selectedDay) == 1){
        setSelectedDay(devotional.devotional.daily_devotionals.length)
        return;
      }else{
        setSelectedDay(selectedDay - 1)
        return;  
      }
    }
  }

  const handleNext = async () => {
    if(Number(selectedDay) < devotional.devotional.daily_devotionals.length){
      setSelectedDay(selectedDay + 1)
      return;
    }

    if(Number(selectedDay) >= devotional.devotional.daily_devotionals.length){
      setSelectedDay(1)
      return;
    }
  }

/*  const onGestureEvent = ({ nativeEvent }) => {
    console.log(nativeEvent.state)
    if (nativeEvent.translationX > 150 && nativeEvent.state === State.ACTIVE) {
      console.log('sdsad')
    }
  };  

*/

const pan = Gesture.Pan()
.onEnd((event) => {
  const { translationX, translationY, state } = event;

  if (Math.abs(translationX) > Math.abs(translationY)) {
    // Verificar se o gesto é horizontal
    if (state === State.END) {
      if (translationX > 100) {
        handleNext();
      } else if (translationX < -100) {
        handlePrevious();
      }
    }
  }

  setActiveScrool(true)

}).onFinalize(() => {
  setActiveScrool(true)

}).withRef(panGestureRef);


useEffect(() => {
    loadingSingleDevotional()

    return () => {
      loadingSingleDevotional()
    }
  }, [])

{console.log(`${endpointImages}/devotionals/${devotional.id}.jpg`)}
  return (
    <View>
     {
        singleDevotional ? (
          <>
            <ScrollView scrollEnabled={activeScrol} simultaneousHandlers={[panGestureRef]} bounces={false}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}horizontal={false}>
              <View position="relative" h="$64" display="flex" justifyContent="center" alignItems="center">
                <View zIndex={1} position="absolute" w="$full" h="$64" backgroundColor="rgba(0, 0, 0, 0.5)" />
                  <Text zIndex={2} position="absolute" color="$white" fontSize="$lg" lineHeight="$lg" width="$full" fontFamily="$semibold" paddingHorizontal="$8" textAlign="center" pt="$6" flexDirection="row" >
                  {ellipsisText(devotional.devotional.main_title, 110)}
                  </Text>        
                <Image
                  w={"$full"}
                  h="$64"
                  resizeMode='cover'            
                  alt="Logo"
                  source={{
                    uri: `${endpointImages}devotionals/${devotional.id}.jpg`
                  }}
                /> 
              </View> 
              {
                devotional && devotional.devotional ? 
                (
                  <View paddingHorizontal="$horizontalside">
                    <Text mt="$4" fontSize="$sm" color="$coolGray400">Dias do Devocional</Text>
                    <FlatList
                      data={devotional.devotional.daily_devotionals}
                      keyExtractor={item => item.day}
                      renderItem={({item, index}) => (
                        <GroupDays  
                          key={index}
                          isActive={selectedDay === Number(item.day)} 
                          day={item.day}
                          onPress={() => setSelectedDay(Number(item.day))}  
                        />
                      )}
                      horizontal
                      removeClippedSubviews={true}
                      showsHorizontalScrollIndicator={false}
                      ListEmptyComponent={<Text>Carregando...</Text>}
                      my={10}
                    />
                    <GestureDetector gesture={pan}
                    >
                      <View>
                        <ContentDay content={devotional.devotional.daily_devotionals.find(item => Number(item.day) === selectedDay)}/>
                      </View>
                    </GestureDetector>

                  </View>                                 
                )
                :
                null
              }
            </ScrollView>
            <View zIndex={10} h={60} w="$full" position="absolute" bottom={0} borderTopWidth={1} borderColor="$blueGray200" bgColor="$white">
              <HStack display="flex" justifyContent="space-between" pt="$2">
                <Pressable onPress={handlePrevious}>
                  <CaretCircleLeft size={42} weight="light" color="#9CA3AF" />
                </Pressable>
                <View mt="$2">
                  <Text fontFamily="$internal_page" color="$coolGray400">Dia {selectedDay} . 2 de {devotional.devotional.daily_devotionals.length}</Text>
                </View>
                <Pressable onPress={handleNext}>
                  <CaretCircleRight size={44} weight="light" color="#9CA3AF" />
                </Pressable>
              </HStack>
            </View>           
          </>
        ): null
      }      
    </View>
  )
}
