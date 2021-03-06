import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import styles from "../Styles";
import SideBar from "../components/SideBar";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {apiKey} from "../Yelp";
import axios from "axios"
import firebase from "firebase";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            hour: 0,
            mealText: "",
            userData: {},
            pref: [],
            businesses: [],
            chosen: "",
            error: false,
            errorMsg: "",
        }

        this.getUserInfo = this.getUserInfo.bind(this);
        this.defineParameters = this.defineParameters.bind(this);
        this.getHour = this.getHour.bind(this);
        this.getFood = this.getFood.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.config = {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
            },
            params: {}
        }
    }

    componentDidMount() {
        this.getHour()
        this.getUserInfo();
    }

    notIn(arr, target) {
        for (let val in arr) {
            if (arr[val] === target) {
                return false;
            }
        }

        return true;
    }

    getUserInfo() {
        let username = firebase.auth().currentUser.email.replace(/\./g, "dot").replace(/\-/g, "dash")
        this.setState({username: username})

        let preferences = ""
        let ref = firebase.database().ref("Users/" + username);
        ref.once("value")
        .then(results => {
            let pref = results.child("preferences").toJSON();
            let prefVal = [];
            let max = 0;

            let data = results.child('history').toJSON();

            for (let i in data) {
                if (data[i] > max) {
                    max = data[i];
                }
            }

            for (let val in pref) {
                preferences =  preferences + pref[val] + ", ";
                prefVal.push(pref[val]);
                data[pref[val]] += max;
            }
            
            this.setState({userData: data, pref: prefVal});

            data = Object.keys(this.state.userData).map(item => [item, this.state.userData[item]]);
            this.sort(data, 0, data.length-1, 'ranking');

            for (let i = 0; i < 5; i++) {
                if (this.notIn(prefVal, data[i][0])) {
                    preferences =  preferences + data[i][0] + ", ";
                }
            }
            
            this.defineParameters({categories: preferences, limit: 50});
        })
        .catch(error => this.setState({error: true, errorMsg: error.code}))
    }
    
    getHour() {
        let time = new Date(Date.now())
        time = time.getHours() 
        if (time >= 0 && time < 12) {
            time = "Here's the pick for breakfast"
        }
        else if (time >= 12 && time < 18) {
            time = "Here's the pick for lunch"
        }
        else {
            time = "Here's the pick for dinner"
        }

        this.setState({mealText: time})
    }

    defineParameters(parameter) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.config['params'] = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    open_now: true,
                    ...parameter
                }

                axios.get("https://api.yelp.com/v3/businesses/search", this.config)
                .then((results) => this.getFood(results.data.businesses)) 
                .catch((error) => this.setState({error: true, errorMsg: error.code}))
            },
            (error) => this.setState({error: true, errorMsg: error.code}),
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 8000
            }
        )
    }

    handleSearch(search, distance) {
        this.setState(() => ({mealText: "User Custom Search"}))
        return this.defineParameters({term: search, radius: distance})
    }

    partition(array, start, end, type) {
        let index = start - 1;
        let temp;

        if (type === "distance") {
            let pivot = array[end].distance;

            for (let i = start; i < end; i++) {
                if (array[i].distance < pivot) {
                    index++;
                    temp = array[i];
                    array[i] = array[index];
                    array[index] = temp;
                }
            }
        }
        else if (type === "rating") {
            let pivot = array[end].rating;

            for (let i = start; i < end; i++) {
                if (array[i].rating > pivot) {
                    index++;
                    temp = array[i];
                    array[i] = array[index];
                    array[index] = temp;
                }
            }
        }
        else if (type === "price") {
            let pivot = array[end].price;

            for (let i = start; i < end; i++) {
                if (array[i].price < pivot) {
                    index++;
                    temp = array[i];
                    array[i] = array[index];
                    array[index] = temp;
                }
            }
        }
        else if (type === 'ranking') {
            let pivot = array[end][1];

            for (let i = start; i < end; i++) {
                if (array[i][1] > pivot) {
                    index++;
                    temp = array[i];
                    array[i] = array[index];
                    array[index] = temp;
                }
            }
        }

        index++;
        temp = array[index];
        array[index] = array[end];
        array[end] = temp;
        return index;
    }
    
    // quicksort with end as the last index
    sort(array, start, end, type) {
        if (start < end) {
            let index = this.partition(array, start, end, type);

            this.sort(array, start, index-1, type);
            this.sort(array, index+1, end, type);
        } 

        return array;
    }

    // add preferences to ranking
    getRanking(distance, rating, price) {
        let results = {};
        let maxPoints = distance.length;

        for (let result in distance) {
            results[distance[result].phone] = [distance[result], 0]
        }

        for (let result in distance) {
            results[distance[result].phone][1] += maxPoints
            results[rating[result].phone][1] += maxPoints
            results[price[result].phone][1] += maxPoints
            maxPoints -= 1
        }        
        
        let outputs = []

        for (let result in results) {
            outputs.push(results[result])
        }

        for (let output in outputs) {
            for (let alias in outputs[output][0]['alias']) {
                outputs[output][1] += this.state.userData[outputs[output][0]['alias'][alias].alias];
            }
        }

        this.sort(outputs, 0, outputs.length-1, "ranking");
        
        // return the top 10 outputs
        return outputs.slice(0, 10);
    }

    getFood(businesses) {        
        let storedBusinesses = []
        let data = {}

        for (let business in businesses) {
            data = {
                id: businesses[business].id,
                name: businesses[business].name,
                phone: businesses[business].phone,
                price: businesses[business].price === "$"? 1 : businesses[business].price === "$$"? 2 : businesses[business].price === "$$$"? 3 : 4,
                rating: businesses[business].rating,
                distance: businesses[business].distance,
                number: businesses[business].phone,
                website: businesses[business].url,
                catergory: businesses[business].categories[0].title,
                alias: businesses[business].categories,
                address: businesses[business].location.address1,
                city: businesses[business].location.city,
                state: businesses[business].location.state,
                zip_code: businesses[business].location.zip_code,
                display_address: businesses[business].location.display_address,
                latitude: businesses[business].coordinates.latitude,
                longitude: businesses[business].coordinates.longitude,
            }

            storedBusinesses.push(data)
        }

        let sortedDistance, sortedRating, sortedPrice;
        sortedDistance = storedBusinesses.slice(0);
        sortedRating = storedBusinesses.slice(0);
        sortedPrice = storedBusinesses.slice(0);

        sortedDistance = this.sort(sortedDistance, 0, sortedDistance.length-1, "distance");
        sortedRating = this.sort(sortedRating, 0, sortedRating.length-1, "rating");
        sortedPrice = this.sort(sortedPrice, 0, sortedPrice.length-1, "price");

        this.setState({businesses: this.getRanking(sortedDistance, sortedRating, sortedPrice)});
    }

    // once confirmed, add all the details to the database 
    // maybe using updated detail, fix the chosen algorithmn
    handleConfirm() {
        if (this.state.chosen === "") {
            return 
        }

        axios.get('https://api.yelp.com/v3/businesses/' + this.state.chosen['id'], this.config)
        .then(result => {
            let categories = result['data'].categories;
            let data = this.state.userData;

            const ref = firebase.database().ref('Users/' + this.state.username + '/history');
            
            for (let catergory in categories) {
                data[categories[catergory]['alias']] += 1
                ref.update({
                    [categories[catergory]['alias']]: data[categories[catergory]['alias']]
                })
            }
        })

        const lat = this.state.chosen.latitude;
        const long = this.state.chosen.longitude;
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${long}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        Linking.openURL(url); 
    }

    render() {
        let display = this.state.businesses.map((business, id) => {return (
            <TouchableOpacity key={id} style={[styles.suggestedView, {borderColor: (this.state.chosen.name === business[0].name && this.state.chosen.address === business[0].address)? "red" : "black"}]} onPress={() => this.setState({chosen: business[0]})}> 
                <Text>
                    Name: {business[0].name}
                </Text>
                <Text>
                    Phone Number: {business[0].number}
                </Text>
                <Text>
                    Catergory: {business[0].catergory}
                </Text>
                <Text>
                    Distance: {(Math.round(business[0].distance * 100) / 100000).toFixed(2)} miles
                </Text>
                <Text>
                    Rating: {business[0].rating} stars
                </Text>
                <Text>
                    Price: {business[0].price === 1? '$' : business[0].price === 2? '$$' : business[0].price === 3? '$$$' : '$$$$'} 
                </Text>
                <Text>
                    Address: {business[0].address} 
                </Text>
                <Text>
                    City: {business[0].city}
                </Text>
                <Text>
                    State: {business[0].state}
                </Text>
                <Text>
                    Zip Code: {business[0].zip_code}
                </Text>
            </TouchableOpacity>
        )})

        return (
            <View>
                <SideBar switch={this.props.switch} timeOfDay={this.state.timeOfDay} search={this.handleSearch} />
                <Text style={styles.mealText}>{this.state.mealText}</Text>
                <ScrollView style={styles.homeView}>
                    {display}
                    {/* <View style={styles.suggestedView}>
                        <Text>
                            resta name, phone numba, pic?, once clicked maybe show a guidance route, mmmm maybe add weather to see if ice cream, soup, etc is suitable for the weather
                        </Text>
        */}
                </ScrollView>
                <TouchableOpacity style={styles.chooseButton} onPress={() => this.handleConfirm()}><Text style={{ color: "white" }}>Choose</Text></TouchableOpacity>
                {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
            </View>
        )
    }
}






































































