import { Button, FlatList, KeyboardAvoidingView, Pressable, Input, VStack, HStack, InputField, Box, Text, set, Center, Spinner } from "@gluestack-ui/themed";
import { Keyboard, Platform } from "react-native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CaretLeft, PaperPlaneTilt } from "phosphor-react-native";
import { useTheme } from "../hooks/useTheme";
import { useCallback, useEffect, useRef, useState } from "react";
import { Question } from "../components/Question";
import { api } from "../service/api";
import { Answer } from "../components/Answer";

type ChatProps = {
  id: string,
  question: string,
  answer: string,
}

export function Chat({ route }: any){

  const [chat, setChat] = useState<ChatProps[]>([]);
  const [paddingInputChat, setPaddingInputChat] = useState<boolean>(true);
  const [response, setResponse] = useState<string>('');
  const [idChat, setIdChat] = useState<string>(route.params?.id ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSearchAwnser, setLoadingSearchAwnser] = useState<boolean>(false);
  const [isTyped, setIsTyped] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const scrollViewRef = useRef();
  const inputRef = useRef();


  const {colors, fontSizes} = useTheme()  
  const navigation = useNavigation<AppNavigatorRoutesProps>();
 
  function handleGoBack(): void {
    navigation.navigate('home')
  }

  async function getConversationById(id: string){

    setLoading(true);

    if(!id){
      setChat([])
      setLoading(false)
      setIsEmpty(true)
      return 
    }

    try {
      const response = await api.get(`/messages/${id}`)
      setChat(response.data)
    } catch (error) {
      console.log(error)      

    }finally{
      setLoading(false);
    }

  }


  async function handleTypeQuestion() {
    const question = inputRef.current.value
    
    const newOb = {
      question: question,
      answer: ''
    }
 
    setChat([...chat, newOb]); 
    setLoadingSearchAwnser(true);

    Keyboard.dismiss();
    inputRef.current.clear()


    try {  
      console.log(idChat, ' aqui ')
      //create 

      const response = await api.post('chat', {
        question,
        chat_id: idChat,

      })       

      if(idChat === null){
        setIdChat(response.data.chat_id)
      }    
      
      setResponse(response.data.answer);

      newOb.answer = response.data.answer

      setChat([...chat, newOb]);

    } catch (error) {

    }finally{
      setLoadingSearchAwnser(false);
    }

  }
  
  useEffect(() => {
    Keyboard.addListener(
      "keyboardWillHide",
      () => {
        setPaddingInputChat(true)
      }
    );

    Keyboard.addListener(
      "keyboardWillShow",
      () => {
        setPaddingInputChat(false)
      }
    );    
  }, []);

  useEffect(() => {
    getConversationById(route.params?.id)
    setIdChat(route.params?.id)
  }, [route])

  const clearParams = () => {
  navigation.setParams({id: null})
/*  navigation.reset({
    index: 0,
    routes: [{ name: 'home' }],
  });*/
}


  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      return () => {
        clearParams()
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        bg="$borderDark950"
        h="100%"           
      >
      <VStack
        h="100%"
      >
      <Pressable onPress={handleGoBack} mt="$16">
        <CaretLeft color={colors.wisdomia700} size={fontSizes["4xl"]}/>
      </Pressable>
      {
        isEmpty && loading === false && chat.length === 0 ? (
          <Center>
            <Text w="$80" textAlign="center" color="$white" fontSize="$md" opacity={0.7} mt="$1/4">Faça uma pergunta sobre algo que você tem dúvida em relação a fé.</Text>
          </Center>
        ) : null
      }

      {
        loading === true ?
        (
            <>
              <Box h={'100%'}>
                <Center>
                  <Text w="$80" textAlign="center" color="$white" fontSize="$lg" opacity={0.7} mt="$4/6"></Text>
                  <Spinner size="large" color="#6B39CE"/>
                </Center>     
              </Box>
            </>
        )
        :
        (
          <FlatList
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            m={2}
            showsVerticalScrollIndicator={false} 
            marginHorizontal="$4"
            marginBottom={0}
            paddingBottom={100}             
            removeClippedSubviews={true}
            data={chat} 
              renderItem={({item, index}) => {
                return (
                  <Box key={index}>
                    <Question item={item} index={index} key={item.id}/>
                    {item.answer ? <><Answer item={item} index={index} key={item.id}/></> : null }
                  </Box>
                )
              }
            }
            keyExtractor={item => item.id}            
          />           
        )
      }

        {
          loadingSearchAwnser === true ? (
            <><Text color="$wisdomia300">Buscando respostas...</Text></>
          ) : null
        }
        <HStack bgColor="$borderDark800" paddingTop="$2" h={paddingInputChat ? 70 : 66}>
            <Input
              height={paddingInputChat ? "$12" : "$12"}
              width="80%"
              marginHorizontal={2}
              borderRadius="$none"
              borderWidth="$0"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}             
            >
              <InputField 
                /*multiline={true}*/
                fontFamily="$body" fontSize="$sm" 
                color="$white"
                selectionColor="white" placeholderTextColor="$white" 
                placeholder="Pergunte alguma coisa"
                multiline={true}
                ref={inputRef}
                onChangeText={value => {
                  setIsTyped(value)
                  inputRef.current.value = value
                }} 
              />
            </Input>
            <Pressable 
              bgColor="$wisdomia700" 
              height={paddingInputChat ? '84%' : '84%'} 
              w="$16" 
              alignItems="center" 
              justifyContent="center"
              rounded="$2xl"
              onPress={handleTypeQuestion}
              disabled={isTyped === ''}
              sx={{
                ":disabled": {
                  bg: "#9171f2",
                },
              }}   
            >
              <PaperPlaneTilt color={colors.white} size={fontSizes.icons}/>
            </Pressable>  

        </HStack>
      </VStack>
      </KeyboardAvoidingView>
    </>
  )
}