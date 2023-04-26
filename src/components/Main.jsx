import React from "react";
import {View, StyleSheet, Image,} from "react-native";
import Constants from "expo-constants";
import Home from "./Home";
import Header from "./Header";
import Details from "./Details";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealCard from "./MealCard";
import Login from "./Login";

const Stack = createNativeStackNavigator();

const Main = () => {
    const image = { uri:'https://img.freepik.com/foto-gratis/cucharas-especias-cerca-verduras_23-2147829073.jpg?w=900&t=st=1680502312~exp=1680502912~hmac=0dca4390448a56932c6d31a04e7ed5dcae88904a215513d57f55cbfbd1d2f7c3'};
    return (
        <View style={styles.container}>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Buscar' component={Header}/>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name="Detalles" component={Details} />
                <Stack.Screen name='MealCard' component={MealCard}/>
            </Stack.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight, 
        flex: 1,
    },
    image:{
        flex:1,
        width:40,
        height:40
    },
});

export default Main