// import React from 'react';
// import {View, Text} from 'react-native';
// import styles from "../Styles";
// import SideBar from "../components/SideBar";
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import {apiKey} from "../Yelp";
// import axios from "axios"
// import firebase from "firebase";

// export default class HomeScreen extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             hour: 0,
//             mealText: "",
//             userData: {},
//             businesses: [],
//             username: "",
//             error: false,
//             errorMsg: "",
//         }

//         this.getUserInfo = this.getUserInfo.bind(this);
//         this.defineParameters = this.defineParameters.bind(this);
//         this.getHour = this.getHour.bind(this);
//         this.getFood = this.getFood.bind(this);
//     }

//     componentDidMount() {
//         this.interval = setInterval(() => this.getHour(), 1000);
//         this.getUserInfo();
//     }

//     componentWillUnmount() {
//         clearInterval(this.interval);
//     }

//     async getUserInfo() {
//         let username = firebase.auth().currentUser.email.replace(/\./g, "dot").replace(/\-/g, "dash")
//         this.setState({username: username})

//         let preferences = ""
//         let ref = firebase.database().ref("Users/" + username);
//         ref.once("value")
//         .then(results => {
//             this.setState({userData: results.child("recommend")})

//             let pref = results.child("preferences").toJSON()
//             let total = Object.keys(pref).length

