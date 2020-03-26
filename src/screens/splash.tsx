import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class splashScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.heder}>
                    <Image source={require('../images/SuperCoach.png')} />
                </View>
                <View style={styles.notes} >
                    <Text style={styles.notesName}> Mobile first Coaching Management App </Text>
                    <Text style={styles.notesName}> Secure chat, voice and video call with Clients (with recording features) </Text>
                    <Text style={styles.notesName}> Scheduling assistance, integrated with your favorite calendar apps. </Text>
                    <Text style={styles.notesName}> Create interactive and fun progress plans with your Clients. </Text>
                    <Text style={styles.notesName}>Create your own forms for discovery, session feedback, etc.  </Text>
                    <Text style={styles.notesName}>Digital Contracts. </Text>
                    <Text style={styles.notesName}>Send Invoices and receive Payments. </Text>

                </View>
                <View style={styles.btnStart}>
                    <Button
                        title="Get Start"
                        onPress={() =>  Actions.loginScreen()}
                    />
                </View>
            </View>
        )
    };

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heder: {
        marginTop: 100,
        alignItems: 'center'
    },
    hederName: {
        fontSize: 64,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    notes: {
        marginTop: 50,
        alignItems: 'center'
    },
    notesName: {
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '300',
        margin: 10
    },
    btnStart: {
        alignItems: 'center',
        marginTop: 100

    }
});