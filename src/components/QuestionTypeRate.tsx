import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements';

export const QuestionRate = ({ question, number, filled, onChange }) => {
    return (
        <View>
            <AirbnbRating
                style={{width: 100}}
                count={5}
                reviews={["Terrible", "Bad", 'Good', "Very Good", "Amazing"]}
                defaultRating={filled ? question.value : 0 }
                size={30}
                onFinishRating={(rating) => onChange(question, rating) }
            />
        </View>
    );
};
const styles = StyleSheet.create({

});