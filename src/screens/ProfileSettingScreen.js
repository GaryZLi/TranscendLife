import React from 'react';
import {ScrollView, Text, TextInput, Button, View, StyleSheet} from 'react-native';
import styles from "../Styles";
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from "firebase";

export default class ProfileSettingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "Input",
            heightFt: "",
            heightIn: "",
            weight: "",
            birthMonth: "",
            birthDay: "",
            birthYear: "",
            preferences: [""],
            error: false,
            errorMsg: "",
            pressed: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(state) {
        if (this.state.pressed === true) {
            this.setState({error: true, errorMsg: "Please wait."});
            return
        }

        if (this.state.display === "Input") {
            this.setState({
                display: "CheckList",
                heightFt: state.heightFt,
                heightIn: state.heightIn,
                weight: state.weight,
                birthMonth: state.birthMonth,
                birthDay: state.birthDay,
                birthYear: state.birthYear,
            })
        }
        else {
            let checked = [];
            for (let i = 0; i < state.checkBoxes.length; i++) {
                if (state.checkBoxes[i].color === "blue") {
                    checked.push(state.checkBoxes[i].text);
                }
            }

            console.log(state)

            this.setState({preferences: checked, pressed: true}, () => {console.log(this.state)});
            // firebase.database().ref("Users")
            await firebase.auth().onAuthStateChanged((user) => {
                let username = user.providerData[0].uid
                for (let i = 0; i < username.length; i++)
                {
                    if (user.providerData[0].uid[i] === '.') {
                        username += "dot";
                    }
                    else {
                        username += user.providerData[0].uid[i];
                    }
                }                

                const {error, errorMsg, ...userProfile} = this.state;

                const ref = firebase.database().ref("Users/" + username)
                ref.set({
                    profile: userProfile
                })
                .then(function() {
                    console.log("Updating profile completed.")
                })
                .catch(error => {this.setState({error: true, errorMsg: error.code})})
            });

            this.setState({pressed: false});

            return this.props.switch("Home")
        }
    }

    render() {
        let display 

        if (this.state.display === "Input") {
            display = <Input handleSubmit={this.handleSubmit}/>
        }
        else if (this.state.display === "CheckList") {
            display = <CheckList handleSubmit={this.handleSubmit}/>
        }
        else {
            return this.props.switch("Home");
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
            heightFt: "",
            heightIn: "",
            weight: "",
            birthMonth: "",
            birthDay: "",
            birthYear: "",
            error: false,
            errorMsg: ""
        }

        this.handleNext = this.handleNext.bind(this);
    }

    handleNext() {
        // if (this.state.heightFt === 0 || this.state.heightIn === 0 || this.state.weight === 0 || this.state.birthMonth === 0 || this.state.birthDay === 0 || this.state.birthYear === 0) {
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
                    <TextInput style={styles.inputBoxStyle} value={this.state.heightFt} onChangeText={(text) => this.setState({heightFt: text})} placeholder="Height in Feet"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.heightIn} onChangeText={(text) => this.setState({heightIn: text})} placeholder="Height in Inches"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.weight} onChangeText={(text) => this.setState({weight: text})} placeholder="Weight in Pounds"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.birthMonth} onChangeText={(text) => this.setState({birthMonth: text})} placeholder="Birth Month mm"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.birthDay} onChangeText={(text) => this.setState({birthDay: text})} placeholder="Birth Day dd"/>
                    <TextInput style={styles.inputBoxStyle} value={this.state.birthYear} onChangeText={(text) => this.setState({birthYear: text})} placeholder="Birth Year yyyy"/>
                    {/* <Button title="Next" onPress={this.handleNext}/> */}
                    <TouchableOpacity style={styles.button} onPress={this.handleNext}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
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
                    id: 0,
                    checked: false,
                    color: "grey",
                    text: "Pizza",
                },
                {
                    id: 1,
                    checked: false,
                    color: "grey",
                    text: "Chinese",
                },
                {
                    id: 2,
                    checked: false,
                    color: "grey",
                    text: "Mexican",
                },
                {
                    id: 3,
                    checked: false,
                    color: "grey",
                    text: "Thai",
                },
                {
                    id: 4,
                    checked: false,
                    color: "grey",
                    text: "Burgers",
                },
                {
                    id: 5,
                    checked: false,
                    color: "grey",
                    text: "Italian",
                },
                {
                    id: 6,
                    checked: false,
                    color: "grey",
                    text: "Seafood",
                },
                {
                    id: 7,
                    checked: false,
                    color: "grey",
                    text: "Steakhouses",
                },
                {
                    id: 8,
                    checked: false,
                    color: "grey",
                    text: "Korean",
                },
                {
                    id: 9,
                    checked: false,
                    color: "grey",
                    text: "Japanese",
                },
                {
                    id: 10,
                    checked: false,
                    color: "grey",
                    text: "Breakfast",
                },
                {
                    id: 11,
                    checked: false,
                    color: "grey",
                    text: "Sandwiches",
                },
                {
                    id: 12,
                    checked: false,
                    color: "grey",
                    text: "Vietnamese",
                },
                {
                    id: 13,
                    checked: false,
                    color: "grey",
                    text: "Vegetarian",
                },
                {
                    id: 14,
                    checked: false,
                    color: "grey",
                    text: "Sushi Bars",
                },
                {
                    id: 15,
                    checked: false,
                    color: "grey",
                    text: "American",
                },
            ]
        }

        this.handleCheck = this.handleCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCheck(num) {
        this.setState((prev) => {
            let temp = {
                checkBoxes: [...prev.checkBoxes]
            }

            if (temp.checkBoxes[num].color !== "blue") {
                temp.checkBoxes[num].color = "blue" 
            }
            else {
                temp.checkBoxes[num].color = "grey" 
            }
            
            temp.checkBoxes[num].checked = !temp.checkBoxes[num].checked; 
            return temp
        })
    }

    handleSubmit() {
        return this.props.handleSubmit(this.state)
    }

    render() {
        let checkItems = this.state.checkBoxes.map((item) => {return(
            <View key={item.id} style={styles.checkBox}>
                <Button title={item.text} color={item.color} onPress={() => this.handleCheck(item.id)}/>
                {/* <TouchableOpacity key={item.id}  onPress={() => this.handleCheck(item.id)}><Text style={styles.buttonText}>{item.text}</Text></TouchableOpacity> */}
            </View>
        )})

        return (
            <View>
                <Text style={styles.profileCheckListText}>
                    Check all that applies.
                </Text>
                <ScrollView style={{marginBottom: 70}}>
                    {checkItems}
                    <TouchableOpacity style={button.style} onPress={this.handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const button = StyleSheet.create({
    style: {
        height: 30, 
        width: 60, 
        backgroundColor: "#1af", 
        alignSelf: "center", 
        justifyContent: "center", 
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 100
    }
});