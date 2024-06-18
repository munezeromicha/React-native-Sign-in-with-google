
// //989908555806-nnvdjdq13gpooj7bc5562el7fj5um5ep.apps.googleusercontent.com  android

import * as WebBrowser from "expo-web-browser";
import { View, Text, StyleSheet, Button } from "react-native";
import * as React from "react";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

interface UserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
  [key: string]: any;
}

export default function Layout() {
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "989908555806-53j3vf38tfpq3aj20hjl5em0g0nlrhpf.apps.googleusercontent.com",
    androidClientId:
      "989908555806-664bilum988a3nlock4vkiraoj8gprlu.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success" && response.authentication?.accessToken) {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token?: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v1/certs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // handle error here
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <Text style={styles.tealText}>Google Auth</Text>
      <Button title="Sign in with Google" onPress={() => promptAsync()} />
     <Button
        title="Delete local storage"
        onPress={() => AsyncStorage.removeItem("@user")}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingTop: 20,
    gap: 20
  },
  tealText: {
    color: 'teal',
  },
});




// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin'
// import { supabase } from './utils/supabase'

// export default function () {
//   GoogleSignin.configure({
//     scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//     webClientId: '989908555806-nnvdjdq13gpooj7bc5562el7fj5um5ep.apps.googleusercontent.com',
//     // androidClientId:"989908555806-nnvdjdq13gpooj7bc5562el7fj5um5ep.apps.googleusercontent.com",
//   })

//   return (
//     <GoogleSigninButton
//       size={GoogleSigninButton.Size.Wide}
//       color={GoogleSigninButton.Color.Dark}
//       onPress={async () => {
//         try {
//           await GoogleSignin.hasPlayServices()
//           const userInfo = await GoogleSignin.signIn()
//           if (userInfo.idToken) {
//             const { data, error } = await supabase.auth.signInWithIdToken({
//               provider: 'google',
//               token: userInfo.idToken,
//             })
//             console.log(error, data)
//           } else {
//             throw new Error('no ID token present!')
//           }
//         } catch (error: any) {
//           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             // user cancelled the login flow
//           } else if (error.code === statusCodes.IN_PROGRESS) {
//             // operation (e.g. sign in) is in progress already
//           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             // play services not available or outdated
//           } else {
//             // some other error happened
//           }
//         }
//       }}
//     />
//   )
// }