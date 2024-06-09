import { HStack, Icon, Text, View, Pressable } from "@gluestack-ui/themed";
import { ClosedCaptioning, X, XCircle } from "phosphor-react-native";
import { StyleSheet } from 'react-native';

type Props = {
  title: string;
  body: string;
  onClose: () => void;
}

export function Notification({title, body, onClose}: Props){
  return (
    <Pressable style={styles.androidShadow}
      w="$full"
      justifyContent="space-between"
      alignItems="center"
      top={40}
      zIndex={9}
      position="absolute" 
      hardShadow="4"
    >
      <HStack
       p="$6"
       bgColor="$wisdomia100"
      rounded={10}
      >
        <View>
          <Text fontSize="$sm">{title}</Text> 
          <Text fontSize={12}>{body}</Text>
        </View>
        <Pressable onPress={onClose} ml="$3">
          <XCircle color="#6125db" size={36}/>
        </Pressable>
      </HStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidShadow: {
    elevation: 5, // Aumente ou diminua para ajustar a intensidade da sombra
    // Outros estilos do seu componente
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // Outros estilos do seu componente
  },
});