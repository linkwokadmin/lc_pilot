import React from 'react'
import { View, Text, StyleSheet, TextInput, CheckBox, FlatList } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
export const QuestionMcq = ({ options, number }) => {
    /* this.state={} */
    console.log('-------------------', options);
    return (
        <View style={styles.conterner}>
            <FlatList
                keyExtractor={(item)=>item.value}
                data={options}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            value={item.value}
                            
                        />
                        <Text style={{ marginTop: 5 }}>{item.lable} </Text>
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