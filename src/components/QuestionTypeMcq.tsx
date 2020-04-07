import React from 'react'
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import { CheckBox } from 'react-native-elements' ;

export const QuestionMcq = ({ question, options, number, onChange }) => {
    console.log("val :",question.value)
    return (
        <View style={styles.conterner}>
            <FlatList
                keyExtractor={(item) => item.test}
                data={options}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            containerStyle={{width:'100%'}}
                            title={item.label}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={(question !== undefined && question.value) === item.label}
                            onPress={() => onChange(question, item) }
                        />
                    </View>
                )} />
        </View>
    );


}


const styles = StyleSheet.create({
    conterner: {
        flex: 1,
       
    }
});