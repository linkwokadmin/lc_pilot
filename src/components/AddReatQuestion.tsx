import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    addContact,
    registerNewContact
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import { Rating} from 'react-native-elements';

class AddReatQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "statement": "",
            "type": "rate",
            "weight": "1",
            "options": [],
            "value": "val"
        }
    }

    componentDidMount(){
        this.setState(this.props.savedState)
    }

    handleSave = () => {
        console.log(this.state);
        this.props.handleUpdate(this.props.idx, this.state);
    }

    render() {
        return (
            <Fragment>
                <View style={{ alignSelf: 'center', width: '90%', marginTop: 16 }}>
                    <TextInput
                        value={this.state.statement}
                        placeholder="Question Text"
                        onChangeText={(value) => this.setState({ statement: value })}
                        placeholderTextColor='#C4C4C4'
                        returnKeyType="next"
                        style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1, marginBottom: 10 }}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 0, margin: 0, marginTop: 20 }}>
                        <TouchableOpacity style={{ padding: 0, margin: 0, marginLeft: 16 }}>
                            <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>Slider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 0, margin: 0, marginLeft: 16, borderBottomColor: '#4BA843', borderStyle: 'solid', borderBottomWidth: 1 }}>
                            <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>Star</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        /* 
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
                        */
                    }
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 30 }}>
                        <Rating
                            type='custom'
                            ratingCount={5}
                            imageSize={20}
                            ratingColor='#4BA843'
                            ratingBackgroundColor='#fff'
                        />
                    </View>
                </View>
                <View style={{ flex: 1, width: '100%', marginTop: 18, marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <View style={{ width: 30, borderBottomColor: '#C4C4C4', borderStyle: 'solid', borderBottomWidth: 4, marginRight: '20%' }}></View>
                    <TouchableOpacity 
                    style={{ alignItems: 'flex-end', marginRight: 18, padding: 0, margin: 0, marginBottom: 5 }}
                    onPress={() => this.handleSave()}
                    >
                        {/* <Image source={require('../images/outline_save_black_18dp.png' )} style={{padding:0,margin:0}} /> */}
                        <Text style={{ fontFamily: 'Roboto', fontSize: 18, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1', margin: 0, padding: 0 }}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 18 }}>
                        <Image source={require('../images/remove.png')} />
                    </TouchableOpacity>
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    saveBtn: {
        position: 'absolute',
        bottom: 20
    },
    textLbl: {
        color: 'green',
        marginTop:20
    },
})

const mapStateToProps = state => (
    {
        email_contact: state.AppReducer.email_contact,
    }
);


export default connect(
    mapStateToProps, {
    addContact,
    registerNewContact
})(AddReatQuestion);