import React, {Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {
  addName,
  addEmail,
  addPassword,
  registerUser,
} from '../actions/AuthActions';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {Avatar, Card, RadioButton, Badge, Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
Icon.loadFont();
class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      Coach: true,
      Client: false,
    };
  }
  _registerUser() {
    const {name, email, password} = this.props;
    const userType = this.state.Coach ? 'coach' : 'user';
    console.log(userType);
    this.props.registerUser({name, email, password, userType});
  }

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          {/* <Spinner
            visible={this.props.signUpLoading}
            textContent={'Loading...'}
            textStyle={{color: '#FFF'}}
          /> */}
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? 100 : 30,
              alignItems: 'center',
            }}>
            <Image source={require('../images/SuperCoach.png')} />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
              marginTop: 20,
            }}>
            <Card style={{width: '90%', elevation: 5, borderRadius: 5}}>
              <Card.Content>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 20,
                    fontStyle: 'normal',
                    fontWeight: '300',
                    marginLeft: 20,
                  }}>
                  I am a
                </Text>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <RadioButton
                      value={this.state.Client}
                      status={
                        this.state.Client === true ? 'checked' : 'unchecked'
                      }
                      onPress={() =>
                        this.setState({
                          Coach: false,
                          Client: !this.state.Client,
                        })
                      }
                    />
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: '300',
                      }}>
                      Client
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <RadioButton
                      value={this.state.Coach}
                      status={
                        this.state.Coach === true ? 'checked' : 'unchecked'
                      }
                      onPress={() =>
                        this.setState({
                          Coach: !this.state.Coach,
                          Client: false,
                        })
                      }
                    />
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: '300',
                        marginLeft: 10,
                      }}>
                      Coach
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center', padding: 16}}>
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
                  />
                  <TextInput
                    placeholder=" Password"
                    placeholderTextColor="#C4C4C4"
                    returnKeyType="next"
                    style={{
                      borderBottomColor: '#rgba(114, 114, 114, 0.5)',
                      borderBottomWidth: 1,
                    }}
                    value={this.props.password}
                    onChangeText={password => this.props.addPassword(password)}
                  />
                  <TextInput
                    placeholder=" Your name"
                    placeholderTextColor="#C4C4C4"
                    returnKeyType="next"
                    style={{
                      borderBottomColor: '#rgba(114, 114, 114, 0.5)',
                      borderBottomWidth: 1,
                    }}
                    value={this.props.name}
                    onChangeText={name => this.props.addName(name)}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity activeOpacity={0.5} style={{marginTop: 20}}>
                    <LinearGradient
                      colors={['#466A43', '#44D237']}
                      style={{
                        height: 44,
                        width: 269,
                        alignSelf: 'center',
                        borderRadius: 4,
                      }}
                      start={{x: 0, y: 2}}
                      end={{x: 4, y: 1}}
                      locations={[0, 0.3]}>
                      <Text style={styles.btnStart}> Upload Image </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{marginTop: 35}}
                    onPress={() => this._registerUser()}>
                    <LinearGradient
                      colors={['#466A43', '#44D237']}
                      style={{height: 44, width: 269, borderRadius: 4}}
                      start={{x: 0, y: 2}}
                      end={{x: 4, y: 1}}
                      locations={[0, 0.3]}>
                      <Text style={styles.btnStart}> Done </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  name: state.AuthReducer.name,
  email: state.AuthReducer.email,
  password: state.AuthReducer.password,
  message: state.AuthReducer.message,
  signUpLoading: state.AuthReducer.signUpLoading,
});

export default connect(
  mapStateToProps,
  {
    addName,
    addEmail,
    addPassword,
    registerUser,
  },
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
    marginTop: Platform.OS === 'ios' ? 0 : 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnSignUp: {
    width: 100,
  },
  heder: {
    marginTop: Platform.OS === 'ios' ? 100 : 70,
    alignItems: 'center',
  },
  loginCard: {
    height: Platform.OS === 'ios' ? 500 : 400,
    margin: 30,
  },
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
  radioBtn: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnStart: {
    fontSize: 18,
    textAlign: 'center',
    margin: 7,
    color: '#fff',
    backgroundColor: 'transparent',
  },
});
