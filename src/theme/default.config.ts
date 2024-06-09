

import {config as defaultConfig} from '@gluestack-ui/config'
import { createConfig } from '@gluestack-ui/themed';

const config = createConfig({
  tokens: {
    colors: {
      wisdomia900: '#6125db',
      wisdomia700: '#6B39CE',
      wisdomia500: '#784DF1',
      wisdomia300: '#9171f2',
      wisdomia200: '#9e84ed',
      wisdomia100: '#ddd4f7',
      wgray500: '#464646',
      wgray400: '#5A5A5A',
      green300: '#109619'
    },
    fonts: {
      heading: 'Poppins_300Light',
      body: 'Poppins_400Regular',
      button: 'Poppins_600SemiBold',
      semibold: 'Poppins_600SemiBold',
      internal_page: 'Roboto_400Regular'
    },
    space: {
      horizontalside: 14
    },
    fontSizes: {
      titles: 20,
      subtitle: 12,
      menus: 14,
      icons: 28,
      messages: 12,
      subtitle_cards: 10,
    },
  },
  aliases: undefined
});

export { config }

