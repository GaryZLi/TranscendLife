import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    location () {
        navigator.geolocation.getCurrentPosition(
            (position) => console.log("position", position),
            (error) => console.log("error", error),
            {
                enableHighAccuracy: false,
                maximumAge: 10000,
                timeout: 8000
            }
        )
    }
    
    render() {
        return (
            <View style={styles.HomeStyle}>
               <Text>in homes</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    HomeStyle: {
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 20
    }
});