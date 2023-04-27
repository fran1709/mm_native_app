import React from "react";
import {View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView} from "react-native";
import { useState, useEffect } from "react";
import MealCard from "./MealCard";
import CategoryList from "./CategoryList";
import Header from "./Header";

const Home = ({navigation}) => {
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
        <SafeAreaView style={styles.container}> 
            <ScrollView style={styles.scrollView}>
                <Header navigation={navigation}/>
                <CategoryList navigation={navigation}/>
                <Text style={styles.titleFeed}>Feed of Recipes</Text>
                <FlatList 
                    data={meals} 
                    renderItem={({item : meal}) =>(
                        <MealCard meal={meal} navigation={navigation}/>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
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

export default Home