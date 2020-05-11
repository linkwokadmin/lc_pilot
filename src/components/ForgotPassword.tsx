import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {Card, Button, TextInput} from 'react-native-paper';
import axios from 'axios';
import {api_url} from '../resources/constants';
import {Actions} from 'react-native-router-flux';


class ForgotPassword extends Component{
    constructor(props){
        super(props)
        this.state = {
            mobile_number: "",
            new_password: '',
            error: '',
            loading: false,
            mobile_verification: true,
            mobile_verified: false,
            otp_verified: false,
            otp: '',
            changePassword: false,
            new_password: ''
        };
    }

    setMobileNumber = (mobile_number) => {
        this.setState({mobile_number: mobile_number})
    }

    submitMobileNumber = () => {
        console.log("submitted")
        axios.post(api_url+'/api/v1/otp_for_change_password',{mobile_number: this.state.mobile_number})
        .then(response => {
            if(response.data.success){
              this.setState({...this.state,mobile_verification: false, mobile_verified: true})
              console.log(this.state)
            }else{
                this.setState({...this.state,error: response.data.message})
            }
        })
        .catch(error => {console.log(error)})
    }

    mobileVerification = () => {
        return(
            <View>
                <TextInput 
                placeholder="Enter your register mobile number"
                value={this.state.mobile_number}
                onChangeText = {mobile_number => this.setMobileNumber(mobile_number)}
                />
                <Button onPress= {this.submitMobileNumber}>
                    Submit
                </Button>
            </View>
        )
    }

    setOtp = (otp) => {
            this.setState({otp: otp})
    }

    submitOtp = () => {
        axios.post(api_url+'/api/v1/verify_otp', 
                    {mobile_number: this.state.mobile_number,
                     otp: this.state.otp
                    }
                ).then(response => {
                    console.log(response)
                    if(response.data.success){
                        this.setState({...this.state, mobile_verified: false, otp_verified: true})
                    }else{
                        
                    }
                })
    }

    otpVerification = () => {
        return(
            <View>
                <TextInput
                  placeholder="Enter Received Otp"
                  value={this.state.otp}
                  onChangeText = {otp => this.setOtp(otp)}
                />
                <Button onPress = {this.submitOtp}>
                    Submit
                </Button>
            </View>
        )
    }

    setPassword = (password) => {
        this.setState({new_password: password})
    }

    submitPassword = () => {
        axios.post(api_url+'/api/v1/change_password',
                    {
                      mobile_number: this.state.mobile_number,
                      new_password: this.state.new_password
                    }
                ).then(response => {
                    if(response.data.success){
                        Actions.loginScreen()
                    }
                })
    }

    changePasswordForm = () => {
        return(
            <View>
                <TextInput
                  placeholder="Enter New Password"
                  value={this.state.new_password}
                  onChangeText = {password => this.setPassword(password)}
                />
                <Button onPress = {this.submitPassword}>
                    Submit
                </Button>
            </View>
        )
    }


    render(){
        return(
            <View>
                <Card>
                  <Card.Content>
                    {this.state.mobile_verification && this.mobileVerification()}
                    {this.state.mobile_verified && this.otpVerification()}
                    {this.state.otp_verified && this.changePasswordForm()}
                  </Card.Content>
                </Card>
            </View>
        )
    }
}

export default ForgotPassword