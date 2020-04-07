import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

export const QuestionText = ({ question, number, filled, onChange }) => {
    return (
        <View >
            {
            filled ?
            <TextInput
                multiline
                value={question.value}
                onChangeText={(text) => {onChange(question, text) }}
            /> 
            : 
            <TextInput
                multiline
                placeholder="Type here"
                onChangeText={(text) => {onChange(question, text) }}
            />
            }
        </View>
    );
};
const styles = StyleSheet.create({

});