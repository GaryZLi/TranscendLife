import React from "react";
// import { createSwitchNavigator, createAppContainer } from "react-navigation";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ProfileSettingScreen from "../screens/ProfileSettingScreen";  
import HomeScreen from "../screens/HomeScreen";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screen: "SignIn"
        }

        this.switch = this.switch.bind(this)
    }

    switch(comp) {
        this.setState(() =>  ({screen: comp}))
    }

    render() {
        let display;

        if (this.state.screen === "SignIn") {
            display = <SignInScreen switch={this.switch}/>
        }
        else if (this.state.screen === "SignUp") {
            display = <SignUpScreen switch={this.switch}/>
        }
        else if (this.state.screen === "ProfileSetting") {
            display = <ProfileSettingScreen switch={this.switch}/>
        }
        else if (this.state.screen === "Home") {
            display = <HomeScreen switch={this.switch}/>
        }

        return (display)
    }
}