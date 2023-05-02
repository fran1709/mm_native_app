import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from "react-native";
import { useState, useEffect } from "react";
import MealCard from "./MealCard";

const SearchResults = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState(true);

  const {meal} = route.params;
  const {selectedSearch} = route.params;

  async function getMealsApi() {
    switch(selectedSearch){
        case "name":
            fetchByName();
        case "ingredient":
            fetchByIngredient();
        case "country":
            fetchByCountry();
    }
    setLoading(false);
  };

  useEffect(() => {
    getMealsApi();
  }, []);

  async function fetchByName() {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    );
    const data = await response.json();
    setMeals(data.meals||[]);
  }

  async function fetchByCountry() {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${meal}`
    );
    const data = await response.json();
    const mealRequests = data.meals.map(async (meal) => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const data = await response.json();
      return data.meals[0];
    });
    const meals = await Promise.all(mealRequests);
    setMeals(meals);
  }

  async function fetchByIngredient() {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`
    );
    const data = await response.json();
    const mealRequests = data.meals.map(async (meal) => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const data = await response.json();
      return data.meals[0];
    });
    const meals = await Promise.all(mealRequests);
    setMeals(meals); 
  }
  
  if (loading) {
    return <Text>Loading meals...</Text>;
  }

  if (meals.length === 0) {
    return <Text>No meals found.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.titleFeed}>Recipes found</Text>
        <FlatList
          data={meals}
          keyExtractor={(item) => item.meal_id}
          renderItem={({ item: meal }) => (
              <MealCard meal={meal} navigation={navigation} />
          )}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 7,
    backgroundColor: "#8B0000",
    borderRadius: 10
  },
  scrollView: {
    marginHorizontal: 2,
    backgroundColor: "#ffffff",
  },
  titleFeed: {
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 10,
    fontWeight: "bold",
    color:"white"
  },
});

export default SearchResults;
