import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
const Header = ({ navigation, setMeals}) => {

  const [text, onChangeText] = React.useState("Buscar Comida...");
  const [selectedSearch, setSelectedSearch] = React.useState('');

  const getMealsApi = async () => {
    var response;
    switch(selectedSearch){
        case "name":
            response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
        case "ingredients":
            response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
        case "country":
            response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${text}`);
    }
    let json = await response.json();
    console.log(json);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meally Meaty App</Text>
      <View style={styles.searchContainer}>
        <TextInput
          editable
          maxLength={30}
          onChangeText={onChangeText}
          placeholder={"Search recipe..."}
          style={styles.inputText}
        />
        <Picker
          style={styles.picker}
          selectedValue={selectedSearch}
          onValueChange={(itemValue) => setSelectedSearch(itemValue)}
          prompt="Search by:"
        >
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Ingredient" value="ingredient" />
          <Picker.Item label="Country" value="country" />
        </Picker>
      </View>
      <Button title="Search" onPress={getMealsApi}>

      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor:'#ffffff'
  },
  searchContainer: {
    flexDirection: "row",
  },
  inputText: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    width: 170,
  },
  picker: {
    flex: 1,
    maxWidth: 175,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
    padding: 10,
  },
});

export default Header;
