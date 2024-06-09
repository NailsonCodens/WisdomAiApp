import {OneSignal} from 'react-native-onesignal';

type tagUserInfo = {
  user_name: string
  user_email: string
}

export function tagUserInfo(info: tagUserInfo){
  OneSignal.User.addTags({
    user_name: info.user_name,
    user_email: info.user_email
  })
}

export function externalUserId(user_id: string){
  OneSignal.login(user_id)
}