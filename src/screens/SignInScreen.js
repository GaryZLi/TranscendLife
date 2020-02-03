import React from "react";
import {View, Text, TextInput, Image, Keyboard, TouchableWithoutFeedback} from "react-native";
import styles from "../Styles";
import logo from "../picSrc/TL.png";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

import {Platform, InteractionManager} from 'react-native';

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            screen: "PreferenceScreen",
            error: false,
            errorMsg: "",
        }
        
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.pressed = false;
    }

    // fix sign in to be synchronous!!!
    async handleSignIn() {
        this.setState({error: false, errorMsg: ""}, () => console.log("Attemping to sign in..."))
        // deny user to spam the Sign In button
        if (this.pressed) {
            return 
        }

        
        if (this.state.email === "" || this.state.password === "") {
            return this.setState({error: true, errorMsg: "Please fill out all fields!"})
        }

        // prevent the user from spamming sign in
        this.pressed = true;

        console.log("Signing in")

        // authenticate the user to log in
        let email = this.state.email.replace(/\s/g, '').toLowerCase();
        
        await firebase.auth().signInWithEmailAndPassword(email, this.state.password)
        // .then(this.setState({pressed: false}))
        .catch(error => this.setState({error: true, errorMsg: error.code}), this.pressed = false);

        if (this.state.error) {
            return 
        }

        // replace the email's '.' with "dot" to use to fetch profile
        let username = this.state.email.replace(/\./g, "dot").toLowerCase();

        // check whether the user has already set a preference or not
        const ref = firebase.database().ref("Users/" + username.replace(/\"/g, '').replace(/\s/g, '') + "/");
        await ref.once("value", (snapshot) => {
            if (snapshot.child("preferences").exists()) {
                this.setState({screen: "Home"})
            }
        })
        .catch(error => {this.setState({error: true, errorMsg: error.code})})

        if (this.state.error) {
            this.pressed = false;
            return 
        }

        // this.pressed = false;

        // change to the appropriate screen
        return this.props.switch(this.state.screen);     
    }


    // // // delete when done!!!!!!!!!!!!!
    // handleSignIn() {
    //     return this.props.switch("Home")
    // }

    handleSignUp() {
        this.props.switch("SignUp")
    }
    
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={logo} style={{width: "50%"}}/>
                    <TextInput style={styles.inputBoxStyle} placeholder="email" placeholderTextColor="#706f6e" value={this.state.email} onChangeText={(text) => this.setState({email: text})} onSubmitEditing={() => this.passwordInput.focus()}/>
                    <TextInput style={styles.inputBoxStyle} placeholder="password" placeholderTextColor="#706f6e" value={this.state.password} onChangeText={(text) => this.setState({password: text})} ref={input => {this.passwordInput = input}} onSubmitEditing={() => this.handleSignIn()} autoCapitalize="none"/>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleSignIn()}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
                    {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
                    <Text style={{ marginTop: 30, marginBottom: 30 }} onPress={this.loc}>
                        ---OR---
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleSignUp()}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
