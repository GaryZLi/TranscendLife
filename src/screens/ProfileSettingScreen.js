import React from 'react';
import {ScrollView, Text, StyleSheet, TextInput, View, Button} from 'react-native';
// import profile from "./dataSrc/profileData";


export default class ProfileSettingScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            firstName: "",
            lastName: "",
            // email: "",
            // height: "",
            // weight: "",
            // dob: "",
            // homeStreet: "",
            // homeCity: "",
            // homeState: "",
            // homeCountry: "",
            status: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        let check = [
            this.state.firstName,
            this.state.lastName,
            // this.state.email,
            // this.state.height,
            // this.state.weight,
            // this.state.dob,
            // this.state.homeStreet,
            // this.state.homeCity,
            // this.state.homeState,
            // this.state.homeCountry
        ]
        
        // check for any empty fields
        let unfilled = check.filter((info) => (info == ""))

        // if one or more empty fields
        if (unfilled.length > 0)
        {
            this.setState({status: true})
            console.log("this is set true", unfilled)
        }
        else
        {
            profile.lastName = "fuck here";
            profile.firstName = "fdfds";
            console.log(profile.firstName)
        }
    }

    render() {
        return (
            <ScrollView>
                <Text style={styles.pInfoText}>Personal Info</Text>
                <View style={styles.pInfoView}>
                    <TextInput style={styles.inputBoxStyle} value={this.state.firstName} onChangeText={(text) => this.setState({firstName: text})} placeholder="First Name"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.lastName} onChangeText={(text) => this.setState({lastName: text})} placeholder="Last Name"/>
                    {/* <TextInput style={styles.inputBoxStyle} value={this.state.email} onChangeText={(text) => this.setState({email: text})} placeholder="Email"/> */}
                    {/* <TextInput style={styles.inputBoxStyle} value={this.state.height} onChangeText={(text) => this.setState({height: text})} placeholder="Height"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.weight} onChangeText={(text) => this.setState({weight: text})} placeholder="Weight"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.dob} onChangeText={(text) => this.setState({dob: text})} placeholder="Date of Birth mm/dd/yyyy"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.homeAddr} onChangeText={(text) => this.setState({homeStreet: text})} placeholder="Home Street Address"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.homeCity} onChangeText={(text) => this.setState({homeCity: text})} placeholder="Home City"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.homeState} onChangeText={(text) => this.setState({homeState: text})} placeholder="Home State"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.homeCountry} onChangeText={(text) => this.setState({homeCountry: text})} placeholder="Home Country"/> */}
                    
                    <Button title="Next" onPress={this.handleSubmit}/>
                    {this.state.status && <Text style={{marginTop: 20, color: 'red'}}>Please enter all fields!</Text>}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    pInfoText: {
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 35,
    },
    pInfoView: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        marginTop: 15,
    },
    inputBoxStyle: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        width: '80%',
        fontSize: 20,
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 5,
    }
})