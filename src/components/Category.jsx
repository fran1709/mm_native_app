import React from "react";
import {Text, View, Image, StyleSheet} from "react-native";

const MealCategory = (category) => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={{uri: category.strCategoryThumb}}/>
            <Text style={styles.name}>{category.strCategory}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding : 10,
        borderRadius: 16,
        backgroundColor: '#eeeeee',
    },
    logo: {
        width: 160,
        height: 100,
        display: "flex",
        borderRadius: 10
    },
    name: {
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        marginBottom: 1,
    },
});


export default MealCategory