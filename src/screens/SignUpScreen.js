import React from "react";
import {Text, TextInput, Button, Keyboard, View} from "react-native";
import styles from "../Styles";

import firebase from "firebase";

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            firstName: "",
            lastName: "",
            email: "",
            reEmail: "",
            password: "",
            rePassword: "",
            error: false,
            errorMsg: "",
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);

        // this.keyboardDidShow = this.keyboardDidShow.bind(this);
        // this.keyboardDidHide = this.keyboardDidHide.bind(this);
    }

    // componentDidMount() {
    //     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    //     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    // }

    // componentWillUnmount() {
    //     this.keyboardDidHideListener.remove();
    //     this.keyboardDidShowListener.remove();
    // }

    // keyboardDidShow() {
    //     this.setState({paddingBottom: 100})
    // }

    // keyboardDidHide() {
    //     this.setState({paddingBottom: 0})
    // }

        
    

    // this.props.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    // .catch(error => this.setState({errorMsg: error}));
    // this.props.firebase.
    handleSubmit() {
        if (this.state.email === "" || this.state.reEmail === "" || this.state.firstName === "" || this.state.lastName === "" || this.state.password === "" || this.state.rePassword === "") {
            this.setState({error: true, errorMsg: "Please fill out all fields!"});
            return
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {this.setState({error: true, errorMsg: error.code})});

        let username = ""
        for (let i = 0; i < this.state.email.length; i++)
        {
            if (this.state.email[i] === '.') {
                username += "dot";
            }
            else {
                username += this.state.email[i];
            }
        }

        firebase.database().ref("Users/" + username).set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        }).catch(error => {this.setState({error: true, errorMsg: error.code})});
    }



    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={styles.signUpText}>
                    Sign Up
                </Text>
                <TextInput style={styles.inputBoxStyle} placeholder="First Name" value={this.state.firstName} onChangeText={(text) => {this.setState({firstName: text})}}></TextInput>
                <TextInput style={styles.inputBoxStyle} placeholder="Last Name" value={this.state.lastName} onChangeText={(text) => {this.setState({lastName: text})}}></TextInput>
                <TextInput style={styles.inputBoxStyle} placeholder="Email" value={this.state.email} onChangeText={(text) => {this.setState({email: text})}}></TextInput>
                <TextInput style={styles.inputBoxStyle} placeholder="Re-enter Email" value={this.state.reEmail} onChangeText={(text) => {this.setState({reEmail: text})}}></TextInput>
                <TextInput style={styles.inputBoxStyle} placeholder="Password" value={this.state.password} onChangeText={(text) => {this.setState({password: text})}}></TextInput>
                <TextInput style={styles.inputBoxStyle} placeholder="Re-enter Password" value={this.state.rePassword} onChangeText={(text) => {this.setState({rePassword: text})}}></TextInput>
                <Button title="Sign Up" onPress={this.handleSubmit}/>
                {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
            </View>
        )
    }
}