import React from "react";
import {View, Text, TextInput, Button, Image} from "react-native";
import styles from "../Styles";
import logo from "../picSrc/TL.png";

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ textAlign: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={logo} style={{width: "50%"}}/>
                    <TextInput style={styles.inputBoxStyle} placeholder="email" />
                    <TextInput style={styles.inputBoxStyle} placeholder="password" />
                    <Button title="Login" />
                    <Text style={{ marginTop: 30, marginBottom: 30 }}>
                        ---OR---
                    </Text>
                    <Button title="Sign up" onPress={this.props.switch("SignUp")} />
                </View>
            </View>
        )
    }
}
