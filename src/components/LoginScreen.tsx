import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {addEmail, addPassword, SignIN} from '../actions/AuthActions';
import LinearGradient from 'react-native-linear-gradient';
import {Card, Button} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

class LoginScreen extends Component {
  constructor(props) {
    super();
  }
  changeState() {}
  _SignIN() {
    const {email, password} = this.props;
    this.props.SignIN({email, password});
  }

  handleSignUp() {
    Actions.signUpScreen();
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.props.signInLoading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />

        <View style={styles.heder}>
          <Image source={require('../images/SuperCoach.png')} />
        </View>
        <View
          style={{flex: 1, top: 100, alignItems: 'center', marginBottom: 0}}>
          <Card style={{width: '90%', elevation: 5, borderRadius: 5}}>
            <Card.Content>
              <View>
                <View style={{padding: 16}}>
                  <TextInput
                    placeholder=" Phone or Email"
                    placeholderTextColor="#C4C4C4"
                    returnKeyType="next"
                    style={{
                      borderBottomColor: '#rgba(114, 114, 114, 0.5)',
                      borderBottomWidth: 1,
                    }}
                    value={this.props.email}
                    onChangeText={email => this.props.addEmail(email)}
                    onSubmitEditing={() => this.passwordInput.focus()}
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#C4C4C4"
                    returnKeyType="go"
                    secureTextEntry
                    style={{
                      borderBottomColor: '#rgba(114, 114, 114, 0.5)',
                      borderBottomWidth: 1,
                    }}
                    ref={input => (this.passwordInput = input)}
                    onChangeText={password => this.props.addPassword(password)}
                    value={this.props.password}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 30,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{marginRight: 10}}
                    onPress={this.handleSignUp}>
                    <LinearGradient
                      colors={['#1A7128', '#7BC035']}
                      style={{height: 44, width: 140, borderRadius: 4}}
                      start={{x: 0, y: 1}}
                      end={{x: 4, y: 1}}
                      locations={[0, 0.3]}>
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          margin: 7,
                          marginRight: 10,
                          color: '#fff',
                          backgroundColor: 'transparent',
                        }}>
                        {' '}
                        Sign up{' '}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginLeft: 10}}
                    activeOpacity={0.5}
                    onPress={() => this._SignIN()}>
                    <LinearGradient
                      colors={['#1A7128', '#7BC035']}
                      style={{height: 44, width: 140, borderRadius: 4}}
                      start={{x: 0, y: 1}}
                      end={{x: 4, y: 1}}
                      locations={[0, 0.3]}>
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          margin: 7,
                          marginLeft: 10,
                          color: '#fff',
                          backgroundColor: 'transparent',
                        }}>
                        {' '}
                        Login{' '}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  email: state.AuthReducer.email,
  password: state.AuthReducer.password,
  message: state.AuthReducer.message,
  signInLoading: state.AuthReducer.signInLoading,
});

export default connect(
  mapStateToProps,
  {addEmail, addPassword, SignIN},
)(LoginScreen);

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 40,
    color: '#000',
    fontStyle: 'italic',
  },
  formGroup: {},
  textInput: {
    fontSize: 18,
    height: 50,
    borderEndWidth: 0,
    margin: Platform.OS === 'ios' ? 22 : 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  textRegister: {
    fontSize: 16,
    color: '#000',
    margin: 18,
  },
  btnLogIn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  heder: {
    marginTop: Platform.OS === 'ios' ? 100 : 80,
    alignItems: 'center',
  },
  loginCard: {
    height: 300,
    margin: 30,
  },
  btnLoginN: {
    margin: 20,
    width: 100,
  },
});
