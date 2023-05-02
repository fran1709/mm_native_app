import React from "react";
import {View, Text, FlatList, StyleSheet} from "react-native";
import { useState, useEffect } from "react";
import MealCategory from "./Category";

const CategoryList = ({navigation}) => {
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
        return <Text style={styles.titleFeed}>Loading categories...</Text>;
    }
    
    if (categories.length === 0) {
    return <Text style={styles.titleFeed}>No categories found.</Text>;
    }

    return (
        <View>
            <Text style={styles.titleFeed}>Categories of Recipes</Text>
            <FlatList
                horizontal
                data={categories.sort((a, b) => a.strCategory.localeCompare(b.strCategory))}
                renderItem={({item : category}) =>(
                    <View key={category.idCategory} style={styles.container}>
                        <MealCategory category={category} navigation={navigation}/>
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
        fontWeight:"bold",
        color: "white"
    },
});

export default CategoryList