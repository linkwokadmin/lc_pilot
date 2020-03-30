import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

export const QuestionText = ({ question, number, filled, onChange }) => {
    console.log(question)
    return (
        <View >
            filled ?
            <TextInput
                multiline
                style={styles.textInput}
                value={filled ? question.value : ''}
                onChangeText={(text) => {onChange(question, text) }}
            /> 
            : 
            <TextInput
                multiline
                style={styles.textInput}
                value={}
                onChangeText={(text) => {onChange(question, text) }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    Header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20
    },
    textInput: {
        borderColor: '#777', borderWidth: 1,
        flex: 1,
        width:'90%',
        height:100
    }
});