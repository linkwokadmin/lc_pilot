import React, {Component} from 'react';
import moment from 'moment';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {fetchUserTemplates} from '../actions/AppActions';
import DialogInput from 'react-native-dialog-input';
import axios from 'axios';
import {api_url} from '../resources/constants';
import {AsyncStorage} from 'react-native';
import {Card} from 'react-native-paper';

class UserTemplateScene extends Component {
  constructor(props) {
    super();
    this.state = {
      dialogVisible: false,
      newTemplate: null,
    };
  }

  componentDidMount() {
    this.fetchUserTemplates();
    // console.log(this.props);
  }

  componentDidUpdate() {
    // this.fetchUserTemplates();
  }

  fetchUserTemplates = async () => {
    this.props.actions.fetchUserTemplates(
      this.props.creatorId,
      this.props.userId,
    );
  };

  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  handleCancel = () => {
    this.setState({dialogVisible: false});
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({dialogVisible: false});
  };

  handleName = name => {
    this.setState({dialogVisible: false});
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url = api_url + '/api/v1/templates';
        let data = {
          template: {
            name: name,
          },
        };
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(url, data, {
            headers: headers,
          })
          .then(response => {
            let template = response.data.data;
            Actions.editSurvey({title: template.name, id: template.id});
            // return template;
          })
          .catch(error => {
            console.log(error);
            return null;
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
        return null;
      });
  };

  renderRow(item) {
    const survey = item.item;
    return (
      <TouchableHighlight
        onPress={() => Actions.showSurvey({title: survey.name, id: survey.id})}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 15,
            borderBottomWidth: 1,
            borderColor: '#b7b7b7',
          }}>
          <View style={{marginLeft: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {survey.name}
            </Text>
            <Text style={{fontSize: 13}}>{survey.inserted_at}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  getColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderNewRow(item) {
    const survey = item.item;
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 2,
          marginTop: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Card style={{height: 86, width: '94%', elevation: 2, borderRadius: 5}}>
          <Card.Content
            style={{
              padding: 0,
              margin: 0,
              paddingHorizontal: 0,
              paddingTop: 0,
              paddingBottom: 0,
              paddingVertical: 0,
            }}>
            <TouchableHighlight
              style={{width: '100%', height: '100%'}}
              onPress={() =>
                Actions.showSurveyTemplate({
                  title: survey.name,
                  id: survey.id,
                  currentUser: this.props.currentUser,
                })
              }>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    height: 86,
                    width: 86,
                    backgroundColor: this.getColor(),
                    alignItems: 'flex-start',
                  }}
                />
                <View style={{alignContent: 'center', left: 20}}>
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 18,
                      fontStyle: 'normal',
                      fontWeightn: 'normal',
                      color: '#000000',
                      marginTop: 10,
                    }}>
                    {survey.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 14,
                      fontStyle: 'normal',
                      fontWeightn: 'normal',
                      color: '#D3D2D1',
                      marginTop: 5,
                    }}>
                    Created on{' '}
                    {moment(survey.created_at).format('Do MMMM, YYYY')}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          </Card.Content>
        </Card>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.templates}
          renderItem={data => this.renderNewRow(data)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    templates: state.ListTemplatesReducer.userTemplates,
    currentUser: state.AuthReducer.currentUser,
  };
};

const mapDispatchToProps = /* istanbul ignore next - redux function*/ dispatch => {
  return {
    actions: {
      fetchUserTemplates: (creatorId, userId) => {
        return dispatch(fetchUserTemplates(creatorId, userId));
      },
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  Header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#F5F5F5',
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 55,
    height: 55,
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(UserTemplateScene);
