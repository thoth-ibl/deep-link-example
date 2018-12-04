import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Picker,
  Switch,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

export const APPS = ["Zeyap", "Blockpass"];
export const ACTIONS = ["send"];
export const SUPPORT_COINS = [
  "bitcoin",
  "ethereum",
  "bitcoinCash",
  "dashcoin",
  "dogecoin",
  "litecoin",
  "ethereumClassic",
  "neo",
  "gas",
  "eos",
  "ada",
  "ont",
  "ong"
];

export const ZEYAP_URL = "infinitowallet://launch?fromApp={{fromApp}}&action={{action}}&coin={{coin}}&isCoin={{isCoin}}&address={{address}}&amount={{amount}}&redirect={{redirect}}";

type Props = {};
type State = {};

export default class Container extends Component<Props, State> {
  state = {
    fromApp: APPS[0],
    action: ACTIONS[0],
    coin: "neo",
    isCoin: true,
    address: "",
    amount: "",
    redirect: ""
  };

  goToInfinito = () => {
    Keyboard.dismiss()
    const {fromApp, action, coin, isCoin, address, amount, redirect} = this.state;
    const url = ZEYAP_URL
    .replace("{{fromApp}}", fromApp)
    .replace("{{action}}", action)
    .replace("{{coin}}", coin)
    .replace("{{isCoin}}", isCoin)
    .replace("{{address}}", address)
    .replace("{{amount}}", amount)
    .replace("{{redirect}}", redirect)

  // console.log('url: ', url);
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
  };

  renderPicker = (array, selected, onSelect) => {
    const pickerItems = array.map((item, index) => (
      <MenuOption
        key={item}
        onSelect={() => onSelect(item)}
      >
        <Text style={styles.menuOptionText}>{item}</Text>
      </MenuOption>
    ));
    const picker = (
      <Menu style={styles.menu}>
        <MenuTrigger>
          <Text style={styles.menuTriggerText}>{selected}</Text>
        </MenuTrigger>
        <MenuOptions>{pickerItems}</MenuOptions>
      </Menu>
    );
    return picker;
  };

  renderSelector = (title, array, selected, onSelect) => {
    return (
      <View
      style={styles.selector}
      >
        <View style={styles.selectorTitle}>
          <Text style={styles.selectorTitleText}>{title}</Text>
        </View>
        {this.renderPicker(array, selected, onSelect)}
      </View>
    )
  };

  onChangeSendCoin = (value) => {
    this.setState({isCoin: value})
  }

  renderIsCoin = () => {
    return (
      <View style={styles.isCoinWrapper}>
        <View style={styles.isCoinTitle}>
          <Text style={styles.isCoinTitleText}>{'Is Coin: '}</Text>
        </View>
        <View style={styles.switchWrapper}>
          <Switch onValueChange={this.onChangeSendCoin} value={this.state.isCoin}/>
        </View>
        
      </View>
    )
  }

  renderAddress = () => {
    return (
      <TextInput
          style={styles.textInput}
          placeholder={'Address'}
          onChangeText={this.onChangeAddress}
          value={this.state.address}
          underlineColorAndroid={"transparent"}
        />
    )
  }

  renderAmount = () => {
    return (
      <TextInput
          style={styles.textInput}
          placeholder={'Amount'}
          onChangeText={this.onChangeAmount}
          value={this.state.amount}
          underlineColorAndroid={"transparent"}
          keyboardType={"numeric"}
        />
    )
  }

  renderInfinitoDeepLink = () => {
    return(
      <TouchableOpacity onPress={this.goToInfinito} style={styles.infinitoButton}>
        <Text style={styles.infinitoButtonText}>{"Go To Infinito"}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const {fromApp, action, coin} = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding": "none"}>
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={styles.dismissKeyboardButton}>
          <View style={styles.content}>
              {this.renderSelector('App: ', APPS, fromApp, this.onSelectApp)}
              {this.renderSelector('Action: ', ACTIONS, action, this.onSelectAction)}
              {this.renderSelector('Coin: ', SUPPORT_COINS, coin, this.onSelectCoin)}
              {this.renderIsCoin()}
              {this.renderAddress()}
              {this.renderAmount()}
              {this.renderInfinitoDeepLink()}
            </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  onSelectApp = (value) => {
    this.setState({fromApp: value})
  }

  onSelectAction = (value) => {
    this.setState({action: value})
  }

  onSelectCoin = (value) => {
    this.setState({coin: value})
  }
  
  onChangeAddress = (value) => {
    this.setState({address: value})
  }

  onChangeAmount = (value) => {
    this.setState({amount: value})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#607d8b"
  },
  dismissKeyboardButton: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "center"
  },
  infinitoButton: {
    marginTop: 30,
    backgroundColor: "#263238",
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infinitoButtonText: {
    fontWeight: 'bold',
    color: "#FFFFFF"
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 5,
    paddingLeft: 16,
    backgroundColor:"#FFFFFF"
  },
  switchWrapper: {
    flex: 4,
    alignItems: 'flex-end'
  },
  isCoinTitle: {
    flex: 1
  },
  isCoinTitleText: {
    fontWeight: 'bold',
    color: "#FFFFFF"
  },
  isCoinWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  selectorTitleText: {
    fontWeight: 'bold',
    color: "#FFFFFF"
  },
  selectorTitle: {
    flex: 1
  },
  selector: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: 'center'
  },
  menuTriggerText: {
    color: '#000000'
  },
  menu: {
    flex: 3,
    paddingLeft: 16,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    minWidth: 100,
    height: 30,
    justifyContent: 'center'
  },
  menuOptionText: {
    color: '#000000'
  }
});
