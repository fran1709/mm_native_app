import React from "react";
import {View, Text, FlatList, StyleSheet, ScrollView} from "react-native";
import { useState, useEffect } from "react";
import MealCard from "./MealCard";
import CategoryList from "./CategoryList";
import Header from "./Header";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [meals, setMeals] = useState(true);

    useEffect(() => {
        async function fetchMeals() {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=`
          );
          const data = await response.json();
          setMeals(data.meals || []);
          setLoading(false);
        }
        
        fetchMeals();
    }, []);
    
    if (loading) {
        return <Text>Loading meals...</Text>;
    }
    
    if (meals.length === 0) {
    return <Text>No meals found.</Text>;
    }

    return (
        <ScrollView>
            <Header/>
            <CategoryList/>
            <Text style={styles.titleFeed}>Feed de Comidas</Text>
            <FlatList 
                data={meals} 
                renderItem={({item : meal}) =>(
                    <View key={meal.idMeal} style={styles.container}>
                        <MealCard {... meal}/>
                    </View>
                )}
            />
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        marginBottom:10,
        marginLeft : 16,
        marginRight: 16,
    },
    titleFeed: {
        marginTop: 5,
        marginLeft: 15,
        marginBottom: 10,
        fontWeight:"bold"
    }
});

export default Home