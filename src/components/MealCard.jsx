import React from "react";
import { useState, useEffect } from "react";
import {Text, View, Image, StyleSheet, Button} from "react-native";
import { db } from "../Firebase";
import { collection, getDocs } from "@firebase/firestore";

const MealCard = ({meal, navigation}) => {
    // Conexion a la DB
    const ratingsCollectionsRef = collection(db, "ratings");
    const [ratings, setRatings] = useState([]);
    let calification = 0;
    let ratingsPromedium = 0;
    var cont = null;

    useEffect(() => {
        const getRatings = async () => {
          //obtiene toda la info de la base de datos en un json
          const data = await getDocs(ratingsCollectionsRef);
          //filtra solo la data necesaria (los docs y el id)
          setRatings(data.docs.map((doc) => ({ ...doc.data(), id : doc.id})));
        };
        getRatings();
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
                        <Text>{ratingsPromedium.toString()}</Text>
                    </View>
                </View>
            </View> 
            <Text></Text>
            <Button
                style={styles.button}
                title="Ir a Receta"
                onPress={() => navigation.navigate('Detalles', { meal: meal })}
                
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        padding:2,
        margin:5,
        borderRadius:10,
        display:"flex"
    },
    container: {
        borderRadius: 16,
        backgroundColor: '#eeeeee',
        padding: 10,
        justifyContent: 'center',
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
        fontSize:20
    },
});


export default MealCard