import { ScrollView, View, Text, Image} from "@gluestack-ui/themed";
import { DevotionalsProps } from "../../dto/devotionalDTO";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState} from "react";

import React from "react";
import { api } from "../../service/api";
import { ellipsisText } from "../../utils";
import { endpointImages } from "../../utils/endpointImages";
import { useNotification } from "../../hooks/useNotification";

type RouteParams = {
  id: string;
}

export function PreviewDevotional(){
  const [previewDevotional, setPreviewDevotional] = useState<DevotionalsProps>({} as DevotionalsProps);

  const {idPreviewDevotional} = useNotification()

  async function fetchDevotionalById(id: string){
    try {
      const response = await api.get(`devotionals/${id}`)
      setPreviewDevotional(response.data.devotionals)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDevotionalById(idPreviewDevotional)
  }, [idPreviewDevotional])

  return (
    <View>
      <View backgroundColor="$red200" flex={1} height="$96" marginTop="$40" width="$full" position="absolute" zIndex={99}>
        <ScrollView>
          <View>
            {
              previewDevotional && previewDevotional.devotional ? (
                <View position="relative" h="$40" display="flex" justifyContent="center" alignItems="center" borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
                  <View zIndex={1} position="absolute" w="$full" h="$64" backgroundColor="rgba(0, 0, 0, 0.5)"  borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl"/>
                    <Text zIndex={2} position="absolute" color="$white" fontSize="$lg" lineHeight="$lg" width="$full" fontFamily="$semibold" paddingHorizontal="$8" textAlign="center" pt="$6" flexDirection="row" >
                    {ellipsisText(previewDevotional.devotional.main_title, 110)}
                    </Text>        
                  <Image
                    w={"$full"}
                    h="$64"
                    resizeMode='cover' 
                    borderTopLeftRadius="$3xl"
                    borderTopRightRadius="$3xl"           
                    alt="Logo"
                    source={{
                      uri: `${endpointImages}devotionals/${previewDevotional.id}.jpg`
                    }}
                  /> 
                </View>
              ): null
            }
          </View>
        </ScrollView>     
      </View>
    </View>
  )
}
