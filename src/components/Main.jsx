import React from "react";
import {View, StyleSheet, Text} from "react-native";
import Constants from "expo-constants";
import Home from "./Home";


const Main = () => {
    const image = { uri:'https://img.freepik.com/foto-gratis/cucharas-especias-cerca-verduras_23-2147829073.jpg?w=900&t=st=1680502312~exp=1680502912~hmac=0dca4390448a56932c6d31a04e7ed5dcae88904a215513d57f55cbfbd1d2f7c3'};
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meally Meaty App</Text>
            <Home/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight, 
        flexGrow: 1,
        backgroundColor:'whitesmoke'
    },
    image:{
        flex:1,
    },
    title:{
        fontWeight: "bold",
        fontSize: 20,
        marginLeft:10,
        padding:10
    },
});

export default Main