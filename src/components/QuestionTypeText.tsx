import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

export const QuestionText = ({ question, number, filled, onChange }) => {
    return (
        <View>
            <TextInput
                multiline
                style={{
                    height: 100, borderColor: '#CBCAC9',
                    borderWidth: 1
                }}
                placeholder="Type here"
                onChangeText={(text) => { onChange(question, text) }} />
        </View>
    );
};
const styles = StyleSheet.create({

});