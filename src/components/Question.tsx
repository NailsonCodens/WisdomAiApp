import { Box, Text, View } from "@gluestack-ui/themed";
import { useTheme } from "../hooks/useTheme";

type itemProps = {
  id: string,
  question: string,
}

export type messageProps = {
  item: itemProps;
  index: number;
}


export function Question({item, index}: messageProps){

  const {colors} = useTheme()

  return (
    <View key={item.id} alignItems={'flex-end'}>
      <Box 
        key={item.id}
        bg={colors.wisdomia500} 
        maxWidth={'85%'} borderRadius={12}
        padding={10} 
        marginVertical={8}
      >
        <Text
          selectable={true}
          key={index}
          color={colors.white}
          fontSize="$md"
        >{item.question}
        </Text>
      </Box>
    </View>
  )
}