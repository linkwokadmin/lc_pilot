import React from 'react'
import { View, Text, StyleSheet, TextInput, CheckBox, FlatList } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const QuestionMcq = ({ question, options, number, onChange }) => {
    return (
        <View style={styles.conterner}>
            <FlatList
                keyExtractor={(item)=>item.value}
                data={options}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            value={question.value === item.label}
                            onValueChange={() => onChange(question, item)}
                        />
                        <Text style={{ marginTop: 5 }}>{item.label} </Text>
                    </View>
                )} />
        </View>
    );


};
const styles = StyleSheet.create({
    conterner: {
        flex: 1,
    }
});