import { Pressable, Text } from "@gluestack-ui/themed";

type Props = {
  day: number;
  isActive: boolean;
  onPress: () => void;
}

export function GroupDays({day, isActive, ...rest}: Props){
  return (
    <Pressable
      w={53}
      h={54}
      mr={2}
      alignItems="center"
      justifyContent="center"
      backgroundColor={isActive ? "$white" : "$coolGray400"}
      borderColor={isActive ? "$coolGray400" : "$white"}
      borderWidth={2}
      rounded="$lg"  
      {...rest} 
    >
      <Text fontWeight="$bold" color={isActive ? "$coolGray400" : "$white"}
>DIA</Text>
      <Text
        fontWeight="$bold"
        color={isActive ? "$coolGray400" : "$white"}
        fontSize="$lg"
      >
        {day}
      </Text>
    </Pressable>
  )
}