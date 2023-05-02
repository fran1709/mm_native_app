import React from "react";
import {Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";

const MealCategory = ({category, navigation }) => {
    //console.log(category.strCategory);
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={{uri: category.strCategoryThumb}}/>
            <Text style={styles.name}>{category.strCategory}</Text>
            <View style={{justifyContent:'center', alignItems:'center'}}>
               <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeCategory', { categoryData: category })}>
                    <Text style={styles.buttonText}>See recipes</Text>
                </TouchableOpacity> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        width: 90,
        height: 25,
        backgroundColor: '#b3434c',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
    },
    container: {
        padding : 10,
        borderRadius: 16,
        backgroundColor: 'white',
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