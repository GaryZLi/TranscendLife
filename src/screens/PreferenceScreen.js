import React from 'react';
import {ScrollView, Text, TextInput, Button, View, StyleSheet} from 'react-native';
import styles from "../Styles";
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from "firebase";

export default class PreferenceScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMsg: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(checked) { 
        // reference to the username, then add the user's preferences
        const username = firebase.auth().currentUser.email.replace(/\./g, "dot").replace(/\"/g, '');
        const ref = firebase.database().ref("Users/" + username)

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
            checked: {},
            checkBoxes: {
                'Acai Bowls': ['acaibowls', 'gray'],
                'Afghan': ['afghani', 'gray'],
                'African': ['african', 'gray'],
                'American (New)': ['newamerican', 'gray'],
                'American (Traditional)': ['tradamerican', 'gray'],
                'Arabian': ['arabian', 'gray'],
                'Argentine': ['argentine', 'gray'],
                'Armenian': ['armenian', 'gray'],
                'Asian Fusion': ['asianfusion', 'gray'],
                'Australian': ['australian', 'gray'],
                'Austrian': ['austrian', 'gray'],
                'Bagels': ['bagels', 'gray'],
                'Bakeries': ['bakeries', 'gray'],
                'Bangladeshi': ['bangladeshi', 'gray'],
                'Barbeque': ['bbq', 'gray'],
                'Basque': ['basque', 'gray'],
                'Beer, Wine & Spirits': ['beer_and_wine', 'gray'],
                'Belgian': ['belgian', 'gray'],
                'Beverage Store': ['beverage_stores', 'gray'],
                'Brasseries': ['brasseries', 'gray'],
                'Brazilian': ['brazilian', 'gray'],
                'Breakfast & Brunch': ['breakfast_brunch', 'gray'],
                'Breweries': ['breweries', 'gray'],
                'Brewpubs': ['brewpubs', 'gray'],
                'British': ['british', 'gray'],
                'Bubble Tea': ['bubbletea', 'gray'],
                'Buffets': ['buffets', 'gray'],
                'Bulgarian': ['bulgarian', 'gray'],
                'Burgers': ['burgers', 'gray'],
                'Burmese': ['burmese', 'gray'],
                'Butcher': ['butcher', 'gray'],
                'CSA': ['csa', 'gray'],
                'Cafes': ['cafes', 'gray'],
                'Cafeteria': ['cafeteria', 'gray'],
                'Cajun/Creole': ['cajun', 'gray'],
                'Calabrian': ['calabrian', 'gray'],
                'Cambodian': ['cambodian', 'gray'],
                'Candy Stores': ['candy', 'gray'],
                'Cantonese': ['cantonese', 'gray'],
                'Caribbean': ['caribbean', 'gray'],
                'Catalan': ['catalan', 'gray'],
                'Cheese Shops': ['cheese', 'gray'],
                'Cheesesteaks': ['cheesesteaks', 'gray'],
                'Chicken Shop': ['chickenshop', 'gray'],
                'Chicken Wings': ['chicken_wings', 'gray'],
                'Chimney Cakes': ['chimneycakes', 'gray'],
                'Chinese': ['chinese', 'gray'],
                'Chocolatiers & Shops': ['chocolate', 'gray'],
                'Cideries': ['cideries', 'gray'],
                'Coffee & Tea': ['coffee', 'gray'],
                'Coffee Roasteries': ['coffeeroasteries', 'gray'],
                'Colombian': ['colombian', 'gray'],
                'Comfort Food': ['comfortfood', 'gray'],
                'Convenience Stores': ['convenience', 'gray'],
                'Conveyor Belt Sushi': ['conveyorsushi', 'gray'],
                'Creperies': ['creperies', 'gray'],
                'Cuban': ['cuban', 'gray'],
                'Cupcakes': ['cupcakes', 'gray'],
                'Custom Cakes': ['customcakes', 'gray'],
                'Czech': ['czech', 'gray'],
                'Delis': ['delis', 'gray'],
                'Desserts': ['desserts', 'gray'],
                'Dim Sum': ['dimsum', 'gray'],
                'Diners': ['diners', 'gray'],
                'Dinner Theater': ['dinnertheater', 'gray'],
                'Distilleries': ['distilleries', 'gray'],
                'Do-It-Yourself Food': ['diyfood', 'gray'],
                'Dominican': ['dominican', 'gray'],
                'Donuts': ['donuts', 'gray'],
                'Egyptian': ['egyptian', 'gray'],
                'Empanadas': ['empanadas', 'gray'],
                'Eritrean': ['eritrean', 'gray'],
                'Ethiopian': ['ethiopian', 'gray'],
                'Falafel': ['falafel', 'gray'],
                'Farmers Market': ['farmersmarket', 'gray'],
                'Fast Food': ['hotdogs', 'gray'],
                'Filipino': ['filipino', 'gray'],
                'Fish & Chips': ['fishnchips', 'gray'],
                'Fondue': ['fondue', 'gray'],
                'Food Court': ['food_court', 'gray'],
                'Food Delivery Services': ['fooddeliveryservices', 'gray'],
                'Food Stands': ['foodstands', 'gray'],
                'Food Trucks': ['foodtrucks', 'gray'],
                'French': ['french', 'gray'],
                'Fruits & Veggies': ['markets', 'gray'],
                'Game Meat': ['gamemeat', 'gray'],
                'Gastropubs': ['gastropubs', 'gray'],
                'Gelato': ['gelato', 'gray'],
                'Georgian': ['georgian', 'gray'],
                'German': ['german', 'gray'],
                'Gluten-Free': ['gluten_free', 'gray'],
                'Greek': ['greek', 'gray'],
                'Grocery': ['grocery', 'gray'],
                'Guamanian': ['guamanian', 'gray'],
                'Hainan': ['hainan', 'gray'],
                'Haitian': ['haitian', 'gray'],
                'Halal': ['halal', 'gray'],
                'Hawaiian': ['hawaiian', 'gray'],
                'Health Markets': ['healthmarkets', 'gray'],
                'Herbs & Spices': ['herbsandspices', 'gray'],
                'Himalayan/Nepalese': ['himalayan', 'gray'],
                'Honduran': ['honduran', 'gray'],
                'Honey': ['honey', 'gray'],
                'Hong Kong Style Cafe': ['hkcafe', 'gray'],
                'Hot Dogs': ['hotdog', 'gray'],
                'Hot Pot': ['hotpot', 'gray'],
                'Hungarian': ['hungarian', 'gray'],
                'Iberian': ['iberian', 'gray'],
                'Ice Cream & Frozen Yogurt': ['icecream', 'gray'],
                'Imported Food': ['importedfood', 'gray'],
                'Indian': ['indpak', 'gray'],
                'Indonesian': ['indonesian', 'gray'],
                'International Grocery': ['intlgrocery', 'gray'],
                'Internet Cafes': ['internetcafe', 'gray'],
                'Irish': ['irish', 'gray'],
                'Italian': ['italian', 'gray'],
                'Izakaya': ['izakaya', 'gray'],
                'Japanese': ['japanese', 'gray'],
                'Japanese Curry': ['japacurry', 'gray'],
                'Juice Bars & Smoothies': ['juicebars', 'gray'],
                'Kebab': ['kebab', 'gray'],
                'Kombucha': ['kombucha', 'gray'],
                'Korean': ['korean', 'gray'],
                'Kosher': ['kosher', 'gray'],
                'Laotian': ['laotian', 'gray'],
                'Latin American': ['latin', 'gray'],
                'Lebanese': ['lebanese', 'gray'],
                'Live/Raw Food': ['raw_food', 'gray'],
                'Macarons': ['macarons', 'gray'],
                'Malaysian': ['malaysian', 'gray'],
                'Mauritius': ['mauritius', 'gray'],
                'Meaderies': ['meaderies', 'gray'],
                'Meat Shops': ['meats', 'gray'],
                'Mediterranean': ['mediterranean', 'gray'],
                'Mexican': ['mexican', 'gray'],
                'Middle Eastern': ['mideastern', 'gray'],
                'Modern European': ['modern_european', 'gray'],
                'Mongolian': ['mongolian', 'gray'],
                'Moroccan': ['moroccan', 'gray'],
                'New Mexican Cuisine': ['newmexican', 'gray'],
                'Nicaraguan': ['nicaraguan', 'gray'],
                'Noodles': ['noodles', 'gray'],
                'Olive Oil': ['oliveoil', 'gray'],
                'Organic Stores': ['organic_stores', 'gray'],
                'Pakistani': ['pakistani', 'gray'],
                'Pan Asian': ['panasian', 'gray'],
                'Pancakes': ['pancakes', 'gray'],
                'Pasta Shops': ['pastashops', 'gray'],
                'Patisserie/Cake Shop': ['cakeshop', 'gray'],
                'Persian/Iranian': ['persian', 'gray'],
                'Peruvian': ['peruvian', 'gray'],
                'Piadina': ['piadina', 'gray'],
                'Pizza': ['pizza', 'gray'],
                'Poke': ['poke', 'gray'],
                'Polish': ['polish', 'gray'],
                'Polynesian': ['polynesian', 'gray'],
                'Pop-Up Restaurants': ['popuprestaurants', 'gray'],
                'Popcorn Shops': ['popcorn', 'gray'],
                'Portuguese': ['portuguese', 'gray'],
                'Poutineries': ['poutineries', 'gray'],
                'Pretzels': ['pretzels', 'gray'],
                'Puerto Rican': ['puertorican', 'gray'],
                'Ramen': ['ramen', 'gray'],
                'Reunion': ['reunion', 'gray'],
                'Russian': ['russian', 'gray'],
                'Salad': ['salad', 'gray'],
                'Salvadoran': ['salvadoran', 'gray'],
                'Sandwiches': ['sandwiches', 'gray'],
                'Sardinian': ['sardinian', 'gray'],
                'Scandinavian': ['scandinavian', 'gray'],
                'Scottish': ['scottish', 'gray'],
                'Seafood': ['seafood', 'gray'],
                'Seafood Markets': ['seafoodmarkets', 'gray'],
                'Senegalese': ['senegalese', 'gray'],
                'Shanghainese': ['shanghainese', 'gray'],
                'Shaved Ice': ['shavedice', 'gray'],
                'Shaved Snow': ['shavedsnow', 'gray'],
                'Sicilian': ['sicilian', 'gray'],
                'Singaporean': ['singaporean', 'gray'],
                'Slovakian': ['slovakian', 'gray'],
                'Smokehouse': ['smokehouse', 'gray'],
                'Somali': ['somali', 'gray'],
                'Soul Food': ['soulfood', 'gray'],
                'Soup': ['soup', 'gray'],
                'South African': ['southafrican', 'gray'],
                'Southern': ['southern', 'gray'],
                'Spanish': ['spanish', 'gray'],
                'Specialty Food': ['gourmet', 'gray'],
                'Sri Lankan': ['srilankan', 'gray'],
                'Steakhouses': ['steak', 'gray'],
                'Street Vendors': ['streetvendors', 'gray'],
                'Supper Clubs': ['supperclubs', 'gray'],
                'Sushi Bars': ['sushi', 'gray'],
                'Syrian': ['syrian', 'gray'],
                'Szechuan': ['szechuan', 'gray'],
                'Tacos': ['tacos', 'gray'],
                'Taiwanese': ['taiwanese', 'gray'],
                'Tapas Bars': ['tapas', 'gray'],
                'Tapas/Small Plates': ['tapasmallplates', 'gray'],
                'Tea Rooms': ['tea', 'gray'],
                'Teppanyaki': ['teppanyaki', 'gray'],
                'Tex-Mex': ['tex-mex', 'gray'],
                'Thai': ['thai', 'gray'],
                'Themed Cafes': ['themedcafes', 'gray'],
                'Trinidadian': ['trinidadian', 'gray'],
                'Turkish': ['turkish', 'gray'],
                'Tuscan': ['tuscan', 'gray'],
                'Ukrainian': ['ukrainian', 'gray'],
                'Uzbek': ['uzbek', 'gray'],
                'Vegan': ['vegan', 'gray'],
                'Vegetarian': ['vegetarian', 'gray'],
                'Venezuelan': ['venezuelan', 'gray'],
                'Vietnamese': ['vietnamese', 'gray'],
                'Waffles': ['waffles', 'gray'],
                'Water Stores': ['waterstores', 'gray'],
                'Wine Tasting Room': ['winetastingroom', 'gray'],
                'Wineries': ['wineries', 'gray'],
                'Wraps': ['wraps', 'gray']  
            },
            data: {}
        }

