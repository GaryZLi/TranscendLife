import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ProfileSettingScreen from "../screens/ProfileSettingScreen";  
import HomeScreen from "../screens/HomeScreen";

export default class Navigation extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         screen: "SignIn"
    //     }

    //     this.switch = this.switch.bind(this)
    // }

    // switch(comp) {
    //     console.log("in comp", comp)
    //     return () => {this.setState(() =>  ({screen: comp}))}
    // }

    render() {
        <Container/>
        // let display;

        // console.log("first:", this.state.screen)

        // if (this.state.screen === "SignIn") {
        //     display = <SignInScreen switch={this.switch}/>
        // }
        // else if (this.state.screen === "SignUp") {
        //     display = <SignUpScreen switch={this.switch}/>
        // }
        // else if (this.state.screen === "ProfileSetting") {
        //     display = <ProfileSettingScreen switch={this.switch}/>
        // }
        
        // return (
        //     display
        // )

    }
}

const Navigator = createStackNavigator({
    SignIn: {
        screen: SignInScreen
    },
    SignUp: {
        screen: SignUpScreen
    },
    ProfileSetting: {
        screen: ProfileSettingScreen
    },
    Home: {
        screen: HomeScreen
    }
});

const Container = createAppContainer(Navigator);