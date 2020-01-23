import React from 'react';
import {ScrollView, Text, TextInput, Button, View, StyleSheet} from 'react-native';
import styles from "../Styles";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ProfileSettingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "Input",
            height: "",
            weight: "",
            dob: "",
            homeStreet: "",
            homeCity: "",
            homeState: "",
            homeCountry: "",
            preferences: [],
            error: false,
            errorMsg: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(state) {
        if (this.state.display === "Input") {
            this.setState({
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
        else {
            // console.log(state)
            // console.log(state.checkBoxes.length)

            this.setState((prev) => {
                console.log(state.checkBoxes.length)
                for (let i = 0; i < state.checkBoxes.length; i++) {
                    console.log(i)
                }
            })

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