        this.handleCheck = this.handleCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const username = firebase.auth().currentUser.email.replace(/\./g, 'dot').replace(/\"/g, '')
        const ref = firebase.database().ref('Users/' + username)
        ref.once('value')
        .then(result => {
            this.setState(prev => {
                const data = result.child('history').toJSON();

                this.setState({data: data});

                const preferences = result.child('preferences').toJSON();
                let temp = {}

                for (let preference in preferences) {
                    temp[preference] = this.state.checkBoxes[preference][0];
                }

                let getPref = {
                    checked: temp,
                    checkBoxes: prev.checkBoxes
                }
                
                for (let pref in temp) {
                    getPref.checkBoxes[pref][1] = 'blue'
                }

                return getPref
            })
        })
    }

    handleCheck(item) {
        let checked = this.state.checked;
        let color = {...this.state.checkBoxes} 

        if (checked[item] !== undefined) {
            delete checked[item]
            color[item][1] = 'gray';
        }
        else {
            checked[item] = this.state.checkBoxes[item][0];
            color[item][1] = 'blue';
        }

        this.setState({checked: checked, checkBoxes: color})
    }

    handleSubmit() {
        return this.props.handleSubmit(this.state.checked)
    }

    render() {
        let checkItems = Object.keys(this.state.checkBoxes).map((item, id) => {
            let text = item.toUpperCase()
            return(
            <View key={id} style={styles.checkBox}>
                <Button title={text} color={this.state.checkBoxes[item][1]} onPress={() => this.handleCheck(item)}/>
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








// checkBoxes: [
//     {
//         id: 0,
//         checked: false,
//         color: "grey",
//         text: "pizza",
//     },
//     {
//         id: 1,
//         checked: false,
//         color: "grey",
//         text: "chinese",
//     },
//     {
//         id: 2,
//         checked: false,
//         color: "grey",
//         text: "mexican",
//     },
//     {
//         id: 3,
//         checked: false,
//         color: "grey",
//         text: "thai",
//     },
//     {
//         id: 4,
//         checked: false,
//         color: "grey",
//         text: "burgers",
//     },
//     {
//         id: 5,
//         checked: false,
//         color: "grey",
//         text: "italian",
//     },
//     {
//         id: 6,
//         checked: false,
//         color: "grey",
//         text: "seafood",
//     },
//     {
//         id: 7,
//         checked: false,
//         color: "grey",
//         text: "steakhouses",
//     },
//     {
//         id: 8,
//         checked: false,
//         color: "grey",
//         text: "korean",
//     },
//     {
//         id: 9,
//         checked: false,
//         color: "grey",
//         text: "japanese",
//     },
//     {
//         id: 10,
//         checked: false,
//         color: "grey",
//         text: "breakfast",
//     },
//     {
//         id: 11,
//         checked: false,
//         color: "grey",
//         text: "sandwiches",
//     },
//     {
//         id: 12,
//         checked: false,
//         color: "grey",
//         text: "vietnamese",
//     },
//     {
//         id: 13,
//         checked: false,
//         color: "grey",
//         text: "vegetarian",
//     },
//     {
//         id: 14,
//         checked: false,
//         color: "grey",
//         text: "sushi bars",
//     },
//     {
//         id: 15,
//         checked: false,
//         color: "grey",
//         text: "american",
//     },
//     {
//         id: 16,
//         checked: false,
//         color: "grey",
//         text: "vegan",
//     },
// ]