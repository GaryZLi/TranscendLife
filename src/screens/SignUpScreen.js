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
            shown: '',
            reEnterShown: '',
            error: false,
            errorMsg: "",
            pressed: false,
        }
    
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleReEnterText = this.handleReEnterText.bind(this);
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
        ref.set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            history: {
                'Acai Bowls': 0,
                'Afghan': 0,
                'African': 0,
                'American (New)': 0,
                'American (Traditional)': 0,
                'Arabian': 0,
                'Argentine': 0,
                'Armenian': 0,
                'Asian Fusion': 0,
                'Australian': 0,
                'Austrian': 0,
                'Bagels': 0,
                'Bakeries': 0,
                'Bangladeshi': 0,
                'Barbeque': 0,
                'Basque': 0,
                'Beer, Wine & Spirits': 0,
                'Belgian': 0,
                'Beverage Store': 0,
                'Brasseries': 0,
                'Brazilian': 0,
                'Breakfast & Brunch': 0,
                'Breweries': 0,
                'Brewpubs': 0,
                'British': 0,
                'Bubble Tea': 0,
                'Buffets': 0,
                'Bulgarian': 0,
                'Burgers': 0,
                'Burmese': 0,
                'Butcher': 0,
                'CSA': 0,
                'Cafes': 0,
                'Cafeteria': 0,
                'Cajun/Creole': 0,
                'Calabrian': 0,
                'Cambodian': 0,
                'Candy Stores': 0,
                'Cantonese': 0,
                'Caribbean': 0,
                'Catalan': 0,
                'Cheese Shops': 0,
                'Cheesesteaks': 0,
                'Chicken Shop': 0,
                'Chicken Wings': 0,
                'Chimney Cakes': 0,
                'Chinese': 0,
                'Chocolatiers & Shops': 0,
                'Cideries': 0,
                'Coffee & Tea': 0,
                'Coffee Roasteries': 0,
                'Colombian': 0,
                'Comfort Food': 0,
                'Convenience Stores': 0,
                'Conveyor Belt Sushi': 0,
                'Creperies': 0,
                'Cuban': 0,
                'Cupcakes': 0,
                'Custom Cakes': 0,
                'Czech': 0,
                'Delis': 0,
                'Desserts': 0,
                'Dim Sum': 0,
                'Diners': 0,
                'Dinner Theater': 0,
                'Distilleries': 0,
                'Do-It-Yourself Food': 0,
                'Dominican': 0,
                'Donuts': 0,
                'Egyptian': 0,
                'Empanadas': 0,
                'Eritrean': 0,
                'Ethiopian': 0,
                'Falafel': 0,
                'Farmers Market': 0,
                'Fast Food': 0,
                'Filipino': 0,
                'Fish & Chips': 0,
                'Fondue': 0,
                'Food Court': 0,
                'Food Delivery Services': 0,
                'Food Stands': 0,
                'Food Trucks': 0,
                'French': 0,
                'Fruits & Veggies': 0,
                'Game Meat': 0,
                'Gastropubs': 0,
                'Gelato': 0,
                'Georgian': 0,
                'German': 0,
                'Gluten-Free': 0,
                'Greek': 0,
                'Grocery': 0,
                'Guamanian': 0,
                'Hainan': 0,
                'Haitian': 0,
                'Halal': 0,
                'Hawaiian': 0,
                'Health Markets': 0,
                'Herbs & Spices': 0,
                'Himalayan/Nepalese': 0,
                'Honduran': 0,
                'Honey': 0,
                'Hong Kong Style Cafe': 0,
                'Hot Dogs': 0,
                'Hot Pot': 0,
                'Hungarian': 0,
                'Iberian': 0,
                'Ice Cream & Frozen Yogurt': 0,
                'Imported Food': 0,
                'Indian': 0,
                'Indonesian': 0,
                'International Grocery': 0,
                'Internet Cafes': 0,
                'Irish': 0,
                'Italian': 0,
                'Izakaya': 0,
                'Japanese': 0,
                'Japanese Curry': 0,
                'Juice Bars & Smoothies': 0,
                'Kebab': 0,
                'Kombucha': 0,
                'Korean': 0,
                'Kosher': 0,
                'Laotian': 0,
                'Latin American': 0,
                'Lebanese': 0,
                'Live/Raw Food': 0,
                'Macarons': 0,
                'Malaysian': 0,
                'Mauritius': 0,
                'Meaderies': 0,
                'Meat Shops': 0,
                'Mediterranean': 0,
                'Mexican': 0,
                'Middle Eastern': 0,
                'Modern European': 0,
                'Mongolian': 0,
                'Moroccan': 0,
                'New Mexican Cuisine': 0,
                'Nicaraguan': 0,
                'Noodles': 0,
                'Olive Oil': 0,
                'Organic Stores': 0,
                'Pakistani': 0,
                'Pan Asian': 0,
                'Pancakes': 0,
                'Pasta Shops': 0,
                'Patisserie/Cake Shop': 0,
                'Persian/Iranian': 0,
                'Peruvian': 0,
                'Piadina': 0,
                'Pizza': 0,
                'Poke': 0,
                'Polish': 0,
                'Polynesian': 0,
                'Pop-Up Restaurants': 0,
                'Popcorn Shops': 0,
                'Portuguese': 0,
                'Poutineries': 0,
                'Pretzels': 0,
                'Puerto Rican': 0,
                'Ramen': 0,
                'Reunion': 0,
                'Russian': 0,
                'Salad': 0,
                'Salvadoran': 0,
                'Sandwiches': 0,
                'Sardinian': 0,
                'Scandinavian': 0,
                'Scottish': 0,
                'Seafood': 0,
                'Seafood Markets': 0,
                'Senegalese': 0,
                'Shanghainese': 0,
                'Shaved Ice': 0,
                'Shaved Snow': 0,
                'Sicilian': 0,
                'Singaporean': 0,
                'Slovakian': 0,
                'Smokehouse': 0,
                'Somali': 0,
                'Soul Food': 0,
                'Soup': 0,
                'South African': 0,
                'Southern': 0,
                'Spanish': 0,
                'Specialty Food': 0,
                'Sri Lankan': 0,
                'Steakhouses': 0,
                'Street Vendors': 0,
                'Supper Clubs': 0,
                'Sushi Bars': 0,
                'Syrian': 0,
                'Szechuan': 0,
                'Tacos': 0,
                'Taiwanese': 0,
                'Tapas Bars': 0,
                'Tapas/Small Plates': 0,
                'Tea Rooms': 0,
                'Teppanyaki': 0,
                'Tex-Mex': 0,
                'Thai': 0,
                'Themed Cafes': 0,
                'Trinidadian': 0,
                'Turkish': 0,
                'Tuscan': 0,
                'Ukrainian': 0,
                'Uzbek': 0,
                'Vegan': 0,
                'Vegetarian': 0,
                'Venezuelan': 0,
                'Vietnamese': 0,
                'Waffles': 0,
                'Water Stores': 0,
                'Wine Tasting Room': 0,
                'Wineries': 0,
                'Wraps': 0,
            },
            distance: 10000
        })
        .then(this.props.switch("PreferenceScreen"))
        .catch(error => {this.setState({error: true, errorMsg: error.code})});
    }

    handleText({nativeEvent}) {
        if (nativeEvent.key === 'Backspace') {
            return this.setState(prev => ({shown: prev.shown.slice(0, prev.shown.length - 1), password: prev.password.slice(0, prev.password.length - 1)}))
        }

        this.setState(prev => ({shown: prev.shown + '*', password: prev.password + nativeEvent.key}))
    }

    handleReEnterText({nativeEvent}) {
        if (nativeEvent.key === 'Backspace') {
            return this.setState(prev => ({reEnterShown: prev.reEnterShown.slice(0, prev.reEnterShown.length - 1), rePassword: prev.rePassword.slice(0, prev.rePassword.length - 1)}))
        }

        this.setState(prev => ({reEnterShown: prev.reEnterShown + '*', rePassword: prev.rePassword + nativeEvent.key}))
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{alignItems: 'center'}} onPress={Keyboard.dismiss}>
                    <Text style={styles.signUpText}>
                        Sign Up
                    </Text>
                    <TextInput style={styles.inputBoxStyle} placeholder="First Name" placeholderTextColor="#706f6e" value={this.state.firstName} onChangeText={(text) => {this.setState({firstName: text})}} onSubmitEditing={() => {this.lastNameInput.focus()}}></TextInput>
                    <TextInput style={styles.inputBoxStyle} placeholder="Last Name" placeholderTextColor="#706f6e" value={this.state.lastName} onChangeText={(text) => {this.setState({lastName: text})}} onSubmitEditing={() => {this.emailInput.focus()}} ref={input => {this.lastNameInput = input}}></TextInput>
                    <TextInput style={styles.inputBoxStyle} placeholder="Email" placeholderTextColor="#706f6e" value={this.state.email} onChangeText={(text) => {this.setState({email: text})}} onSubmitEditing={() => {this.reEnterEmailInput.focus()}} ref={input => {this.emailInput = input}}></TextInput>
                    <TextInput style={styles.inputBoxStyle} placeholder="Re-enter Email" placeholderTextColor="#706f6e" value={this.state.reEmail} onChangeText={(text) => {this.setState({reEmail: text})}} onSubmitEditing={() => {this.passwordInput.focus()}} ref={input => {this.reEnterEmailInput = input}}></TextInput>
                    <TextInput style={styles.inputBoxStyle} placeholder="Password" placeholderTextColor="#706f6e" value={this.state.shown} onKeyPress={(key) => this.handleText(key)} onSubmitEditing={() => {this.reEnterPasswordInput.focus()}} ref={input => {this.passwordInput = input}} autoCapitalize="none"></TextInput>
                    <TextInput style={styles.inputBoxStyle} placeholder="Re-enter Password" placeholderTextColor="#706f6e" value={this.state.reEnterShown} onKeyPress={(key) => this.handleReEnterText(key)} onSubmitEditing={() => this.handleSignUp()} ref={input => {this.reEnterPasswordInput = input}} autoCapitalize="none"></TextInput>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleSignUp()}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
                    {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}