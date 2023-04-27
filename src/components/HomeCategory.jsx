import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from "react-native";
import { useState, useEffect } from "react";
import MealCard from "./MealCard";

const HomeCategory = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);

  const { categoryData } = route.params;
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryData.strCategory}`;

  // Solicitando json de comidas con ese tipo de categoria
  async function fetchCategory() {
    const response0 = await fetch(apiUrl);
    const data0 = await response0.json();
    const ids = data0.meals.map((meal) => meal.idMeal);
    const mealRequests = ids.map(async (id) => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      return data.meals[0];
    });
    const meals = await Promise.all(mealRequests);
    setMeals(meals);
    setLoading(false);
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  if (loading) {
    return <Text>Loading meals...</Text>;
  }

  if (meals.length === 0) {
    return <Text>No meals found.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.titleFeed}>Feed of Recipes</Text>
        <FlatList
          data={meals}
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
    backgroundColor: "#ffffff",
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
  },
});

export default HomeCategory;
