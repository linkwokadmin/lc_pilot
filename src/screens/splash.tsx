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
                <View style={styles.MainContainer}>
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
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.getStarted()}>
                            <LinearGradient colors={['#1A7128', '#7BC035']} style={styles.LinearGradientStyle} start={{ x: 0, y: 1 }}
                                end={{ x: 4, y: 1 }}
                                locations={[0, 0.3, 0.9]}><Text style={styles.btnStart}> Get Started </Text>
                            </LinearGradient>
                        </TouchableOpacity >

                    </View>

                    <View>
                        {/* npm install react-native-linear-gradient --save */}

                    </View>


                    {/* ---------------------Login Screen ------------------- */}



                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Card style={{ width: '90%', elevation: 5, borderRadius: 5 }}>
                            <Card.Content>
                                <View >
                                    <View style={{ padding: 16 }}>
                                        <TextInput
                                            placeholder=' Phone or Email'
                                            placeholderTextColor='#C4C4C4'
                                            returnKeyType="next"
                                            style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1 }}
                                        />
                                        {/* value={this.props.email}
                                        onChangeText={email => this.props.addEmail(email)}
                                        onSubmitEditing={() => this.passwordInput.focus()} */}
                                        <TextInput placeholder='Password'
                                            placeholderTextColor='#C4C4C4'
                                            returnKeyType="go"
                                            style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1 }}
                                        />
                                        {/* ref={(input) => this.passwordInput = input}
                                        onChangeText={password => this.props.addPassword(password)}
                                        value={this.props.password} */}
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 53 }}>
                                        <TouchableOpacity activeOpacity={.5}>
                                            <LinearGradient colors={['#1A7128', '#7BC035']} style={{ height: 44, width: 147, borderRadius: 4 }} start={{ x: 0, y: 1 }}
                                                end={{ x: 4, y: 1 }}
                                                locations={[0, 0.3, 0.9]}><Text style={{
                                                    fontSize: 18,
                                                    textAlign: 'center',
                                                    margin: 7,
                                                    color: '#fff',
                                                    backgroundColor: 'transparent'
                                                }}> Sign up </Text>
                                            </LinearGradient>
                                        </TouchableOpacity >
                                        <TouchableOpacity activeOpacity={.5}>
                                            <LinearGradient colors={['#1A7128', '#7BC035']} style={{ height: 44, width: 147, borderRadius: 4 }} start={{ x: 0, y: 1 }}
                                                end={{ x: 4, y: 1 }}
                                                locations={[0, 0.3, 0.9]}><Text style={{
                                                    fontSize: 18,
                                                    textAlign: 'center',
                                                    margin: 7,
                                                    color: '#fff',
                                                    backgroundColor: 'transparent'
                                                }}> Login </Text>
                                            </LinearGradient>
                                        </TouchableOpacity >
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    </View>

                    {/* ---------------------Sign up Screen ------------------- */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
                        <Card style={{ width: '90%', elevation: 5, borderRadius: 5 }}>
                            <Card.Content>

                                <Text style={{ fontFamily: 'Roboto', fontSize: 20, fontStyle: 'normal', fontWeight: '300', marginLeft: 20 }} >I am a</Text>

                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>

                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <RadioButton
                                            value="first"
                                            status={this.state.checked === 'first' ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ checked: 'first' }); }}
                                        />
                                        <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300' }} >Client</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <RadioButton
                                            value="first"
                                            status={this.state.checked === 'first' ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ checked: 'first' }); }}
                                        />
                                        <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300', marginLeft: 10 }} >Coach</Text>
                                    </View>

                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
                                    <TextInput
                                        placeholder=' Phone or Email'
                                        placeholderTextColor='#C4C4C4'
                                        returnKeyType="next"
                                        style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1 }}
                                    />
                                    <TextInput
                                        placeholder=' Password'
                                        placeholderTextColor='#C4C4C4'
                                        returnKeyType="next"
                                        style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1 }}
                                    />
                                    <TextInput
                                        placeholder=' Your name'
                                        placeholderTextColor='#C4C4C4'
                                        returnKeyType="next"
                                        style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1 }}
                                    />


                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity activeOpacity={.5} style={{ marginTop: 20 }}>
                                        <LinearGradient colors={['#466A43', '#44D237']} style={{
                                            height: 44, width: 269, alignSelf: 'center', borderRadius: 4,
                                        }} start={{ x: 0, y: 2 }}
                                            end={{ x: 4, y: 1 }}
                                            locations={[0, 0.3, 0.9]}><Text style={styles.btnStart}>  Upload Image </Text>
                                        </LinearGradient>
                                    </TouchableOpacity >
                                    <TouchableOpacity activeOpacity={.5} style={{ marginTop: 35 }}>
                                        <LinearGradient colors={['#466A43', '#44D237']} style={{ height: 44, width: 269, borderRadius: 4 }} start={{ x: 0, y: 2 }}
                                            end={{ x: 4, y: 1 }}
                                            locations={[0, 0.3, 0.9]}><Text style={styles.btnStart}> Done </Text>
                                        </LinearGradient>
                                    </TouchableOpacity >
                                </View>
                            </Card.Content>
                        </Card>
                    </View>
                    {/* ---------------------Chat list  ------------------- */}

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>

                        <Card style={{ width: '90%', elevation: 3, height: 80, borderRadius: 5 }}>
                            <Card.Content>
                                <TouchableHighlight >
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                        <Image style={{ width: 40, height: 40, borderRadius: 50, alignContent: 'flex-start', marginTop: 5, backgroundColor: this.getColor() }} />
                                        <View style={{ alignContent: 'center', position: 'absolute', left: 55 }}>
                                            <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeightn: 'normal', color: '#000000' }}>Mit patel</Text>
                                            <Text style={{ fontFamily: 'Roboto', fontSize: 14, fontStyle: 'normal', fontWeightn: 'normal', color: '#000000', marginTop: 5 }}>mit@test.com</Text>
                                        </View>
                                        <View style={{ alignContent: 'flex-end' }}>
                                            <Text style={{ fontFamily: 'Roboto', fontSize: 12, fontStyle: 'normal', fontWeightn: 'norma', color: '#D5D2D2', padding: 0 }}>9:50 PM</Text>
                                            <Badge size={25} style={{ marginRight: 10, marginTop: 5 }} >20</Badge>
                                        </View>
                                    </View>
                                </TouchableHighlight >
                            </Card.Content>
                        </Card>
                    </View>

                    {/* ----------TEmplate card---------------- */}

                    <View style={{ flex: 1, marginBottom: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>

                        <Card style={{ height: 86, width: '90%', elevation: 2, borderRadius: 5 }}>
                            <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                                <TouchableHighlight >
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <View style={{ height: 86, width: 86, backgroundColor: this.getColor(), alignItems: 'flex-start' }}></View>
                                        <View style={{ alignContent: 'center', left: 20 }}>
                                            <Text style={{ fontFamily: 'Roboto', fontSize: 18, fontStyle: 'normal', fontWeightn: 'normal', color: '#000000', marginTop: 10 }}>Coaching Content</Text>
                                            <Text style={{ fontFamily: 'Roboto', fontSize: 14, fontStyle: 'normal', fontWeightn: 'normal', color: '#D3D2D1', marginTop: 5 }}>Created on 23 march,2020</Text></View>
                                    </View>
                                </TouchableHighlight>
                            </Card.Content>
                        </Card>

                    </View>
                    {/* --------------------------Add buttom----------------------- */}


                    <View style={{ flex: 1, marginBottom: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Card style={{ height: 86, width: '90%', elevation: 2 }}>
                            <Card.Content style={{ alignItems: 'center' }}>
                                <TouchableHighlight>
                                    <Text style={{ padding: 10, fontFamily: 'Roboto', fontSize: 18, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>+ Add New</Text>
                                </TouchableHighlight>
                            </Card.Content>
                        </Card>
                    </View>


                    {/* --------------------------SAVE and Edite buttom----------------------- */}

                    <View style={{ flex: 1, marginBottom: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>

                        <Card style={{ height: 86, width: '90%', elevation: 2, borderRadius: 5 }}>
                            <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                                <TouchableHighlight >
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
                                        <View style={{ height: 86, width: 86, backgroundColor: this.getColor(), alignItems: 'flex-start' }}></View>
                                        <View style={{ alignContent: 'center', left: 10 }}>
                                            <Text style={{ fontFamily: 'Roboto', fontSize: 18, fontStyle: 'normal', fontWeightn: 'normal', color: '#000000', marginTop: 10 }}>Coaching Content</Text>
                                            <Text style={{ fontFamily: 'Roboto', fontSize: 14, fontStyle: 'normal', fontWeightn: 'normal', color: '#D3D2D1', marginTop: 5 }}>Created on 23 march,2020</Text></View>

                                        <View style={{ height: 86, width: 70, backgroundColor: this.getColor(), alignItems: 'flex-end' }}>
                                            <TouchableOpacity activeOpacity={.5} >
                                                <LinearGradient colors={['#466A43', '#44D237']} style={{ height: 86, width: 70 }} start={{ x: 0, y: 2 }}
                                                    end={{ x: 4, y: 1 }}
                                                    locations={[0, 0.3, 0.9]}><Text style={{
                                                        fontSize: 18,
                                                        textAlign: 'center',
                                                        alignItems: 'center',
                                                        color: '#fff',
                                                        marginTop: 32,
                                                        backgroundColor: 'transparent'
                                                    }}> Done </Text>
                                                </LinearGradient>
                                            </TouchableOpacity >

                                        </View>

                                    </View>
                                </TouchableHighlight>
                            </Card.Content>
                        </Card>

                    </View>

                    {/* ----------------------------------Text question ------------------------ */}
                    <View style={{ flex: 1, marginBottom: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Card style={{ height: 135, width: '90%', elevation: 2 }}>
                            <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                                <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300', color: '#000000', marginTop: 12, marginLeft: 16 }}> What do you want coaching to do for you?</Text>
                                <View style={{ width: '90%', alignSelf: 'center' }}>
                                    <Card style={{ height: 86, elevation: 1, marginTop: 5, borderRadius: 5 }}>
                                        <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                                            <TextInput
                                                multiline

                                                placeholder="Type something..."
                                                onChangeText={(text) => { }}
                                            />
                                        </Card.Content>

                                    </Card>
                                </View>

                            </Card.Content>
                        </Card>
                    </View>

                    {/* ----------------------------------Slider Question ------------------------ */}
                    <View style={{ flex: 1, marginBottom: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Card style={{ height: 135, width: '90%', elevation: 2 }}>
                            <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                                <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300', color: '#000000', marginTop: 12, marginLeft: 16 }}>How comfortable are you with discussing feelings?</Text>
                                <View style={{ width: '80%', alignSelf: 'center', marginTop: 22 }}>
                                    <Slider
                                        minimumValue={0}
                                        maximumValue={5}
                                        step={1}
                                        thumbTintColor='#4BA843'
                                        maximumTrackTintColor='#linear-gradient(86.2deg, rgba(26, 113, 40, 0.5) -45.25%, rgba(99, 167, 31, 0.5) 61.01%)'
                                        minimumTrackTintColor='#linear-gradient(86.2deg, rgba(26, 113, 40, 0.5) -45.25%, rgba(99, 167, 31, 0.5) 61.01%)' />

                                </View>

                            </Card.Content>
                        </Card>
                    </View>

                    {/* ----------------------------------rating Question ------------------------ */}
                    <View style={{ flex: 1, marginBottom: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Card style={{ height: 135, width: '90%', elevation: 2 }}>
                            <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                                <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300', color: '#000000', marginTop: 12, marginLeft: 16 }}>How comfortable are you with discussing feelings?</Text>
                                <View style={{ width: '80%', alignSelf: 'center', marginTop: 22 }}>
                                    <Rating
                                        type='custom'
                                        ratingCount={5}
                                        imageSize={30}
                                        ratingColor='#4BA843'
                                        ratingBackgroundColor='#fff'
                                    />
                                </View>
                            </Card.Content>
                        </Card>
                    </View>

                    {/* ----------------------------------radio button Question ------------------------ */}
                    <View style={{ flex: 1, marginBottom: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Card style={{ width: '90%', elevation: 2 }}>
                            <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                                <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300', color: '#000000', marginTop: 12, marginLeft: 16 }}> What kind of accountability are you looking for?</Text>
                                <View style={{ width: '80%', alignSelf: 'flex-start', marginLeft: 16, marginTop: 22 }}>
                                    <CheckBox
                                        containerStyle={{ backgroundColor: '#fff', borderWidth: 0, padding: 0, margin: 0 }}
                                        title='I would like to be independent'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                    // checked={this.state.checked}
                                    />
                                    <CheckBox
                                        containerStyle={{ backgroundColor: '#fff', borderWidth: 0, padding: 0, margin: 0 }}
                                        title='I would like follow up from my coach'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                    // checked={}
                                    />
                                    <CheckBox
                                        containerStyle={{ backgroundColor: '#fff', borderWidth: 0, padding: 0, margin: 0, marginBottom: 10 }}
                                        title='Mix between indepdendent and follow up from coach.'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={true}
                                        checkedColor='#4BA843'

                                    />
                                </View>
                            </Card.Content>
                        </Card>
                    </View>
                    {/* ----------------------------------Add  Question ------------------------ */}
                    <View style={{ flex: 1, marginBottom: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Card style={{ width: '90%', elevation: 2 }}>
                            <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 0, margin: 0, marginTop: 20 }}>
                                    <TouchableOpacity style={{ padding: 0, margin: 0, marginLeft: 16, borderBottomColor: '#4BA843', borderStyle: 'solid', borderBottomWidth: 1 }}>
                                        <Text style={{ fontFamily: 'Roboto', fontSize: 19, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>MCQ</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity >
                                        <Text style={{ fontFamily: 'Roboto', fontSize: 19, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>Text</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginRight: 16 }}>
                                        <Text style={{ fontFamily: 'Roboto', fontSize: 19, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>Rate</Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={{ alignSelf: 'center', width: '90%', marginTop: 16 }}>
                                    <TextInput
                                        placeholder='Type question here*'
                                        placeholderTextColor='#C4C4C4'
                                        returnKeyType="next"
                                        style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1, marginBottom: 10 }}
                                    />
                                </View>
                                {/* ----------------question  MCQ start---------------------------- */}
                                <View style={{ flex: 1, width: '90%' }}>
                                    <View>
                                        <View style={{ flex: 1, flexDirection: 'row', width: '85%', padding: 0, margin: 0, marginLeft: 16 }}>
                                            <CheckBox
                                                containerStyle={{ backgroundColor: '#fff', alignItems: 'flex-start', padding: 0, margin: 0 }}
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                checkedColor='#4BA843'
                                            />
                                            <TextInput
                                                multiline
                                                style={{ marginLeft: 16, padding: 0, margin: 0 }}
                                                placeholder='Type option here*'
                                                placeholderTextColor='#C4C4C4'
                                                returnKeyType="next" />

                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', width: '85%', padding: 0, margin: 0, marginLeft: 16 }}>
                                            <CheckBox
                                                containerStyle={{ backgroundColor: '#fff', alignItems: 'flex-start', padding: 0, margin: 0 }}
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                checkedColor='#4BA843'
                                            />
                                            <TextInput
                                                multiline
                                                style={{ marginLeft: 16, padding: 0, margin: 0 }}
                                                placeholder='Type option here*'
                                                placeholderTextColor='#C4C4C4'
                                                returnKeyType="next" />

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, width: '90%', marginTop: 18, marginBottom: 10 }}>
                                    <TouchableOpacity style={{ marginLeft: 20 }}>
                                        <Text style={{ fontFamily: 'Roboto', fontSize: 12, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>+ Add option</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* ----------------question  MCQ close---------------------------- */}

                                {/* -------------------------Question Text start----------------------------- */}
                                <View style={{ alignSelf: 'center', width: '90%', marginTop: 16 }}>
                                    <TextInput
                                        placeholder='Type question here*'
                                        placeholderTextColor='#C4C4C4'
                                        returnKeyType="next"
                                        style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1, marginBottom: 10 }}
                                    />
                                    <Text style={{ fontFamily: 'Roboto', fontSize: 12, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>Text box will appear under question.</Text>
                                </View>
                                {/* -------------------------Question Text close----------------------------- */}

                                {/* -------------------------Question Rating start----------------------------- */}
                                <View style={{ alignSelf: 'center', width: '90%', marginTop: 16 }}>
                                    <TextInput
                                        placeholder='Type question here*'
                                        placeholderTextColor='#C4C4C4'
                                        returnKeyType="next"
                                        style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1, marginBottom: 10 }}
                                    />
                                     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 0, margin: 0, marginTop: 20 }}>
                                        <TouchableOpacity style={{ padding: 0, margin: 0, marginLeft: 16, borderBottomColor: '#4BA843', borderStyle: 'solid', borderBottomWidth: 1 }}>
                                            <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>Slider</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ padding: 0, margin: 0, marginLeft: 16, borderBottomColor: '#4BA843', borderStyle: 'solid', borderBottomWidth: 1 }}>
                                            <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>Star</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* ----------slider rating start-------- */}
                                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 22 }}>
                                        <Slider
                                            minimumValue={0}
                                            maximumValue={5}
                                            thumbTintColor='#4BA843'
                                            maximumTrackTintColor='#linear-gradient(86.2deg, rgba(26, 113, 40, 0.5) -45.25%, rgba(99, 167, 31, 0.5) 61.01%)'
                                            minimumTrackTintColor='#linear-gradient(86.2deg, rgba(26, 113, 40, 0.5) -45.25%, rgba(99, 167, 31, 0.5) 61.01%)' />
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
                                            <TextInput
                                                placeholder='Low value*'
                                                placeholderTextColor='#C4C4C4'
                                                returnKeyType="next"
                                                style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1, padding: 0, margin: 0, marginRight: 40 }}
                                            />
                                            <TextInput
                                                placeholder='High value*'
                                                placeholderTextColor='#C4C4C4'
                                                returnKeyType="next"
                                                style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1, margin: 0, padding: 0, marginLeft: 40 }}
                                            />
                                        </View>
                                    </View>
                                     {/* ----------slider rating end-------- */}
                                    {/* ----------star rating start-------- */}
                                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 30 }}>
                                        <Rating
                                            type='custom'
                                            ratingCount={5}
                                            imageSize={20}
                                            ratingColor='#4BA843'
                                            ratingBackgroundColor='#fff'
                                        />
                                    </View>

                                    {/* ----------star rating stop-------- */}
                                 </View>
                                <View style={{ flex: 1, width: '100%', marginTop: 18, marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ width: 30, borderBottomColor: '#C4C4C4', borderStyle: 'solid', borderBottomWidth: 4, marginRight: '20%' }}></View>
                                    <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 18, padding: 0, margin: 0, marginBottom: 5 }}>
                                        {/* <Image source={require('../images/outline_save_black_18dp.png' )} style={{padding:0,margin:0}} /> */}
                                        <Text style={{ fontFamily: 'Roboto', fontSize: 18, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1', margin: 0, padding: 0 }}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 18 }}>
                                        <Image source={require('../images/remove.png')} />
                                    </TouchableOpacity>
                                </View>
                              </Card.Content>
                        </Card>
                    </View>
                      {/* ----------------------------------Add  Question close ------------------------ */}
                      <View style={{ flex: 1, marginBottom: 20, marginTop: 20,width:'90%',justifyContent:'center',alignSelf: 'center'}}>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 53 }}>
                                        <TouchableOpacity activeOpacity={.5}>
                                            <LinearGradient colors={['#C4C4C4', '#C4C4C4']} style={{ height: 44, width: 147, borderRadius: 4 }} start={{ x: 0, y: 1 }}
                                                end={{ x: 4, y: 1 }}
                                                locations={[0, 0.3, 0.9]}><Text style={{
                                                    fontSize: 18,
                                                    textAlign: 'center',
                                                    margin: 7,
                                                    color: '#fff',
                                                    backgroundColor: 'transparent'
                                                }}> Cancel </Text>
                                            </LinearGradient>
                                        </TouchableOpacity >
                                        <TouchableOpacity activeOpacity={.5}>
                                            <LinearGradient colors={['#1A7128', '#7BC035']} style={{ height: 44, width: 147, borderRadius: 4 }} start={{ x: 0, y: 1 }}
                                                end={{ x: 4, y: 1 }}
                                                locations={[0, 0.3, 0.9]}><Text style={{
                                                    fontSize: 18,
                                                    textAlign: 'center',
                                                    margin: 7,
                                                    color: '#fff',
                                                    backgroundColor: 'transparent'
                                                }}> Save </Text>
                                            </LinearGradient>
                                        </TouchableOpacity >
                                    </View>

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
    }, btnStart: {
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