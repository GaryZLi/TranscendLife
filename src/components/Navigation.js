import React from "react";
import {View} from "react-native";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ProfileSettingScreen from "../screens/ProfileSettingScreen";  
import HomeScreen from "../screens/HomeScreen";

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyDbeAGBSsUqQ5QdY8GwQl4rvmwc4kpEw_k",
        authDomain: "transcendlife-456de.firebaseapp.com",
        databaseURL: "https://transcendlife-456de.firebaseio.com",
        projectId: "transcendlife-456de",
        storageBucket: "transcendlife-456de.appspot.com",
        messagingSenderId: "300138407276",
        appId: "1:300138407276:web:61282efa844f397a3a3f49",
        measurementId: "G-CPF9HK0267"
    })
}

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screen: "SignIn"
        }
    }

    switch(comp) {
        return () => {this.setState(() =>  ({screen: comp}))}
    }

    render() {
        let display;

        if (this.state.screen === "SignIn") {
            display = <SignInScreen switch={this.switch.bind(this)}/>
        }
        else if (this.state.screen === "SignUp") {
            display = <SignUpScreen switch={this.switch.bind(this)}/>
        }

        return (
            display
        )
    }
}
