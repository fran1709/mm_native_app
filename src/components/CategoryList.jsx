import React from "react";
import {View, Text, FlatList, StyleSheet} from "react-native";
import { useState, useEffect } from "react";
import MealCategory from "./Category";

const CategoryList = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategorys] = useState(true);

    useEffect(() => {
        async function fetchCategory() {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/categories.php?c=`
          );
          const data = await response.json();
          setCategorys(data.categories || []);
          setLoading(false);
        }
        
        fetchCategory();
    }, []);
    
    if (loading) {
        return <Text>Loading categories...</Text>;
    }
    
    if (categories.length === 0) {
    return <Text>No categories found.</Text>;
    }

    return (
        <View>
            <Text style={styles.titleFeed}>Categorias de Comida</Text>
            <FlatList 
                horizontal
                data={categories} 
                renderItem={({item : category}) =>(
                    <View key={category.idCategory} style={styles.container}>
                        <MealCategory {... category}/>
                    </View>
                )}
            />

        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent: "center",
        paddingBottom: 5,
        padding:7
    },
    titleFeed: {
        marginTop: 5,
        marginLeft: 15,
        marginBottom: 10,
        fontWeight:"bold"
    },
});

export default CategoryList