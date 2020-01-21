import React from "react";
import {View, Keyboard, KeyboardAvoidingView, SafeAreaView} from "react-native";
import TitleBar from "./src/components/TitleBar";
import Nav from "./src/components/Navigation";
import styles from "./src/Styles";

// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';

// const androidConfig = {
//   clientId: "300138407276-nf29ugm0nrua801s1skghupju3b6nna7.apps.googleusercontent.com",
//   appId: "1:300138407276:android:f956f4afe402539e3a3f49",
//   apiKey: "AIzaSyCyx4abID-35jQ4VehRL_AkulsTKWuZ-7I",
//   databaseURL: "https://transcendlife-456de.firebaseio.com",
//   storageBucket: "transcendlife-456de.appspot.com",
//   messagingSenderId: "300138407276",
//   projectId: "transcendlife-456de",


 
//   // enable persistence by adding the below flag
//   persistence: true,
// };

// firebase.initializeApp()
// import firebase from "firebase";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.keyboardDidShow = this.keyboardDidShow.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
  }

  keyboardDidShow() {
    this.setState({ paddingBottom: 100 })
    console.log("sh in main")
  }

  keyboardDidHide() {
    this.setState({ paddingBottom: 0 })
    console.log("hidde in main")
  }
  // get user() {
  //   return {
  //     _id: Fire.uid,
  //     name: this.props.navigation.state.params.name
  //   }
  // }

  // componentDidMount() {
  //   Fire.get(message =>
  //     this.setState(previous => ({
  //         messages: "testing messages"
  //     }))  
  //   )
  // }

  // componentWillUnmount() {
  //   Fire.off();
  // }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={{display: 'flex'}}> */}
          <TitleBar/>
          <Nav/>
        {/* </View> */}
      </View>
    );
  }
}