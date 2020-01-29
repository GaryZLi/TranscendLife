import React from "react";
import {Text, TextInput, View, TouchableWithoutFeedback, Keyboard} from "react-native";
import styles from "../Styles";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

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
            pressed: false,
        }
    
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    async handleSignUp() {
        if (this.state.pressed) {
            return this.set({error: true, errorMsg: "Please wait!"})
        }

        if (this.state.email === "" || this.state.reEmail === "" || this.state.firstName === "" || this.state.lastName === "" || this.state.password === "" || this.state.rePassword === "") {
            return this.setState({error: true, errorMsg: "Please fill out all fields!"});
        }

        if (this.state.email.replace(/\s/g, '').toLowerCase() !== this.state.reEmail.replace(/\s/g, '').toLowerCase()) {
            return this.setState({error: true, errorMsg: "Emails do not match!"});
        }

        if (this.state.password !== this.state.rePassword) {
            return this.setState({error: true, errorMsg: "Passwords do not match!"});
        }

        // reset error to not get stuck in the next if-statement
        this.setState({error: false, errorMsg: ""})

        // add user to the database system  
        let email = this.state.email.replace(/\s/g, '').toLowerCase();
        await firebase.auth().createUserWithEmailAndPassword(email, this.state.password)
        .then(this.setState({pressed: false}))
        .catch(error => {this.setState({error: true, errorMsg: error.code, pressed: false})});
        
        // return if theres an error
        if (this.state.error) {
            return 
        }
        
        // turn replace the email's '.' to "dot" and '-' to "dash" to use as username
        let username = email.replace(/\./g, "dot").replace(/\-/g, "dash").toLowerCase();

        // turn first character of first and last name to uppercase
        this.setState({
            firstName: this.state.firstName[0].toUpperCase() + this.state.firstName.substr(1), 
            lastName: this.state.lastName[0].toUpperCase() + this.state.lastName.substr(1)
        })

        // add to user's names to databse
        const ref = firebase.database().ref("Users/" + username.replace(/\"/g, ''));
        await ref.set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            recommend: {radius: 10000, averageDistance: 0, averagePrice: 0, averageRating: 0, total: 0}
        })
        .then(this.props.switch("PreferenceScreen"))
        .catch(error => {this.setState({error: true, errorMsg: error.code})});
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{alignItems: 'center'}} onPress={Keyboard.dismiss}>
                    <Text style={styles.signUpText}>
                        Sign Up
                    </Text>
                    <TextInput style={styles.inputBoxStyle} placeholder="First Name" value={this.state.firstName} onChangeText={(text) => {this.setState({firstName: text})}} onSubmitEditing={() => {this.lastNameInput.focus()}}></TextInput>
                    <TextInput style={styles.inputBoxStyle} placeholder="Last Name" value={this.state.lastName} onChangeText={(text) => {this.setState({lastName: text})}} onSubmitEditing={() => {this.emailInput.focus()}} ref={input => {this.lastNameInput = input}}></TextInput>
                    <TextInput style={styles.inputBoxStyle} placeholder="Email" value={this.state.email} onChangeText={(text) => {this.setState({email: text})}} onSubmitEditing={() => {this.reEnterEmailInput.focus()}} ref={input => {this.emailInput = input}}></TextInput>
                    <TextInput style={styles.inputBoxStyle} placeholder="Re-enter Email" value={this.state.reEmail} onChangeText={(text) => {this.setState({reEmail: text})}} onSubmitEditing={() => {this.passwordInput.focus()}} ref={input => {this.reEnterEmailInput = input}}></TextInput>
                    <TextInput style={styles.inputBoxStyle} placeholder="Password" value={this.state.password} onChangeText={(text) => {this.setState({password: text})}} onSubmitEditing={() => {this.reEnterPasswordInput.focus()}} ref={input => {this.passwordInput = input}} autoCapitalize="none"></TextInput>
                    <TextInput style={styles.inputBoxStyle} placeholder="Re-enter Password" value={this.state.rePassword} onChangeText={(text) => {this.setState({rePassword: text})}} onSubmitEditing={() => this.handleSignUp()} ref={input => {this.reEnterPasswordInput = input}} autoCapitalize="none"></TextInput>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleSignUp()}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
                    {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}