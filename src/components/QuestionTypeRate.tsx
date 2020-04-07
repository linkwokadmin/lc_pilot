import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Rating } from 'react-native-elements';

export const QuestionRate = ({ question, number, filled, onChange }) => {
    return (
        <View>
            <Rating
                type='custom'
                ratingCount={5}
                imageSize={30}
                defaultRating={filled ? question.value : 0 }
                ratingColor='#4BA843'
                ratingBackgroundColor='#fff'
                onFinishRating={(rating) => onChange(question, rating) }
            />
        </View>
    );
};
const styles = StyleSheet.create({

});