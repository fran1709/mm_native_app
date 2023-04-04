import React from "react";
import {View, Text, StyleSheet, Image, Button, ScrollView} from "react-native";

const Details = (data) => {
    const meal = data.route.params.meal;
    const navigation = data.navigation; // accede a la propiedad "navigation"
    const ingredients = [];

    // Agregar los ingredientes y sus cantidades a la lista
    for (let i = 1; i <= 20; i++) {
        if (meal["strIngredient" + i]) {
        ingredients.push(
            meal["strIngredient" + i] + " - " + meal["strMeasure" + i]
        );
        } else {
        break;
        }
    }

    // dividiendo en 2 columnas los ingredientes
    const half = Math.ceil(ingredients.length / 2);
    const firstHalf = ingredients.slice(0, half);
    const secondHalf = ingredients.slice(half);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.name}>{meal.strMeal}</Text>
            <Image style={styles.logo} source={{uri: meal.strMealThumb}}/>
            <Text style={styles.ingredientTitle}>Ingredientes</Text>
            <View style={{flexDirection:'row'}}>
                <View style={styles.column}>
                   {firstHalf.map((ingredient, index) => (
                    <Text style={styles.strIngredient} key={index}>{ingredient}</Text>
                    ))} 
                </View>
                <View style={styles.column}>
                    {secondHalf.map((ingredient, index) => (
                    <Text style={styles.strIngredient} key={index}>{ingredient}</Text>
                    ))} 
                </View>
            </View>
            <Text style={styles.instructionsTitle}>Instrucciones</Text>
            <View style={styles.strInstructionsContainer}>
                <Text style={styles.strInstructions}>{meal.strInstructions}</Text>
            </View>
            <Button
                style={styles.button}
                title="Go to Home... again"
                onPress={() => navigation.push('Home')}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#f9c2ff",
        color: "#fff",
        padding: 10,
        borderRadius: 5,
    },
    column: {
        flex: 1,
        paddingHorizontal: 10,
    },
    instructionsTitle:{
        padding:10,
        fontSize:18,
        fontWeight:'bold'
    },
    ingredientTitle:{
        padding:10,
        fontSize:18,
        fontWeight:'bold'
    },
    strInstructionsContainer:{
        flex:1,
        padding:5,
        justifyContent:'center'
    },
    strInstructions:{
        fontSize:16,
        justifyContent:'flex-start',
        padding:5
    },
    strIngredient:{
        flex:1,
        fontStyle:'italic',
        flexDirection:'row'
    },
    container:{
        flexDirection:'column'
    },
    logo: {
        width: 190,
        height: 170,
        borderRadius: 10,
        
    },
    name: {
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        marginBottom: 10,
        marginLeft: 10,
        fontSize:30
    },
});

export default Details