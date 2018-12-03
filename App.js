/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  goToInfinito = () => {
    const url = "infinitowallet://launch?fromApp=Zeyap&action=send&coin=neo&isCoin=true&address=0x1f597c1cc90e90846f3685643f0721fd427c180b&amount=2.0&redirect=xxx";
    // const url = "infinitowallet://send/eth/?toAddress=0xf6d8e58a8d8b05fc17016787b3713742e3fb1721";
    // const url = 'infinitowallet://deeplink?fromApp=zeyap&action=send&isCoin=true&toAddress=0x1f597c1cc90e90846f3685643f0721fd427c180b&amount=0.002';

    Linking.canOpenURL(url)
      .then(supported => {
        console.log(" App/canOpenURL supported: " + supported);
        if (!supported) {
          // Go to the store and install app
          console.log(" App can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error("App an error occurred", err));

    // var regex = /[?&]([^=#]+)=([^&#]*)/g,
    //     url = "www.domain.com/?v=123&p0=hello&p1=hello&p2=hello&p=hello3&p=hello",
    //     params = {},
    //     match;
    // while(match = regex.exec(url)) {
		//     console.log('match: ', match);
    //     params[match[1]] = match[2];
    // }
    // const params = this.getUrlParams(url)
    // console.log('goToInfinito param: ', params);
  };


getUrlParams = (url) => {
    let hashes = url.slice(url.indexOf('?') + 1).split('&')
    let params = {}
    hashes.map(hash => {
        let [key, val] = hash.split('=')
        params[key] = decodeURIComponent(val)
    })

    return params
}

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToInfinito}>
          <Text>{'Go to Infinito'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
