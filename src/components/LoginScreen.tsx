import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableHighlight, ImageBackground, ActivityIndicator } from 'react-native';
import * as Strings from '../resources/strings';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { addEmail, addPassword, SignIN } from '../actions/AuthActions';

class LoginScreen extends Component {

  _SignIN() {
    const { email, password } = this.props;
    this.props.SignIN({ email, password });
  }

  renderAcessButton() {
    if (this.props.signInLoading) {
      return (<ActivityIndicator size="large" color="#00ff00" />)
    }
    return (<Button title='Login' style={styles.btnLogIn}  onPress={() => this._SignIN()}/>)
  }

  render() {
    return (
      /* source={require('../images/ic_log_in_ackground.png')} */
      /*  <ImageBackground style={{ flex: 1, width: null, backgroundColor: '#75daad' }}> */
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Welcome to {Strings.app_name}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, color: 'red' }}>{this.props.message}</Text>
        </View>

        <View style={styles.formGroup}>


          <TextInput
            value={this.props.email}
            onChangeText={email => this.props.addEmail(email)}
            placeholder='Email:'
            placeholderTextColor='#fff'
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
          />
          <TextInput
            value={this.props.password}
            onChangeText={password => this.props.addPassword(password)}
            placeholder='Password:'
            placeholderTextColor='#fff'
            style={styles.textInput}
            returnKeyType="go"
            ref={(input) => this.passwordInput = input}
          />
          <TouchableHighlight onPress={() => Actions.signUpScreen()}>
            <Text style={styles.textRegister}>New to Whatsapp? Sign up now »</Text>
          </TouchableHighlight>
          <View style={styles.btnLogIn}>
            {this.renderAcessButton()}
          </View>
        </View>


      </View>
      /*   </ImageBackground> */
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#75daad'
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'10%'
  },
  textTitle: {
    fontSize: 40,
    color: '#ffffff',
    fontStyle:'italic'
  },
  formGroup: {
    flex: 4,
    margin: 20,  

  },
  textInput: {
    fontSize: 18,
    height: 50,
    borderEndWidth:1,
    margin:22,
    borderBottomWidth:1,
    borderBottomColor:'#fff'
  },
  textRegister: {
    fontSize: 16,
    color: '#A0A0A0',
    margin:18
  },
  btnLogIn: {
    backgroundColor:'#ffffff',
    
  },


});
