import React from "react"
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native"
import Home from "./Screens/Home"

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
        <Home />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "#000"
  }
})
