import React from "react";
import {Text, View, Image, StyleSheet} from "react-native";

const MealCard = (meal) => {
    return (
        <View style={styles.container}>
            <View style={{display:'flex', flexDirection:'row'}}>
                <View>
                    <Text style={styles.name}>{meal.strMeal}</Text>
                    <Image style={styles.logo} source={{uri: meal.strMealThumb}}/>
                </View>
                <View style={{marginLeft:10, display:'flex', flexDirection:'column'}}>
                    <Text> </Text>
                    <View>
                        <Text style={{fontWeight:"bold"}}>Categoría</Text>
                        <Text>{meal.strCategory}</Text>
                    </View>
                    <Text></Text><Text> </Text>
                    <View>
                        <Text style={{fontWeight:"bold"}}>Puntuación</Text>
                        <Text>-</Text>
                    </View>
                </View>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding : 10,
        borderRadius: 16,
        backgroundColor: 'silver'
    },
    logo: {
        width: 170,
        height: 110,
        borderRadius: 10,
    },
    name: {
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        marginBottom: 10,
        marginLeft: 10,
    },
});


export default MealCard