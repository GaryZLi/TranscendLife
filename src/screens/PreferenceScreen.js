import React from 'react';
import {ScrollView, Text, TextInput, Button, View, StyleSheet} from 'react-native';
import styles from "../Styles";
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from "firebase";

export default class PreferenceScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            preferences: [""],
            error: false,
            errorMsg: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(state) { 
        let checked = [];
        // get all the selected preferences
        for (let i = 0; i < state.checkBoxes.length; i++) {
            if (state.checkBoxes[i].color === "blue") {
                checked.push(state.checkBoxes[i].text);
            }
        }

        await this.setState({ preferences: checked });

        // reference to the username, then add the user's preferences
        const username = firebase.auth().currentUser.email.replace(/\./g, "dot").replace(/\"/g, '');
        const ref = firebase.database().ref("Users/" + username)
        // ref.update({preferences: this.state.preferences})
        ref.update({preferences: checked})
        .then(this.props.switch("Home"))
        .catch(error => this.setState({error: true, errorMsg: error.code}));
    }

    render() {
        return (
            <View>
                <PreferenceList handleSubmit={this.handleSubmit}/>
                {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
            </View>
        )
    }
}

class PreferenceList extends React.Component {
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
                {
                    id: 16,
                    checked: false,
                    color: "grey",
                    text: "Vegan",
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
                <Text style={styles.preferenceListText}>
                    Check all that applies.
                </Text>
                <ScrollView style={{height: "70%"}}>
                    {checkItems}
                </ScrollView>
                <TouchableOpacity style={button.style} onPress={this.handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
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
        marginBottom: 150,
    }
});