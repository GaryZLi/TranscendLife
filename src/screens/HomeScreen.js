import React from 'react';
import {View, Text} from 'react-native';
import styles from "../Styles";
import SideBar from "../components/SideBar";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {apiKey} from "../Yelp";
import axios from "axios"

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hour: 0,
            mealText: "",
            config: {
                headers: {
                    "Authorization": `Bearer ${apiKey}`
                },
                params: {
                    term: "",
                    longtitude: 10,
                    latitude: 10,
                    radius: 0
                }
            },
            error: false,
            errorMsg: ""
        }

        this.getLocation = this.getLocation.bind(this);
        this.getHour = this.getHour.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getHour(), 1000);
        this.getLocation();

        fetch("https://api.yelp.com/v3/businesses/search", this.state.config)
        .then(results => results.json())
        .then(response => console.log("here", response))

        // console.log("here", this.state.errorMsg)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

    async getLocation (location) {
        navigator.geolocation.getCurrentPosition(
            (position) => this.setState(prev => {
                let newConfig = {
                    config: {...prev.config}
                }

                newConfig.config.params.longtitude = position.coords.longitude;
                newConfig.config.params.latitude = position.coords.latitude;

                return newConfig
            }),
            (error) => this.setState({error: true, errorMsg: error.code}),
            {
                enableHighAccuracy: false,
                maximumAge: 10000,
                timeout: 8000
            }
        )

        console.log("here")
    }

    handleSearch(searchQuery, radius) {
        this.getLocation();
        this.setState((prev) => {
            let newConfig = {
                config: {...prev.config}
            }

            newConfig.config.params.term = searchQuery;
            newConfig.config.params.radius = radius;

            return newConfig
        })

        let results = axios.get("https://api.yelp.com/v3/businesses/search", this.state.config)
        .then(results => console.log("result", results))
        .catch(error => this.setState({error: true, errorMsg: error.code}));
        console.log(results)
    }

    render() {
        return (
            <View>
                <SideBar switch={this.props.switch} timeOfDay={this.state.timeOfDay} search={this.handleSearch}/>
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
                <TouchableOpacity style={styles.chooseButton}><Text style={{color: "white"}}>Choose</Text></TouchableOpacity>             
                {this.state.error && <Text style={styles.errorText}>{this.state.errorMsg}</Text>}
            </View>
        )
    }
}