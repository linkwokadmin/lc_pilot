import React, {Component} from 'react';
import {
  View,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Router, Scene, Actions} from 'react-native-router-flux';

import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import MainScreen from './components/MainScreen';
import WelcomeScreen from './components/WelcomeScreen';
import AddContactScreen from './components/AddContactScreen';
import AddTemplateScreen from './components/AddTemplateScreen';
import AddTextQuestion from './components/AddTextQuestion';
import AddMcqQuestion from './components/AddMcqQuestion';
import Chat from './components/Chat';
import SelectContact from './components/SelectContact';
import SurveyShowScreen from './components/SurveyShowScreen';
import TemplateSurveyShowScreen from './components/TemplateSurveyShowScreen';
import SurveyEditScreen from './components/SurveyEditScreen';
import EditTemplateScreen from './components/EditTemplateScreen';
import UserTemplateScene from './components/UserTemplateScene';
import CoachTemplateScene from './components/CoachTemplateScene';
import Mess from './services/Mess';
import splashScreen from './screens/splash';
import NewSplashScreen from './screens/NewSplash';
import ForgotPassword from './components/ForgotPassword';
import {Icon} from 'react-native-vector-icons/Icon';

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loading: true,
    };
  }
  componentWillMount() {
    AsyncStorage.getItem('@mytoken:key').then(token => {
      if (token != null) {
        this.setState({logged: true, loading: false});
      } else {
        this.setState({loading: false});
      }
    });
  }

  renderAcessRoutes() {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          {this.renderAcessRoutes()}
        </View>
      );
    }
    return (
      <Router
        navigationBarStyle={{backgroundColor: '#fff'}}
        titleStyle={{color: 'black'}}>
        <Scene key="app">
          <Scene
            key="splashScreen"
            component={splashScreen}
            hideNavBar={true}
            title="Splash"
            initial={!this.state.logged}
          />

          <Scene
            key="loginScreen"
            component={LoginScreen}
            title="Login"
            hideNavBar={true}
          />
          <Scene
            key="signUpScreen"
            component={SignUpScreen}
            title="SignUp"
            hideNavBar={true}
          />
          <Scene
            key="mainScreen"
            component={MainScreen}
            title="MainScreen"
            hideNavBar={true}
            initial={this.state.logged}
          />

          <Scene
            key="welcomeScreen"
            component={WelcomeScreen}
            title="WelcomeScreen"
          />
          <Scene
            key="addContactScreen"
            component={AddContactScreen}
            title="Add Contact"
          />
          <Scene
            key="userTemplateScene"
            component={UserTemplateScene}
            title="User Templates"
          />
          <Scene
            key="coachTemplateScene"
            component={CoachTemplateScene}
            title="Template List"
          />
          <Scene key="chat" component={Chat} title="Chat" hideNavBar={false} />
          <Scene
            key="selectContact"
            component={SelectContact}
            title="Select contact"
            hideNavBar={false}
          />
          <Scene
            key="addTemplate"
            component={AddTemplateScreen}
            title="Add Template"
          />
          <Scene
            key="addTextQuestion"
            component={AddTextQuestion}
            title="Add Text Question"
          />
          <Scene
            key="addMcqQuestion"
            component={AddMcqQuestion}
            title="Add Multiple-choice Question"
          />
          <Scene
            key="showSurvey"
            component={SurveyShowScreen}
            title="Survey Show"
            renderRightButton={this.EditIcon()}
          />
          <Scene
            key="showSurveyTemplate"
            component={TemplateSurveyShowScreen}
            title="Template Survey Show"
          />
          <Scene
            key="editSurvey"
            component={EditTemplateScreen}
            title="Survey Edit"
          />
          <Scene
            key="b_chat"
            component={Mess}
            title="b_Chat"
            hideNavBar={false}
            onRight={() => console.log(111)}
            rightButtonImage={null}
          />
        <Scene
        key="forgot_password"
        component={ForgotPassword}
        title="Forgot Password"
        hideNavBar={false}
        />
          </Scene>
      </Router>
    );
  }

  EditIcon() {
    return (
      <View style={{marginRight: 10}}>
        <TouchableOpacity onPress={() => Actions.editSurvey()}>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
