import { config } from "../../config/gluestack-ui.config"

export function useTheme(){

  const {colors, space, fontSizes, fonts} = config.tokens

  return {colors, space, fontSizes, fonts}
}