import React from "react";
import { View, Text } from "react-native";
import TitleBar from "./src/components/TitleBar";
import Nav from "./src/components/Navigation";
import styles from "./src/Styles";
import "./Firebase";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={{display: 'flex'}}> */}
        <TitleBar />
        <Nav />
        {/* </View> */}
      </View>
    );
  }
}