import { Picker } from "@react-native-picker/picker";
import React from "react";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

const Header = ({ navigation }) => {
  const [meal, setChangeMeal] = useState("Buscar Comida...");
  const [selectedSearch, setSelectedSearch] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meally Meaty App</Text>
      <View style={styles.searchContainer}>
        <TextInput
          editable
          maxLength={30}
          onChangeText={(itemValue) => setChangeMeal(itemValue)}
          placeholder={"Search recipe..."}
          style={styles.inputText}
        />
        <Picker
          style={styles.picker}
          selectedValue={selectedSearch}
          onValueChange={(itemValue) => setSelectedSearch(itemValue)}
          prompt="Search by:"
        >
          <Picker.Item label="Select a search option" value={null} />
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Ingredient" value="ingredient" />
          <Picker.Item label="Country" value="country" />
        </Picker>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("SearchResults", {
              meal: meal,
              selectedSearch: selectedSearch,
            });
            setSelectedSearch("");
          }}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 30,
    backgroundColor: "#b3434c",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 13,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#D2B48C",
    borderRadius:10
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
    backgroundColor:"white",
    borderRadius: 10
  },
  picker: {
    flex: 1,
    maxWidth: 175,
    color:"black",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
    padding: 10,
    color:"black"
  },
});

export default Header;
