import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import {AirbnbRating} from 'react-native-elements'

export const QuestionRate = ({ question, number, filled, onChange }) => {
    return (
        <View style={{padding:30}}>
            {
            filled ?
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "Good", "Very Good", "Amazing"]}
            defaultRating={0}
            size={20}
            style={{marginBottom}}

        />
            : 
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "Good", "Very Good", "Amazing"]}
            defaultRating={0}
            size={20}

        />
            }
        </View>
    );
};
const styles = StyleSheet.create({

});