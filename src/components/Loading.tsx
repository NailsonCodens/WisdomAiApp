import { Center, HStack, Spinner, Text } from "@gluestack-ui/themed"

export const Loading = () => {
  return (<HStack flex={1} alignContent="center" alignItems="center" justifyContent="center"><Center mt="$24"><Spinner size="large" color="#6B39CE"/></Center></HStack>)
}