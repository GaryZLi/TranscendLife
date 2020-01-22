import React from 'react';
import {ScrollView, Text, TextInput, Button, View, CheckBox} from 'react-native';
import styles from "../Styles";

export default class ProfileSettingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "input",
            height: "",
            weight: "",
            dob: "",
            homeStreet: "",
            homeCity: "",
            homeState: "",
            homeCountry: "",
            error: false,
            errorMsg: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(state) {
        return this.setState({
            display: "CheckList",
            height: state.height,
            weight: state.weight,
            dob: state.dob,
            homeStreet: state.homeStreet,
            homeCity: state.homeCity,
            homeState: state.homeState,
            homeCountry: state.homeCountry,
        })
    }

    render() {
        let display 

        if (this.state.display === "input") {
            display = <Input handleSubmit={this.handleSubmit}/>
        }
        else {
            display = <CheckList handleSubmit={this.handleSubmit}/>
        }

        return (
            display
        )
    }
}

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: "",
            weight: "",
            dob: "",
            homeStreet: "",
            homeCity: "",
            homeState: "",
            homeCountry: "",
            error: false,
            errorMsg: ""
        }

        this.handleNext = this.handleNext.bind(this);
    }

    handleNext() {
        // if (this.state.height === "" || this.state.weight === "" || this.state.dob === "" || this.state.homeStreet === "" || this.state.homeCity === "" || this.state.homeState === "" || this.state.homeCountry === "") {
        //     return this.setState({
        //         error: true,
        //         errorMsg: "Please fill out all fields!"
        //     })
        // }        

        return this.props.handleSubmit(this.state);
    }

    render() {
        return (
            <ScrollView>
                <Text style={styles.profileText}>Personal Info</Text>
                <View style={styles.profileView}>
                    <TextInput style={styles.inputBoxStyle} value={this.state.height} onChangeText={(text) => this.setState({height: text})} placeholder="Height"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.weight} onChangeText={(text) => this.setState({weight: text})} placeholder="Weight"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.dob} onChangeText={(text) => this.setState({dob: text})} placeholder="Date of Birth mm/dd/yyyy"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.homeAddr} onChangeText={(text) => this.setState({homeStreet: text})} placeholder="Home Street Address"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.homeCity} onChangeText={(text) => this.setState({homeCity: text})} placeholder="Home City"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.homeState} onChangeText={(text) => this.setState({homeState: text})} placeholder="Home State"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.homeCountry} onChangeText={(text) => this.setState({homeCountry: text})} placeholder="Home Country"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.zipCode} onChangeText={(text) => this.setState({zipCode: text})} placeholder="Zip code"/>                    
                    <Button title="Next" onPress={this.handleNext}/>
                    {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
                </View>
            </ScrollView>
        )
    }
}

class CheckList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            checkBoxes: [
                {
                    name: "cb1",
                    checked: false,
                    text: "Weight gain"
                }
            ]
        }
    }
    render() {
        return (
            <View>
                <Text style={styles.profileCheckListText}>
                    Check all that applies.
                </Text>
                {/* <CheckBox style={styles.checkList} value={this.state.checkBoxes[0].checked} onChange={this.setState({checkBoxes[0]})}/> */}
                <Text>{this.state.checkBoxes[0].text}</Text>
            </View>
        )
    }
}