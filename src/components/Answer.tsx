import { Box, Text, View } from "@gluestack-ui/themed";
import { useTheme } from "../hooks/useTheme";

type itemProps = {
  id: string,
  answer: string
}

export type messageProps = {
  item: itemProps;
  index: number;
}


export function Answer({item, index}: messageProps){

  const {colors} = useTheme()

  return (
    <View key={item.id} alignItems={'flex-start'}>
      <Box 
        key={item.id}
        bg={colors.wisdomia100} 
        maxWidth={'85%'} borderRadius={12}
        padding={10} 
        marginVertical={8}
      >
        <Text
          selectable={true}
          key={index}
          color={colors.wisdomia900}
          fontSize="$md"
        >{item.answer}
        </Text>
      </Box>
    </View>
  )
}