//             for (let i = 0; i < total; i++) {
//                 preferences =  preferences + pref[i] + ", "
//             }

//             this.defineParameters(preferences);
//         })
//         .catch(error => this.setState({error: true, errorMsg: error.code}))
//     }
    
//     getHour() {
//         let time = new Date(Date.now())
//         time = time.getHours() 
//         if (time >= 0 && time < 12) {
//             time = "Here's the pick for breakfast"
//         }
//         else if (time >= 12 && time < 18) {
//             time = "Here's the pick for lunch"
//         }
//         else {
//             time = "Here's the pick for dinner"
//         }

//         this.setState({mealText: time})
//     }

//     defineParameters(preferences) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 let config = {
//                     headers: {
//                         "Authorization": `Bearer ${apiKey}`,
//                     },
//                     params: {
//                         latitude: position.coords.latitude,
//                         longitude: position.coords.longitude,
//                         limit: 10,
//                         open_now: true,
//                         categories: preferences
//                     }
//                 }

//                 axios.get("https://api.yelp.com/v3/businesses/search", config)
//                 .then((results) => this.getFood(results.data.businesses)) // this is an array of objects
//                 .catch((error) => this.setState({error: true, errorMsg: error.code}))
//             },
//             (error) => this.setState({error: true, errorMsg: error.code}),
//             {
//                 enableHighAccuracy: false,
//                 maximumAge: 10000,
//                 timeout: 8000
//             }
//         )
//     }

//     test(array, size) {
//         let smallest; 
//         let temp;

//         for (let i = 0; i < size - 1; i++) {
//             smallest = i;
//             for (let j = i + 1; j < size; j++) {
//                 if (array[j].distance < array[smallest].distance) {
//                     smallest = j;
//                 }
//             }
//             temp = array[i];
//             array[i] = array[smallest];
//             array[smallest] = temp;
//         }

//         console.log(array)
//     }

//     sortDistance(array, size) {      
//         let smallest; 
//         let temp;

