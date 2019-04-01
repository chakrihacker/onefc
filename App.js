import React from "react"
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native"
import {Constants} from 'expo'
import Home from "./Screens/Home"

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
        <View style={styles.statusBar} />
        <Home />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "#000"
  },
  statusBar: {
    backgroundColor: "#000",
    height: Constants.statusBarHeight,
  },
})
