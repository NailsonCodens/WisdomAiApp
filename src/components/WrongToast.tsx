import { Center, Toast, ToastDescription, VStack, Text } from "@gluestack-ui/themed";

export default function wrongToast(id: string, message = 'Usuário ou senha estão incorretos!'){
  return (
    <Toast nativeID={id} action="error" bgColor="$wisdomia100">
      <VStack width={"100%"} >
      <Center>
        <Center>
          <ToastDescription width="100%">
            <Text color="$wisdomia500">{message}</Text>
          </ToastDescription>
        </Center>
      </Center>
      </VStack>
    </Toast>
  )
}