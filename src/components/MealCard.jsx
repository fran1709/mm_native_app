import React from "react";
import { useState, useEffect } from "react";
import {Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";
import { db } from "../Firebase";
import { collection, getDocs } from "@firebase/firestore";

const MealCard = ({meal, navigation}) => {
    // Conexion a la DB
    const ratingsCollectionsRef = collection(db, "ratings");
    const [ratings, setRatings] = useState([]);
    let calification = 0;
    let ratingsPromedium = 0;
    var cont = null;
    let focusListener = null;

    useEffect(() => {
        const getRatings = async () => {
          //obtiene toda la info de la base de datos en un json
          const data = await getDocs(ratingsCollectionsRef);
          //filtra solo la data necesaria (los docs y el id)
          setRatings(data.docs.map((doc) => ({ ...doc.data(), id : doc.id})));
        };
        getRatings();
        focusListener = navigation.addListener('focus', () => {
            getRatings();
        });
        return function cleanUp() {
            focusListener.remove();
        };
    }, []);

    ratings.map((rating) => {
        if(rating.meal_id == meal.idMeal){
          cont +=1;
          calification += parseInt(rating.stars);
        }
    })
    ratingsPromedium = (calification/cont).toFixed(1);

    if (isNaN(ratingsPromedium)) {
        ratingsPromedium = "-"
    }

    return (
        <View style={styles.container}>
            <View style={{display:'flex', flexDirection:'row'}}>
                <View style={{display:'flex', flexDirection:'column'}}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{meal.strMeal.length > 19 ? meal.strMeal.substring(0, 19) + "..." : meal.strMeal}</Text>
                    <Image style={styles.logo} source={{uri: meal.strMealThumb}}/>
                </View>
                <View style={{marginLeft:20,marginTop:30, display:'flex', flexDirection:'column'}}>
                    <View >
                        <Text style={{fontWeight:"bold"}}>Category</Text>
                        <Text>{meal.strCategory}</Text>
                    </View>
                    <View style={{marginTop:3}}>
                        <Text style={{fontWeight:"bold"}}>Rate</Text>
                        <Text>{ratingsPromedium.toString()}</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detalles', { meal: meal })}>
                            <Text style={styles.buttonText}>See details</Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        width: 100,
        height: 40,
        backgroundColor: '#b3434c',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    },
    container: {
        borderRadius: 16,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        flex:1,
        margin: 5
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
        fontSize:18
    },
});

export default MealCard