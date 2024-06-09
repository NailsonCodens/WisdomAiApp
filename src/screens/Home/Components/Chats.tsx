import { Box, FlatList, HStack, Pressable, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../../routes/app.routes";
import { Chat } from "phosphor-react-native";
import { ellipsisText } from "../../../utils";

type ChatsProps = {
  chats: any
}

export default function Chats({chats}: ChatsProps){
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function chatLink(id: string){
    navigation.navigate('chat', {
      id
    });    
  }

  return (
    <>
      {
        chats && chats.map((chat, index) => {
          const isFirst = index === 0;
          const isLast = index === chats.length - 1;

          return (
              <Pressable 
                onPress={() => chatLink(chat.id)} 
                key={chat.id} 
                sx={{ ":active": { bg: "$wisdomia100" } }} 
                h={52}
                paddingHorizontal="$2"
                rounded={isFirst ? "$none" : "$sm"}
                borderTopLeftRadius={isFirst ? "$2xl" : "$none"}
                borderTopRightRadius={isFirst ? "$2xl" : "$none"}
                borderBottomRightRadius={isLast ? "$2xl" : "$none"}
                borderBottomLeftRadius={isLast ? "$2xl" : "$none"}
                borderBottomColor={isLast ? "" : "$wisdomia100"}
                borderBottomWidth={isLast ? "$0" : "$1"}
              >
                <Box mt="$3">
                  <HStack alignItems="center">
                    <Chat size={28} color="#784DF1"/>
                    <Text fontSize="$md" ml="$1">{ellipsisText(chat.name, 30)}</Text>
                  </HStack>
                </Box>
              </Pressable>  
          )
        })
      }
    </>
  )
}