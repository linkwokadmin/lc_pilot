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
  ScrollView,
} from 'react-native';
import {fetchCurrentUser} from '../actions/AuthActions';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';

export default class profileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            alignSelf: 'center',
          }}>
          <Image
            style={{
              width: 279,
              height: 214,
              borderColor: '#000',
              marginTop: 30,
              backgroundColor: '#fff',
              borderWidth: 1,
              shadowOpacity: 0.5,
              shadowRadius: 5,
            }}
            source={{
              uri: this.props.currentUser.profile_picture
                ? this.props.currentUser.profile_picture
                : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          {this.props.currentUser.name
            ? this.props.currentUser.name
            : 'Reopen Page'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 5,
          }}>
          <Icon name="phone" style={{padding: 10}} />
          <Text style={{fontSize: 16, color: '#000'}}>+91 0987654321</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 5,
          }}>
          <Icon name="email" style={{padding: 10}} />
          <Text style={{fontSize: 16, color: '#000'}}>
            {this.props.currentUser.email
              ? this.props.currentUser.email
              : 'No Data'}
          </Text>
        </View>
        <ScrollView style={{marginTop: 20, padding: 20}}>
          <View>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet,
              non justo, venenatis id pretium sed. Faucibus ut pulvinar in lacus
              varius. Praesent ac ullamcorper quis facilisis tortor. Tellus
              varius massa facilisi etiam ut donec at feugiat fringilla.
              Scelerisque id vel adipiscing vel aliquet amet a sagittis
              tristique. Nunc enim nunc, viverra sit cras facilisi porta metus,
              sodales. Pulvinar lacus, condimentum cras convallis integer eget
              non placerat orci. Vitae massa tortor sed quis eget pellentesque
              condimentum facilisis. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. In amet, non justo, venenatis id pretium sed.
              Faucibus ut pulvinar in lacus varius. Praesent ac ullamcorper quis
              facilisis tortor. Tellus varius massa facilisi etiam ut donec at
              feugiat fringilla. Scelerisque id vel adipiscing vel aliquet amet
              a sagittis tristique. Nunc enim nunc, viverra sit cras facilisi
              porta metus, sodales. Pulvinar lacus, condimentum cras convallis
              integer eget non placerat orci. Vitae massa tortor sed quis eget
              pellentesque condimentum facilisis
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  loadProfileImage(x) {
    if (x != null || x != undefined || x != '') {
      return x;
    }
    return 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png';
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.AuthReducer.currentUser,
  };
};

export default compose(connect(mapStateToProps))(profileScreen);
const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    height: '90%',
    width: '85%',
    marginTop: 20,
    backgroundColor: '#C4C4C4',
  },
  userImage: {
    width: '50%',
    height: '50%',
    alignSelf: 'flex-start',
    marginTop: -100,
  },
});
