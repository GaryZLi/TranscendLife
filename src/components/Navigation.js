import React from "react";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PreferenceScreen from "../screens/PreferenceScreen";  
import HomeScreen from "../screens/HomeScreen";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screen: "SignIn",
            firstName: "",
            lastName: "",
            data: {},
        }

        this.switch = this.switch.bind(this)
    }

    switch(component) {
        this.setState(() =>  ({screen: component}))
    }

    render() {
        let display;

        if (this.state.screen === "SignIn") {
            display = <SignInScreen switch={this.switch}/>
        }
        else if (this.state.screen === "SignUp") {
            display = <SignUpScreen switch={this.switch}/>
        }
        else if (this.state.screen === "PreferenceScreen") {
            display = <PreferenceScreen switch={this.switch}/>
        }
        else if (this.state.screen === "Home") {
            display = <HomeScreen switch={this.switch}/>
        }

        return (display)
    }
}