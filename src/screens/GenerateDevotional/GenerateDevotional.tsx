import { Box, Pressable, ScrollView, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, Textarea, TextareaInput, View } from "@gluestack-ui/themed";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { CaretDown, CaretLeft } from "phosphor-react-native";
import { api } from "../../service/api";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../hooks/useTheme";

type ThemeProps = {
  id: string;
  name: string;
}

type PeriodProps = {
  id: string;
  value: string;
  period: string;
}

export function GenerateDevotional(){
  const [themes, setThemes] = useState<ThemeProps[]>([] as ThemeProps[]);
  const [periods, setPeriods] = useState<PeriodProps[]>([] as PeriodProps[]);
  const [inputTheme, setInputTheme] = useState<string | null>(null)
  const [inputPeriod, setInputPeriod] = useState<string | null>(null)
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true)
  const [information, setInformation] = useState<string | null>(null)
  const [waitingProcessGenerateDevotional, setWaitingProcessGenerateDevotional] = useState<boolean>(false)
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  const {user, signOut} = useAuth()

  const {colors, fontSizes} = useTheme()  


  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const fetchThemes = async () => {
    const response = await api.get('/themes');
    setThemes(response.data.themes)
  }

  const fetchPeriods = async () => {
    const response = await api.get('/periods');
    setPeriods(response.data.periods)
  }

  const handleGenerateDevotional = async () => {
    console.log(information, inputTheme, inputPeriod)
    const devotional = {
      theme_id: inputTheme,
      period_id: inputPeriod,
      information: information
    }

    waitingGenerationDevotional()

    const response = await api.post('/devotionals', devotional)
  }

  const waitingGenerationDevotional = async () =>{
    setWaitingProcessGenerateDevotional(true)

    startProgress()
  }

  const updateProgress = () => {
    if (progress < 100) {
      setProgress(prevProgress => prevProgress + 1);
    }
  };

  const startProgress = () => {
    setStarted(true);
  };

  function handleGoBack(): void {
    navigation.navigate('home')
  }


  useEffect(() => {
    if (started) {
      const interval = setInterval(updateProgress, 200); // Atualiza a cada 100 milissegundos

      return () => {
        clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
      };
    }

  }, [started, progress]);

  useEffect(() => {
    if (started && progress === 100) {

      const timeout = setTimeout(() => {
        setProgress(0)
        setStarted(false)
        setInputTheme(null)
        setInputPeriod(null)
        setInformation(null)
        handleGoBack()
        setWaitingProcessGenerateDevotional(false);
      }, 1500); // 2 segundos de atraso
  
      return () => clearTimeout(timeout);
    }
  }, [started, progress]);

  useEffect(() => {
    fetchThemes()    
  }, [])

  useEffect(() => {
    fetchPeriods()
  }, [])

  return (
    <>
      {
       !waitingProcessGenerateDevotional ? (
          <View>
            <Pressable onPress={handleGoBack} mt="$8">
              <CaretLeft color={colors.wisdomia700} size={fontSizes["4xl"]}/>
            </Pressable>             
            <ScrollView 
              paddingHorizontal="$horizontalside"
              mt="$8"
            >
              <Text color="$wisdomia700" fontSize="$md" fontFamily="$semibold">Hey {user.name}! </Text>
              <Text color="$wisdomia700" fontSize="$md" fontFamily="$semibold">Vamos configurar seu devocional?</Text>
              <Text fontSize={12} mt="$2" lineHeight="$2xs">
                Selecione qual o tema e o período desejado para a inteligência artificial 
                riar um devocional totalmente personalizado para o seu momento
              </Text>

              <Box mt="$8">
                <Text color="$wisdomia700" fontSize="$md" mb="$4">O que você deseja resolver com este devocional?</Text>
                <Select onValueChange={(selectedTheme) => setInputTheme(selectedTheme) }>
                  <SelectTrigger variant="outline" size="md" >
                    <SelectInput placeholder="Escolha o tema do seu devocional"/>
                    <SelectIcon mr="$3" w={24} h={24}>
                      <CaretDown size={24} color="#6B39CE"/>
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop/>
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {
                        themes.map((theme, index) => {
                          return (
                            <SelectItem label={theme.name} value={theme.id} key={index}/>
                          )
                        })
                      }
                    </SelectContent>
                  </SelectPortal>
                </Select>              
              </Box>
              <Box mt="$8">
                <Text color="$wisdomia700" fontSize="$md"  mb="$4">Por quanto tempo você deseja fazer este devocional?</Text>
                <Select  onValueChange={(selectedPeriod) => setInputPeriod(selectedPeriod) }>
                  <SelectTrigger variant="outline" size="md" >
                    <SelectInput placeholder="Selecione o período" />
                    <SelectIcon mr="$3" w={24} h={24}>
                      <CaretDown size={24} color="#6B39CE"/>
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop/>
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {
                        periods.map((period, index) => {
                          const label = `${period.value} ${period.period === 'day' ? 'Dia(s)' : ''}`
                          return (
                            <SelectItem label={label} value={period.id}  key={index}/>              
                          )
                        })
                      }
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
              <Box mt="$8" paddingBottom="$32">
                <Text color="$wisdomia700" fontSize="$md" mb="$4">Fala pra mim com suas palavras o que você busca com este devocional?</Text>
                <Textarea
                  h="$64"
                >
                  <TextareaInput  
                    onChangeText={setInformation}
                    placeholder={`Não e conomize nas palavras, eu sou uma  IA Gospel, quanto mais palavras, mais euconsigosaber o que você precisa.. Abra seu coração. ${'\n\n'} Ex: tenho sofrio com ansiedade, quero viver livre disto!`}
                  />
                </Textarea>          
              </Box>
            </ScrollView>
            <Pressable  zIndex={10} h={54} w="$full" position="absolute" bottom={68} backgroundColor="$wisdomia700" display="flex" justifyContent="center" 
              disabled={inputTheme && inputPeriod && information !== null ? false : true}
              onPress={() => handleGenerateDevotional()}
              sx={{
                ":disabled": {
                  bg: "#000",
                },
              }}  
              >
                <Text textAlign="center" fontSize="$md" color="$white">Criar meu devocional</Text>
            </Pressable>      
          </View>    

       ):(
        <>
          <View backgroundColor="$white" w="$full" h="$full" paddingTop="$10" display="flex" alignContent="center" alignItems="center" justifyContent="center">
            {
              progress <= 30 ? (
                <Text w="$72" textAlign="center" fontSize="$3xl" fontFamily="$semibold" lineHeight="$3xl" color="$wisdomia700">
                  Entendendo seus objetivos...
                </Text>  
              ) : null
            }

            {
              progress >= 31 && progress <= 55? (
                <Text w="$72" textAlign="center" fontSize="$3xl" fontFamily="$semibold" lineHeight="$3xl" color="$wisdomia700">
                  Compreendendo seus sentimentos...
                </Text>  
              ) : null
            }   
            {
              progress >= 56 && progress <= 78? (
                <Text w="$72" textAlign="center" fontSize="$3xl" fontFamily="$semibold" lineHeight="$3xl" color="$wisdomia700">
                  Criando imagem do devocional...
                </Text>  
              ) : null
            }                                             
            {
              progress >= 79 && progress <= 99? (
                <Text w="$72" textAlign="center" fontSize="$3xl" fontFamily="$semibold" lineHeight="$3xl" color="$wisdomia700">
                  Elaborando seu devocional...
                </Text>  
              ) : null
            }                        
            {
              progress === 100? (
                <>
                  <Text w="$96" textAlign="center" fontSize="$3xl" fontFamily="$semibold" lineHeight="$3xl" color="$wisdomia700">
                    Seu devocional estará pronto em breve
                  </Text>  
                  <Text w="$80" textAlign="center" marginTop="$4">
                    Você vai será notificado quando seu devocional estiver pronto.
                  </Text>
                </>
              ) : null
            }                                             

            <Text fontSize="$5xl" lineHeight="$5xl" marginTop="$10" fontFamily="$semibold" color="$wisdomia700">
              {progress} %
            </Text>            
          </View>
        </>
       ) 
      }
    </>
  )
} 