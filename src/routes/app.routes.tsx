import {createBottomTabNavigator, BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import { Home } from "../screens/Home/Home";
import { useTheme } from '../hooks/useTheme';
import { ChatCentered, House, HandsPraying } from 'phosphor-react-native';
import { Chat } from '../screens/Chat';
import { StartHere } from '../screens/StartHere';
import Profile from '../screens/Profile';
import Ideas from '../screens/Ideas';
import { Platform } from 'react-native';
import React, { useEffect } from 'react';
import { Devotional } from '../screens/Devotional';
import { SingleDevocional } from '../screens/SingleDevotional/SingleDevotional';
import { GenerateDevotional } from '../screens/GenerateDevotional/GenerateDevotional';
import {PreviewDevotional} from '../screens/PreviewDevotional/PreviewDevotional';
import { useNavigation } from '@react-navigation/native';
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';
import { useNotification } from '../hooks/useNotification';

type AppRoutes = {
  home: undefined;
  chat: undefined;
  starthere: undefined
  startherebottom: undefined
  profile: undefined
  ideas: undefined
  devotional: undefined
  single_devotional: undefined
  generate_devotional: undefined
  preview_devotional: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen} = createBottomTabNavigator<AppRoutes>();

export const AppRoutes = () => {
  const {colors, fontSizes, fonts} = useTheme()

  return (
    <Navigator 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.wisdomia700,
        tabBarInactiveTintColor: colors.trueGray500,
        tabBarLabelStyle: {
          paddingTop: 0,
          fontSize: fontSizes.menus,
          fontWeight: '300'
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? '8%' : '10%',
          paddingTop: Platform.OS === 'android' ? 2 : 6,
        },
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'android' ? 4 : 0,
          marginTop: Platform.OS === 'android' ? -6 : 0,
          fontSize: Platform.OS === 'ios' ? 16 : 12,
          fontFamily: fonts.heading
        }
      }}    
    >
      { 
        /*
        <Screen
          name="startherebottom"
          component={StartHere}
          options={{
            tabBarLabel: 'Comece por aqui',
            tabBarIcon: ({color}) => {
              return <Path color={color} size={fontSizes.icons}/>;
            }
          }}          
        />
        
        */
      
      }
        <Screen
          name="home"   
          component={Home}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({color}) => {
              return <House color={color} size={fontSizes.icons}/>;
            }
          }}          
        />          
        <Screen
          name="devotional"   
          component={Devotional}
          options={{
            tabBarLabel: 'Devocional',
            tabBarIcon: ({color}) => {
              return <HandsPraying color={color} size={fontSizes.icons}/>;
            } 
          }}          
        />  
        <Screen
          name="chat"   
          component={Chat}
          options={{
            tabBarLabel: 'SabedorIA',
            tabBarIcon: ({color}) => {
              return <ChatCentered color={color} size={fontSizes.icons}/>;
            },
            tabBarStyle: { display: "none" },           
          }}          
        />  
        <Screen
          name="single_devotional"
          component={SingleDevocional}
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: "none" }
          }}
        />
        <Screen
          name="preview_devotional"
          component={PreviewDevotional}
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: "none" }
          }}
        />        
        <Screen
          name="generate_devotional"
          component={GenerateDevotional}
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: "none" }
          }}
        />
        <Screen
          name="profile"
          component={Profile}
          options={{
            tabBarButton: () => null
          }}
        />
        <Screen
          name="ideas"
          component={Ideas}
          options={{
            tabBarButton: () => null
          }}
        />        
        {
          /*
          
            <Screen
              name="starthere"
              component={StartHere}
              options={{
                tabBarButton: () => null
              }}
            />              
                
          
          */
        }
    </Navigator>
  )
}