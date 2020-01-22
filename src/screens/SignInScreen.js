import React from "react";
import {View, Text, TextInput, Button, Image} from "react-native";
import styles from "../Styles";
import logo from "../picSrc/TL.png";
import firebase from "firebase";

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: false,
            errorMsg: ""
        }
        
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    // async handleSignIn() {
    //     if (this.state.email === "" || this.state.password === "") {
    //         return this.setState({error: true, errorMsg: "Please fill out all fields!"})
    //     }

    //     await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(async error => this.setState({error: true, errorMsg: error.code}))
    //     console.log("trying", this.state.errorMsg)
    //     if (this.state.error) {
    //         return
    //     }

    //     let username = ""
    //     for (let i = 0; i < this.state.email.length; i++)
    //     {
    //         if (this.state.email[i] === '.') {
    //             username += "dot";
    //         }
    //         else {
    //             username += this.state.email[i];
    //         }
    //     }

    //     let screen 
    //     const ref = firebase.database().ref("Users/" + username);
    //     ref.once("value", function(snapshot) {
    //         if (snapshot.hasChild("profile")) {
    //             screen = "Home";
                
    //         }
    //         else {
    //             screen = "ProfileSetting"
    //         }
    //     })        

    //     if (screen === "Home") {
    //         return this.props.switch("Home")
    //     }
    //     else {
    //         return this.props.switch("ProfileSetting")
    //     }        
    // }

    handleSignIn() {
        return this.props.switch("ProfileSetting")
    }

    handleSignUp() {
        this.props.switch("SignUp")
    }
    
    render() {
        return (
            <View style={{ textAlign: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={logo} style={{width: "50%"}}/>
                    <TextInput style={styles.inputBoxStyle} placeholder="email" value={this.state.email} onChangeText={(text) => this.setState({email: text})}/>
                    <TextInput style={styles.inputBoxStyle} placeholder="password" value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
                    <Button title="Login" onPress={this.handleSignIn}/>
                    {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
                    <Text style={{ marginTop: 30, marginBottom: 30 }} onPress={this.loc}>
                        ---OR---
                    </Text>
                    <Button title="Sign up" onPress={this.handleSignUp} />
                </View>
            </View>
        )
    }
}
