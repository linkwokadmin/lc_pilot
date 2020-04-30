import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, TouchableOpacity,TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card } from 'react-native-material-design';
export default class AllComponent extends Component {
    render() {
        return (
            <View style={styles.MainContainer}>
                <View>
                    {/* npm install react-native-linear-gradient --save */}
                    <TouchableOpacity activeOpacity={.5}>
                        <LinearGradient colors={['#1A7128', '#7BC035']} style={styles.LinearGradientStyle} start={{ x: 0, y: 1 }}
                            end={{ x: 4, y: 1 }}
                            locations={[0, 0.3, 0.9]}><Text style={styles.buttonText}> Get Started </Text>
                        </LinearGradient>
                    </TouchableOpacity >
                </View>
                <View>
                    <Card >
                        <Text>Mit</Text>
                    </Card>
                </View>

            </View >
        )
    }

}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
      
    },

    LinearGradientStyle: {
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginBottom: 20
    },

    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 7,
        color: '#fff',
        backgroundColor: 'transparent'

    },

});