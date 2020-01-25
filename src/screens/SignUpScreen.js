import React from "react";
import {Text, TextInput, View} from "react-native";
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
        }
    
        this.handleNext = this.handleNext.bind(this);
    }

    async handleNext() {
        if (this.state.email === "" || this.state.reEmail === "" || this.state.firstName === "" || this.state.lastName === "" || this.state.password === "" || this.state.rePassword === "") {
            return this.setState({error: true, errorMsg: "Please fill out all fields!"});
        }

        if (this.state.email !== this.state.reEmail) {
            return this.setState({error: true, errorMsg: "Emails do not match!"});
        }

        if (this.state.password !== this.state.rePassword) {
            return this.setState({error: true, errorMsg: "Passwords do not match!"});
        }

        await firebase.auth().createUserWithEmailAndPassword(this.state.email.replace(/\s/g, '').toLowerCase(), this.state.password)
        .catch(error => {this.setState({error: true, errorMsg: error.code})});

        if (this.state.error) {
            return
        }

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

        this.setState({
            firstName: this.state.firstName[0].toUpperCase() + this.state.firstName.substr(1), 
            lastName: this.state.lastName[0].toUpperCase() + this.state.lastName.substr(1)})

        const ref = firebase.database().ref("Users/" + username);
        ref.set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        }).catch(error => {this.setState({error: true, errorMsg: error.code})});

        if (this.state.error !== true) {
            return this.props.switch("ProfileSetting");            
        }
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
                {/* <Button title="Sign Up" onPress={() => this.handleNext}/> */}
                <TouchableOpacity style={styles.button} onPress={this.handleNext}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
                {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
            </View>
        )
    }
}