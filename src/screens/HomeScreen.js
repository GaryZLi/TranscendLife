import React from 'react';
import {View, Text} from 'react-native';
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
            hour: 0,
            mealText: "",
            userData: {},
            businesses: [],
            username: "",
            error: false,
            errorMsg: "",
        }

        this.getUserInfo = this.getUserInfo.bind(this);
        this.defineParameters = this.defineParameters.bind(this);
        this.getHour = this.getHour.bind(this);
        this.getFood = this.getFood.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getHour(), 1000);
        this.getUserInfo();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async getUserInfo() {
        let username = firebase.auth().currentUser.email.replace(/\./g, "dot").replace(/\-/g, "dash")
        this.setState({username: username})

        let preferences = ""
        let ref = firebase.database().ref("Users/" + username);
        ref.once("value")
        .then(results => {
            this.setState({userData: results.child("recommend")})

            let pref = results.child("preferences").toJSON()
            let total = Object.keys(pref).length

            for (let i = 0; i < total; i++) {
                preferences =  preferences + pref[i] + ", "
            }

            this.defineParameters(preferences);
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

    defineParameters(preferences) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let config = {
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    params: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        limit: 50,
                        open_now: true,
                        categories: preferences
                    }
                }

                axios.get("https://api.yelp.com/v3/businesses/search", config)
                .then((results) => this.getFood(results.data.businesses)) // this is an array of objects
                .catch((error) => this.setState({error: true, errorMsg: error.code}))
            },
            (error) => this.setState({error: true, errorMsg: error.code}),
            {
                enableHighAccuracy: false,
                maximumAge: 10000,
                timeout: 8000
            }
        )
    }

    sortDistance(tempArr, size) {      
        let array = tempArr.slice(0);
        let smallest; 
        let temp;

        for (let i = 0; i < size - 1; i++) {
            smallest = i;
            for (let j = i + 1; j < size; j++) {
                if (array[j].distance < array[smallest].distance) {
                    smallest = j;
                }
            }
            temp = array[i];
            array[i] = array[smallest];
            array[smallest] = temp;
        }

        return array
    }

    sortRating(tempArr, size) {
        let array = tempArr.slice(0);
        let biggest; 
        let temp;

        for (let i = 0; i < size - 1; i++) {
            biggest = i;
            for (let j = i + 1; j < size; j++) {
                if (array[j].rating > array[biggest].rating) {
                    biggest = j;
                }
            }
            temp = array[i];
            array[i] = array[biggest];
            array[biggest] = temp;
        }
        
        return array
    }

    sortPrice(tempArr, size) {
        let array = tempArr.slice(0);
        let smallest; 
        let temp;

        for (let i = 0; i < size - 1; i++) {
            smallest = i;
            for (let j = i + 1; j < size; j++) {
                if (array[j].price < array[smallest].price) {
                    smallest = j;
                }
            }
            temp = array[i];
            array[i] = array[smallest];
            array[smallest] = temp;
        }

        return array
    }

    getFood(businesses) {   
        let storedBusinesses = []
        let data = {}

        for (let business in businesses) {
            data = {
                name: businesses[business].name,
                phone: businesses[business].phone,
                price: businesses[business].price === "$"? 1 : businesses[business].price === "$$"? 2 : businesses[business].price === "$$$"? 3 : 4,
                rating: businesses[business].rating,
                distance: businesses[business].distance,
                address: businesses[business].location.address1,
                state: businesses[business].location.state,
                zip_code: businesses[business].location.zip_code,
                display_address: businesses[business].location.display_address
            }

            storedBusinesses.push(data)
        }


        let getSortedDistance = this.sortDistance(storedBusinesses, storedBusinesses.length);
        let getSortedRating = this.sortRating(storedBusinesses, storedBusinesses.length);
        let getSortedPrice = this.sortPrice(storedBusinesses, storedBusinesses.length);

        let results = {}
        results[getSortedPrice[0].name] = 0;

        console.log(results[getSortedPrice[0].name])



        // console.log(getSortedDistance);

        // Object {
        //     "averageDistance": 0,
        //     "averagePrice": 0,
        //     "averageRating": 0,
        //     "radius": 10000,
        //     "total": 0,
        // }
    }

    render() {
        return (
            <View>
                <SideBar switch={this.props.switch} timeOfDay={this.state.timeOfDay} search={this.handleSearch} />
                <Text style={styles.mealText}>{this.state.mealText}</Text>
                <ScrollView style={styles.homeView}>
                    <View style={styles.suggestedView}>
                        <Text>
                            resta name, phone numba, pic?, once clicked maybe show a guidance route, mmmm maybe add weather to see if ice cream, soup, etc is suitable for the weather
                        </Text>
                        <Text>
                            price? https://api.yelp.com/v3.
                        </Text>
                        <Text>
                            dist?
                        </Text>
                        <Text>
                            rating?
                        </Text>
                        <Text>
                            type of food
                        </Text>
                        <Text>
                            Here's the pick for you today
                        </Text>
                    </View>
                    <View style={styles.suggestedView}>
                        <Text>
                            Here's the pick for you today
                        </Text>
                    </View>
                    <View style={styles.suggestedView}>
                        <Text>
                            Here's the pick for you today
                        </Text>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.chooseButton}><Text style={{ color: "white" }}>Choose</Text></TouchableOpacity>
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