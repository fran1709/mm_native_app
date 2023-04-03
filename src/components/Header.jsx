import React from "react";
import {View, Text, StyleSheet, TextInput} from "react-native";

const Header = () => {
    const [text, onChangeText] = React.useState('Buscar Comida...');
    return (
        <View style={styles.container}>
            <View>
               <TextInput
                    editable
                    maxLength={40}
                    onChangeText={onChangeText}
                    placeholder={'Buscar Comida...'}
                    style={styles.inputText}
                /> 
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        justifyContent: "center",
        paddingBottom: 5,
        paddingTop: 5,
    },
    inputText:{
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
    }
});

export default Header