//         for (let i = 0; i < size - 1; i++) {
//             smallest = i;
//             for (let j = i + 1; j < size; j++) {
//                 if (array[j].distance < array[smallest].distance) {
//                     smallest = j;
//                 }
//             }
//             temp = array[i];
//             array[i] = array[smallest];
//             array[smallest] = temp;
//         }
        
//         return array
//     }

//     sortRating(array, size) {
//         let smallest; 
//         let temp;

//         for (let i = 0; i < size - 1; i++) {
//             smallest = i;
//             for (let j = i + 1; j < size; j++) {
//                 if (array[j].rating < array[smallest].rating) {
//                     // console.log(array[j].rating, "---", array[smallest].rating)
//                     smallest = j;
//                 }
//             }
//             temp = array[i];
//             array[i] = array[smallest];
//             array[smallest] = temp;
//         }
        
//         return array
//     }

//     sortPrice(array, size) {
//         let smallest; 
//         let temp;

//         for (let i = 0; i < size - 1; i++) {
//             smallest = i;
//             for (let j = i + 1; j < size; j++) {
//                 if (array[j].price < array[smallest].price) {
//                     smallest = j;
//                 }
//             }
//             temp = array[i];
//             array[i] = array[smallest];
//             array[smallest] = temp;
//         }

//         return array
//     }

//     getFood(businesses) {   
//         let storedBusinesses = []
//         let data = {}

//         for (let business in businesses) {
//             data = {
//                 name: businesses[business].name,
//                 phone: businesses[business].phone,
//                 price: businesses[business].price === "$"? 1 : businesses[business].price === "$$"? 2 : businesses[business].price === "$$$"? 3 : 4,
//                 rating: businesses[business].rating,
//                 distance: businesses[business].distance,
//                 address: businesses[business].location.address1,
//                 state: businesses[business].location.state,
//                 zip_code: businesses[business].location.zip_code,
//                 display_address: businesses[business].location.display_address
//             }

//             storedBusinesses.push(data)
//         }

//         this.test([32, 23 ,23 ,23542,523,2,3 ,32, 32, 3,2 ,23 ,67657,3 ,5], [32, 23 ,23 ,23542,523,2,3 ,32, 32, 3,2 ,23 ,67657,3 ,5].length)

//         // let getSortedDistance = this.sortDistance(storedBusinesses, storedBusinesses.length);
//         // let getSortedRating = this.sortRating(storedBusinesses, storedBusinesses.length);
//         // let getSortedPrice = this.sortPrice(storedBusinesses, storedBusinesses.length);


//         // let v 
//         // for (v in getSortedDistance) {
//         //     console.log("distance", getSortedDistance[v].distance)
//         // }
//         // console.log("\n")
//         // for (v in getSortedRating) {
//         //     console.log("rating:", getSortedRating[v].rating)
//         // }
//         // console.log("\n")
//         // for (v in getSortedPrice) {
//         //     console.log("price:", getSortedPrice[v].price)
//         // }
        
//         // Object {
//         //     "averageDistance": 0,
//         //     "averagePrice": 0,
//         //     "averageRating": 0,
//         //     "radius": 10000,
//         //     "total": 0,
//         // }
//     }

//     render() {
//         return (
//             <View>
//                 <SideBar switch={this.props.switch} timeOfDay={this.state.timeOfDay} search={this.handleSearch} />
//                 <Text style={styles.mealText}>{this.state.mealText}</Text>
//                 <ScrollView style={styles.homeView}>
//                     <View style={styles.suggestedView}>
//                         <Text>
//                             resta name, phone numba, pic?, once clicked maybe show a guidance route, mmmm maybe add weather to see if ice cream, soup, etc is suitable for the weather
//                         </Text>
//                         <Text>
//                             price? https://api.yelp.com/v3.
//                         </Text>
//                         <Text>
//                             dist?
//                         </Text>
//                         <Text>
//                             rating?
//                         </Text>
//                         <Text>
//                             type of food
//                         </Text>
//                     </View>
//                     <View style={styles.suggestedView}>
//                         <Text>
//                             Here's the pick for you today
//                         </Text>
//                     </View>
//                     <View style={styles.suggestedView}>
//                         <Text>
//                             Here's the pick for you today
//                         </Text>
//                     </View>
//                 </ScrollView>
//                 <TouchableOpacity style={styles.chooseButton}><Text style={{ color: "white" }}>Choose</Text></TouchableOpacity>
//                 {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
//             </View>
//         )
//     }
// }