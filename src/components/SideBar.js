import React from "react";
import {View, Text, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
import styles from "../Styles";
import { TouchableOpacity} from "react-native-gesture-handler";
import firebase from "firebase";

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            timeOfDay: "",
            firstName: "",
        }

        this.getHour = this.getHour.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getHour(), 1000);

        // get the name of the user
        firebase.database().ref("Users/" + firebase.auth().currentUser.email.replace(/\./g, "dot").replace(/\-/g, "dash"))
        .once("value")
        .then(result => result.toJSON())
        .then(name => this.setState({firstName: name.firstName}))

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getHour() {
        let time = new Date(Date.now())
        time = time.getHours() 
        if (time >= 0 && time < 12) {
            time = "morning"
        }
        else if (time >= 12 && time < 18) {
            time = "afternoon"
        }
        else {
            time = "evening"
        }

        this.setState({timeOfDay: time})
    }

    handleOpen() {
        this.setState(prev => ({opened: !prev.opened}))
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.sideBarView, {height: this.state.opened? "100%" : 30}]}>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <TouchableOpacity style={{marginTop: 5}} onPress={this.handleOpen}>
                        <View style={styles.burgerMenu}/>
                        <View style={styles.burgerMenu}/>
                        <View style={styles.burgerMenu}/>
                    </TouchableOpacity>
                    <Text style={styles.greetingText}>Good {this.state.timeOfDay}, {this.state.firstName} {this.state.lastName} </Text>
                </View>
                {this.state.opened && <SideBarMenu switch={this.props.switch} search={this.props.search} close={() => this.setState(() => ({opened: false}))}/>}
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

class SideBarMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            searchQuery: "",
            chosen: 0,
            error: false,
            errorMsg: "",
            limit: ''
        }

        this.search = this.search.bind(this);
        this.changeDistance = this.changeDistance.bind(this);
    } 

    componentDidMount() {
        let username = firebase.auth().currentUser.email.replace(/\./g, "dot").replace(/\-/g, "dash");

        const ref = firebase.database().ref("Users/" + username)
        ref.once('value')
        .then(result => this.setState(() => ({chosen: result.child('distance').toJSON().radius})))

        this.setState({user: username});
    }

    search() {
        if (this.state.searchQuery === '') {
            return this.setState({error: true, errorMsg: 'Nothing to search!'})
        }

        if (this.state.limit === '') {
            return this.setState({error: true, errorMsg: 'Please enter a number for the results!'})
        }

        const limit = parseInt(this.state.limit)
        
        this.props.close();
        this.props.search(this.state.searchQuery, this.state.chosen, limit);
    }

    changeDistance(distance) {
        this.setState(({chosen: distance}))

        const ref = firebase.database().ref("Users/" + this.state.user)        
        ref.update({distance: distance})
        .catch(error => this.setState({error: true, errorMsg: error.code}));
    }

    signOut() {
        firebase.auth().signOut()
        .then(this.props.switch("SignIn"))
        .catch(error => this.setState({error: true, errorMsg: error.code}));
    }

    render() {
        return (
            <View>
                <View style={styles.searchBar}>
                    <TextInput placeholder="Enter food to search for" style={styles.searchBarText} value={this.state.searchQuery} onChangeText={text => this.setState({searchQuery: text})} onSubmitEditing={() => this.search()} ref={input => {this.searchBar = input}}></TextInput>
                </View>
                <View style={styles.limitField}>
                    <TextInput placeholder='number of results' style={styles.limitInput} value={this.state.limit} keyboardType={"number-pad"} onChangeText={text => this.setState({limit: text})} onSubmitEditing={() => this.search()}/>
                </View>
                <TouchableOpacity style={styles.searchButton} onPress={() => this.search()}><Text style={{color: "white"}}>Search</Text></TouchableOpacity>
                <View style={styles.distanceBox}>
                    <TouchableOpacity style={[styles.distanceTextBox, {borderColor: this.state.chosen === 10000? 'red' : 'transparent'}]} onPress={() => this.changeDistance(10000)}><Text>10 mi</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.distanceTextBox, {borderColor: this.state.chosen === 20000? 'red' : 'transparent'}]} onPress={() => this.changeDistance(20000)}><Text>20 mi</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.distanceTextBox, {borderColor: this.state.chosen === 30000? 'red' : 'transparent'}]} onPress={() => this.changeDistance(30000)}><Text>30 mi</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.distanceTextBox, {borderColor: this.state.chosen === 40000? 'red' : 'transparent'}]} onPress={() => this.changeDistance(40000)}><Text>40 mi</Text></TouchableOpacity>
                </View>
                <View style={styles.sideBarOptions}>
                    <ProfileSettingView/>
                    <TouchableOpacity onPress={() => this.props.switch("PreferenceScreen")}><Text style={styles.sideBarOptionTexts}>Preferences</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.signOut()}><Text style={styles.sideBarOptionTexts}>Sign Out</Text></TouchableOpacity>         
                </View>
                {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
            </View>
        )
    }
}

class ProfileSettingView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false,
        }
    
        this.handleChange = this.handleChange.bind(this);
    }

    // update the user's profile setting
    handleChange() {
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.setState(prev => ({opened: !prev.opened}), this.handleChange())}>
                <Text style={styles.sideBarOptionTexts}>Profile Setting</Text>
                <View style={[styles.sideBarProfileSetting, {height: this.state.opened? 150: 0, borderTopWidth: this.state.opened? 2 : 0, borderBottomWidth: this.state.opened? 2: 0}]}>
                    <TextInput placeholder="First Name" placeholderTextColor="white" style={{borderBottomWidth: this.state.opened? 1 : 0, borderBottomColor: "white"}}></TextInput>
                    <TextInput placeholder="Last Name" placeholderTextColor="white" style={{borderBottomWidth: this.state.opened? 1 : 0, borderBottomColor: "white"}}></TextInput>
                    <TextInput placeholder="Email" placeholderTextColor="white" style={{borderBottomWidth: this.state.opened? 1 : 0, borderBottomColor: "white"}}></TextInput>
                    <TextInput placeholder="Password" placeholderTextColor="white" style={{borderBottomWidth: this.state.opened? 1 : 0, borderBottomColor: "white"}}></TextInput>
                    <TextInput placeholder="Re-enter Password" placeholderTextColor="white"></TextInput>
                </View>
            </TouchableOpacity>
            
        )
    }
}