import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

const image = { uri:'https://img.freepik.com/foto-gratis/cucharas-especias-cerca-verduras_23-2147829073.jpg?w=900&t=st=1680502312~exp=1680502912~hmac=0dca4390448a56932c6d31a04e7ed5dcae88904a215513d57f55cbfbd1d2f7c3'};
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "685170813467-nho11b8i543rkmafaui82cgu0p61f59c.apps.googleusercontent.com",
    iosClientId: "685170813467-okhu1qsroje55l7gfqr9j0iea8sbup63.apps.googleusercontent.com",
    androidClientId: "685170813467-eouv43legte51hqrbps3aj6oi3vmppce.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    if(response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = () => {
    if(user) {
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text>
          <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}} />
          <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 20}}>{user.name}</Text>
          <Button
             style={styles.button}
             title="Go to Home"
             onPress={() => navigation.navigate('Home')}
          />
        </View>
      )
    }
  }  
  return (
    <View style={styles.container}>
      {user && <ShowUserInfo />}
      {user === null &&
          <>
          <Text style={{fontSize: 35, fontWeight: 'bold'}}>Welcome</Text>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'gray'}}>Please login</Text>
          <Button
            style={styles.button}
            title="Sign in with Google"
            disabled={!request}
            onPress={() => {
                promptAsync();
            }}
          />
         {/*  <Button
             style={{ marginTop: 10 }}
             title="Skip and go to Home"
             onPress={() => navigation.navigate('Home')}
          /> */}
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        backgroundColor: "#f9c2ff",
        color: "#fff",
        padding: 10,
        borderRadius: 5,
    },
  });

export default Login