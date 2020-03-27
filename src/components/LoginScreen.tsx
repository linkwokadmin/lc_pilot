import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableHighlight, ImageBackground, ActivityIndicator, Image, TouchableOpacity, Platform } from 'react-native';
import * as Strings from '../resources/strings';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { addEmail, addPassword, SignIN } from '../actions/AuthActions';
import { Card, CheckBox } from 'react-native-elements'

class LoginScreen extends Component {
  _SignIN() {
    const { email, password } = this.props;
    this.props.SignIN({ email, password });
  }
  renderAcessButton() {
    if (this.props.signInLoading) {
      return (<ActivityIndicator size="large" color="#00ff00" />)
    }
    return (<Button title='Login' onPress={() => this._SignIN()} />)

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heder}>
          <Image source={require('../images/SuperCoach.png')} />
        </View>
        <View>
          <Card containerStyle={styles.loginCard}>
            <View style={styles.formGroup}>
              <TextInput
                value={this.props.email}
                onChangeText={email => this.props.addEmail(email)}
                placeholder='Email & Phone'
                placeholderTextColor='#000'
                style={styles.textInput}
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
              />
              <TextInput
                value={this.props.password}
                onChangeText={password => this.props.addPassword(password)}
                placeholder='Password'
                placeholderTextColor='#000'
                style={styles.textInput}
                returnKeyType="go"
                ref={(input) => this.passwordInput = input}
              />

              <View style={styles.btnLogIn}>
                <View style={styles.btnLoginN}>
                  <Button title='Sign Up' onPress={() => Actions.signUpScreen()} />
                </View>
                <View style={styles.btnLoginN}>
                  {this.renderAcessButton()}


                </View>
              </View>
            </View>
          </Card>
        </View>
      </View>

    );
  }
}

const mapStateToProps = state => (
  {
    email: state.AuthReducer.email,
    password: state.AuthReducer.password,
    message: state.AuthReducer.message,
    signInLoading: state.AuthReducer.signInLoading
  }
)

export default connect(mapStateToProps, { addEmail, addPassword, SignIN })(LoginScreen);

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 40,
    color: '#000',
    fontStyle: 'italic'
  },
  formGroup: {
  },
  textInput: {
    fontSize: 18,
    height: 50,
    borderEndWidth: 0,
    margin: Platform.OS === 'ios' ? 22 : 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  textRegister: {
    fontSize: 16,
    color: '#000',
    margin: 18
  },
  btnLogIn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1
  },
  heder: {
    marginTop: Platform.OS === 'ios' ? 100 : 80,
    alignItems: 'center'
  },
  loginCard: {
    height: 300,
    margin: 30
  },
  btnLoginN: {
    margin: 20,
    width: 100
  }

});
