import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Text, ActivityIndicator, Image } from 'react-native';
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
    this.props.registerUser({ name, email, password });
  }

  renderRegisterButton() {
    if (this.props.signUpLoading) {
      return (<ActivityIndicator size="large" color="#00ff00" />)
    }
    return (<Button title="SignUp" color='green' onPress={() => this._registerUser()} />)
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
            <View style={styles.btnSignUp}>
              {this.renderRegisterButton()}
              <Button title="SignIn" color='green' onPress={() => Actions.loginScreen()} />
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

  btnSignUp: {
    height: 50,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  heder: {
    marginTop: 100,
    alignItems: 'center'
  },
  loginCard: {
    height: 500,
    margin: 30
  },
  textInput: {
    fontSize: 18,
    height: 50,
    borderEndWidth: 0,
    margin: 22,
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
  }
});
