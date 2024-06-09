import { FormControl, Input, InputField } from "@gluestack-ui/themed"
import { TextInput, TextInputProps } from "react-native"

type Props = TextInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  type: 'text' | 'password'
}

export const BaseInput = ({errorMessage = null, isInvalid, placeholder, type, ...rest}: Props) => {
  const invalid = false

  return (
    <FormControl isInvalid={invalid} mb={10}>
      <Input
        variant="outline"
        h={54}
        px={14}
        paddingLeft={0}
        borderWidth={0}
        size="sm"

        borderBottomWidth={2}
        borderBottomColor="white"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        borderRadius={5}
      >

        <InputField keyboardAppearance="dark" color="$white" fontFamily="$body" fontSize="$md" selectionColor="white" placeholderTextColor="$white" type={type} placeholder={placeholder}         {...rest}
        {...rest}
/>
      </Input>
    </FormControl>
  )
}