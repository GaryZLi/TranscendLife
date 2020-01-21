import React from 'react';
import {View, Text, Platform, StatusBar, SafeAreaView} from 'react-native';
import styles from "../Styles";

export default class TitleBar extends React.Component {
    render() {
        return(
            // <SafeAreaView></SafeAreaView>
            <View style={styles.TitleBarLook}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" backgroundColor="blue"></StatusBar>}
                <Text style={styles.TitleBarText}>
                        Transcend Life
                </Text>
            </View>
        )
    }
}