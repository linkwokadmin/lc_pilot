import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Text, ActivityIndicator, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { addName, addEmail, addPassword, registerUser } from '../actions/AuthActions';
import { Card, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
Icon.loadFont();
class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      Coach: true,
      Client: false
    }
  }
  _registerUser() {
    const { name, email, password } = this.props;
    const userType = this.state.Coach ? 'coach' : 'user';
    console.log(userType);
    this.props.registerUser({ name, email, password, userType });
  }

  renderRegisterButton() {
    if (this.props.signUpLoading) {
      return (<ActivityIndicator size="large" color="#00ff00" />)
    }
    return (
      <View style={styles.btnSignUp}>
        <Button title="SignUp" color='green' onPress={() => this._registerUser()} />
      </View>
    )
  }

  render() {
    return (

      <View style={styles.container}>

        <View style={styles.heder}>
          <Image source={require('../images/SuperCoach.png')} />
        </View>
        <View>
          <Card containerStyle={styles.loginCard}>
            <View style={styles.radioBtn}>
              <CheckBox
                center
                title='Client'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.Client}
                onPress={() => this.setState({
                  Coach: false,
                  Client: !this.state.Client
                })}
              />
              <CheckBox
                center
                title='Coach'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.Coach}
                onPress={() => this.setState({
                  Coach: !this.state.Coach,
                  Client: false
                })}
              />
            </View>


            <TextInput
              placeholder='Name:'
              placeholderTextColor='#000'
              style={styles.textInput}
              value={this.props.name}
              onChangeText={name => this.props.addName(name)}
            />
            <TextInput
              placeholder='Email:'
              placeholderTextColor='#000'
              style={styles.textInput}
              value={this.props.email}
              onChangeText={email => this.props.addEmail(email)}
            />
            <TextInput
              placeholder='Password:'
              placeholderTextColor='#000'
              style={styles.textInput}
              value={this.props.password}
              onChangeText={password => this.props.addPassword(password)}
            />
            <View style={styles.btnSignUpContainer}>
              {this.renderRegisterButton()}
              <View style={styles.btnSignUp}>
                <Button title="SignIn" color='green' onPress={() => Actions.loginScreen()} />
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
    name: state.AuthReducer.name,
    email: state.AuthReducer.email,
    password: state.AuthReducer.password,
    message: state.AuthReducer.message,
    signUpLoading: state.AuthReducer.signUpLoading
  }
)

export default connect(
  mapStateToProps,
  {
    addName,
    addEmail,
    addPassword,
    registerUser
  }
)(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  formGroup: {
    flex: 4,
    justifyContent: 'center',
  },

  btnSignUpContainer: {
    marginTop:  Platform.OS === 'ios' ? 0 : 15,
    height: 50,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  btnSignUp: {
    width: 100
  },
  heder: {
    marginTop: Platform.OS === 'ios' ? 100 : 70,
    alignItems: 'center'
  },
  loginCard: {
    height: Platform.OS === 'ios' ? 500 : 400,
    margin: 30
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
  radioBtn: {
    flexDirection: 'row',
    alignContent:'center',
    justifyContent:'center'
  },
});
