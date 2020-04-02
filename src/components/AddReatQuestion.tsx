import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    addContact,
    registerNewContact
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { api_url } from './../resources/constants';
import { Rating, AirbnbRating } from 'react-native-elements';

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
            <View>
                <Text style={styles.textLbl}>Question Text</Text>
                <TextInput
                    multiline
                    style={{
                        borderColor: '#CBCAC9',
                        borderWidth: 1,
                        height: 50
                    }}
                    value={this.state.statement}
                    placeholder="Question Text"
                    onChangeText={(value) => this.setState({ statement: value })}
                />
                <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "Good", "Very Good", "Amazing"]}
                    defaultRating={5}
                    size={20}
                />
                <Button
                    style={styles.saveBtn}
                    title="Save"
                    color="#115E54"
                    onPress={() => this.handleSave()}
                />
            </View>
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