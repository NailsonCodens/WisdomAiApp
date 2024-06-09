import { View, Text } from "@gluestack-ui/themed";
import { DayProps } from "../../../dto/devotionalDTO";

type ContentProps = {
  content: DayProps | undefined
}

export function ContentDay({content}: ContentProps){  
  return (
    <View>
      <Text fontFamily="$semibold" fontSize="$titles" marginVertical="$4">{content?.title}</Text>
      <Text fontSize="$md" fontFamily="$internal_page" lineHeight="$sm" mb="$6">{content?.devotional}</Text>
      <Text textAlign="center" color="$wisdomia300" pb="$24" fontSize={10}>Devocional gerado by SabedorIA</Text>
    </View>
  )
}