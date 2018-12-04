import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { MenuProvider } from 'react-native-popup-menu';
import Container from './Container'

export default class App extends Component {

  render () {
    return (
      <View style={styles.container}>
        <MenuProvider>
          <Container />
        </MenuProvider>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
