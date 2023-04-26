import React from "react";
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal} from "react-native";
import { db } from "../Firebase";
import { collection, addDoc } from "@firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { CommentSection } from "./CommentSection";
import {Ionicons} from '@expo/vector-icons'

const CommentButton = ({ item }) => {
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.commentsTitle}>View Comments</Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.header}>
            <Text style={styles.title}>Comments</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <CommentSection componentId={item}/>
          </View>
        </Modal>
      </View>
    );
  };

const Details = (data) => {
    const meal = data.route.params.meal;
    const ingredients = [];

    // Conexion a la DB
    const ratingsCollectionsRef = collection(db, "ratings");
    const [newRate, setNewRate] = React.useState('');

    const createRate = async () => {
        if (newRate){
            await addDoc(ratingsCollectionsRef, {meal_id: meal.idMeal, meal_name: meal.strMeal, stars:newRate});
            setNewRate('');
        }  
    };

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
            <Text style={styles.ingredientTitle}>Ingredients</Text>
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
            <Text style={styles.instructionsTitle}>Instructions</Text>
            <View style={styles.strInstructionsContainer}>
                <Text style={styles.strInstructions}>{meal.strInstructions}</Text>
            </View>
            <Text style={styles.instructionsTitle}>Rate this recipe</Text>
            <Picker selectedValue={newRate} onValueChange={(value) => setNewRate(value)} >
                <Picker.Item label="Select rating" value={null} />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
            </Picker>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity style={styles.button} title="Submit Rate" onPress={createRate}>
                <Text style={styles.buttonText}>Submit Rate</Text>
                </TouchableOpacity>  
            </View>
            <CommentButton item={meal.idMeal}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 120,
        height: 50,
        backgroundColor: '#3f51b5',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button3: {
        width: 120,
        height: 50,
        backgroundColor: '#3f51b5',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    },
    column: {
        flex: 1,
        paddingHorizontal: 10,
    },
    instructionsTitle:{
        fontSize:18,
        fontWeight:'bold',
        marginHorizontal: 10,
        marginTop: 10
    },
    ingredientTitle:{
        padding:10,
        fontSize:18,
        fontWeight:'bold',
    },
    commentsTitle:{
        padding:10,
        fontSize:18,
        fontWeight:'bold',
        color: '#3f51b5'
    },
    strInstructionsContainer:{
        flex:1,
        justifyContent:'center'
    },
    strInstructions:{
        fontSize:16,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        margin:10
    },
    strIngredient:{
        flex:1,
        fontStyle:'italic',
        flexDirection:'row'
    },
    container:{
        flexDirection:'column',
    },
    picker: {
        flex: 1,
        maxWidth: 175,
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ddd',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 10,
    },
    content: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
});

export default Details