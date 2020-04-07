import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Platform, AsyncStorage, TouchableOpacity, ScrollView, TextInput, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { splashRead } from '../actions/AuthActions';
import { Loading } from './../components/common/Loading'
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import { Avatar, Card, RadioButton, Badge, Button } from 'react-native-paper'
import { Rating, CheckBox } from 'react-native-elements';

export default class splashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            read: false,
            checked: 'first',
            Coach: true,
            Client: false,
            value: 0
        }

    }

    async componentDidMount() {
        let sp = await AsyncStorage.getItem('sread')
        if (sp === 'true') {
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
        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent:'center'
                 }}>
                    <View style={{
                        marginTop: Platform.OS === 'ios' ? 100 : 30,
                        alignItems: 'center'
                    }}>
                        <Image source={require('../images/SuperCoach.png')} />
                    </View>


                    <View style={{
                        marginTop: Platform.OS === 'ios' ? 50 : 30,
                        justifyContent: Platform.OS === 'ios' ? 'center' : 'center',
                        alignSelf:'center',
                         width:'90%',
                        
                    }} >
                        <Text style={{
                            fontSize: Platform.OS === 'ios' ? 18 : 15,
                            fontStyle: 'normal',
                            fontWeight: '300',
                            color:'#727272',textAlign: 'center',
                            margin: Platform.OS === 'ios' ? 10 : 11
                        }}>Mobile first Coaching Management App </Text>
                        <Text style={{
                            fontSize: Platform.OS === 'ios' ? 18 : 15,
                            fontStyle: 'normal',
                            fontWeight: '300',
                            color:'#727272',textAlign: 'center',
                            margin: Platform.OS === 'ios' ? 10 : 11
                        }}>Secure chat, voice and video call with Clients (with recording features) </Text>
                        


                        <Text style={{
                            fontSize: Platform.OS === 'ios' ? 18 : 15,
                            fontStyle: 'normal',
                            fontWeight: '300',color:'#727272',textAlign: 'center',
                            margin: Platform.OS === 'ios' ? 10 : 11
                        }}>Scheduling assistance, integrated with your favorite calendar apps. </Text>
                        <Text style={{
                            fontSize: Platform.OS === 'ios' ? 18 : 15,
                            fontStyle: 'normal',
                            fontWeight: '300',color:'#727272',textAlign: 'center',
                            margin: Platform.OS === 'ios' ? 10 : 11
                        }}>Create interactive and fun progress plans with your Clients. </Text>
                        <Text style={{
                            fontSize: Platform.OS === 'ios' ? 18 : 15,
                            fontStyle: 'normal',
                            fontWeight: '300',color:'#727272',textAlign: 'center',
                            margin: Platform.OS === 'ios' ? 10 : 11
                        }}>Create your own forms for discovery, session feedback, etc. </Text>
                        <Text style={{
                            fontSize: Platform.OS === 'ios' ? 18 : 15,
                            fontStyle: 'normal',
                            fontWeight: '300',color:'#727272',textAlign: 'center',
                            margin: Platform.OS === 'ios' ? 10 : 11
                        }}>Digital Contracts. </Text>
                        <Text style={{
                            fontSize: Platform.OS === 'ios' ? 18 : 15,
                            fontStyle: 'normal',
                            fontWeight: '300',color:'#727272',textAlign: 'center',
                            margin: Platform.OS === 'ios' ? 10 : 11
                        }}>Send Invoices and receive Payments. </Text>

                    </View>
                    <View>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.getStarted()}>
                            <LinearGradient colors={['#1A7128', '#7BC035']} style={styles.LinearGradientStyle} start={{ x: 0, y: 1 }}
                                end={{ x: 4, y: 1 }}
                                locations={[0, 0.3]}><Text style={styles.btnStart}> Get Started </Text>
                            </LinearGradient>
                        </TouchableOpacity >

                    </View>


                </View>
            </ScrollView>
        )
    }
    getColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    render() {
        return (
            this.renderSplash()
        )
    };

}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',

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
        alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start'
    },
    notesName: {
        fontSize: Platform.OS === 'ios' ? 18 : 15,
        fontStyle: 'normal',
        fontWeight: '300',
        margin: Platform.OS === 'ios' ? 10 : 11
    },

    LinearGradientStyle: {
        height: 40,
        width: '40%',
        alignSelf: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginBottom: 20
    }, 
    btnStart: {
        fontSize: 18,
        textAlign: 'center',
        margin: 7,
        color: '#fff',
        backgroundColor: 'transparent',
    },
    loginCard: {
        height: 300,
        margin: 30
    },
    btnLoginN: {
        margin: 20,
        width: 100
    },
    LgLogup: {
        height: 44,
        width: 147,
        borderRadius: 4
    }
});