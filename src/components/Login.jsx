import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  let [showButton, setShowButton] = React.useState(false);
  let navigation = useNavigation();
  let [accessToken, setAccessToken] = React.useState(null);
  let [user, setUser] = React.useState(null);
  let [request, setRequest] = React.useState(null);
  let [response, setResponse] = React.useState(null);

  var [requestGoogle, responseGoogle, promptAsyncGoogle] = Google.useAuthRequest({
    clientId: "685170813467-nho11b8i543rkmafaui82cgu0p61f59c.apps.googleusercontent.com",
    iosClientId: "685170813467-okhu1qsroje55l7gfqr9j0iea8sbup63.apps.googleusercontent.com",
    androidClientId: "685170813467-eouv43legte51hqrbps3aj6oi3vmppce.apps.googleusercontent.com"
  })

  React.useEffect(() => {
    setRequest(requestGoogle);
    setResponse(responseGoogle);
  }, [requestGoogle, responseGoogle]);

  const handleSignOut = () => {
    setAccessToken(null);
    setUser(null);
    setRequest(null);
    setResponse(null);
  };
  
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);
  
  React.useEffect(() => {
    if(response?.type === "success" && accessToken) {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
    else if(response?.type === "success" && !accessToken && request) {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response, accessToken, request]);


  React.useEffect(() => {
    if(response !== null) {
      const timeoutId = setTimeout(() => {
        navigation.navigate('Home');
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [user, navigation]);

  async function fetchUserInfo() {
    if (accessToken===null) {
      return;
    }
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = () => {
    if (user !== null) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}>
            Welcome
          </Text>
          <Image
            source={{ uri: user.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>
            {user.name}
          </Text>
          {showButton && (
            <Button
              style={styles.button}
              title="Go to Home"
              onPress={() => navigation.navigate("Home")}
            />
          )}
          <Text></Text>
          {showButton && (
            <Button
              style={styles.button}
              title={"Log Out from Google"}
              onPress={() => {
                handleSignOut();
              }}
            />
          )}
        </View>
      );
    } else {
      return null;
    }
  };
    
  return (
    <View style={styles.container}>
      {user === null &&
          <>
          <Text style={{fontSize: 35, fontWeight: 'bold'}}>Welcome</Text>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'gray'}}>Please login</Text>
          <Button
            style={styles.button}
            title={'Sign in with Google'}
            //disabled={!request}
            onPress={() => {
              promptAsyncGoogle();
              //setShowButton(true);
            }}
          />
        </>
      }
      {user!==null && <ShowUserInfo />}
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