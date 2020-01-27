import React from "react";
import { View} from "react-native";
import TitleBar from "./src/components/TitleBar";
import Nav from "./src/components/Navigation";
import styles from "./src/Styles";
import "./src/Firebase";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TitleBar />
        <Nav />
      </View>
    );
  }
}