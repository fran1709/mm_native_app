import React from "react";
import {View, Text, StyleSheet} from "react-native";

const HomeCategory = ({ navigation}) =>{

    return (
        <View>
            <Text>Hello </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        backgroundColor: '#ffffff'
    },
    scrollView: {
        marginHorizontal: 2,
        backgroundColor: '#ffffff'
    },
    titleFeed: {
        marginTop: 5,
        marginLeft: 15,
        marginBottom: 10,
        fontWeight:"bold"
    }
});

export default HomeCategory;