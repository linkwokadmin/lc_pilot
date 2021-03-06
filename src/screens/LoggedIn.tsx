import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Loading } from '../components/common';
import axios from 'axios';
import { api_url } from './../resources/constants'

export default class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      email: '',
      error: ''
    }
  }

  componentDidMount(){
    const headers = {
      'Authorization': 'Bearer ' + this.props.jwt
    };
    axios({
      method: 'GET',
      url: api_url + '/api/v1/my_user',
      headers: headers,
    }).then((response) => {
      // console.log(response.data.data)
      this.setState({
        email: response.data.data.email,
        loading: false
      });
    }).catch((error) => {
      this.setState({
        error: 'Error retrieving data',
        loading: false
      });
    });
  }

  render() {
    const { container, emailText, errorText } = styles;
    const { loading, email, error } = this.state;
    console.log(this.state.email);
    if (loading){
      return(
        <View style={container}>
          <Loading size={'large'} />
        </View>
      )
    } else {
        return(
          <View style={container}>
            <View>
              {email ?
                <Text style={emailText}>
                  Your email: {email}
                </Text>
                :
                <Text style={errorText}>
                  {error}
                </Text>}
            </View>
            <Button onPress={this.props.deleteJWT}>
              Log Out
            </Button>
          </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};
