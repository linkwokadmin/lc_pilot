import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image, Platform, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { splashRead } from '../actions/AuthActions';
import { Loading } from './../components/common/Loading'


export default class splashScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            read: false
        }
    }

    async componentDidMount(){
        let sp = await AsyncStorage.getItem('sread')
        if(sp === 'true') {
            this.setState({
                loading: false,
                read: true
            })
            Actions.loginScreen()
        } else {
            this.setState({
                loading: false,
                read: false
            })
        }
    }

    getStarted = () => {
        splashRead();
    }

    renderSplash = () => {
        return(
            <View style={styles.container}>
                <View style={styles.heder}>
                    <Image source={require('../images/SuperCoach.png')} />
                </View>
                <View style={styles.notes} >
                    <Text style={styles.notesName}>Mobile first Coaching Management App </Text>
                    <Text style={styles.notesName}>Secure chat, voice and video call with Clients (with recording features) </Text>
                    <Text style={styles.notesName}>Scheduling assistance, integrated with your favorite calendar apps. </Text>
                    <Text style={styles.notesName}>Create interactive and fun progress plans with your Clients. </Text>
                    <Text style={styles.notesName}>Create your own forms for discovery, session feedback, etc. </Text>
                    <Text style={styles.notesName}>Digital Contracts. </Text>
                    <Text style={styles.notesName}>Send Invoices and receive Payments. </Text>

                </View>
                <View style={styles.btnStart}>
                    <Button
                        title="Get Start"
                        onPress={() =>  this.getStarted()}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            this.state.loading ? <Loading /> :this.renderSplash()            
        )
    };

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heder: {
        marginTop: Platform.OS === 'ios' ? 100 : 30,
        alignItems: 'center'
    },
    hederName: {
        fontSize: 64,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    notes: {
        marginTop: Platform.OS === 'ios' ? 50 : 30,
        alignItems:  Platform.OS === 'ios' ? 'center' : 'flex-start'
    },
    notesName: {
        fontSize:  Platform.OS === 'ios' ? 18 : 15,
        fontStyle: 'normal',
        fontWeight: '300',
        margin: Platform.OS === 'ios' ? 10 : 11
    },
    btnStart: {
        alignItems: 'center',
        marginTop: 100

    }
});