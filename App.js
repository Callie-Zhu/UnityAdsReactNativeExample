/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import UnityAds from 'react-native-unity-ads-module';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

    constructor() {
            super();

            this.state = {
                defaultPlacementState: ''
            };
        }

    componentDidMount() {
       Platform.OS === 'android' ? UnityAds.initialize('AndroidGameID') : UnityAds.initialize('iOSGameID');

        this._updateDefaultPlacementState();
        
        UnityAds.addEventListener('Ready', placementId => {
            this._updateDefaultPlacementState();

            console.log(`Ad with placementId "${placementId}" is ready.`);
        });

        UnityAds.addEventListener('Start', placementId => {
            console.log(`Ad with placementId "${placementId}" started.`);
        });

        UnityAds.addEventListener('Finish', (placementId, result) => {
            console.log(JSON.stringify(placementId));
            console.log(JSON.stringify(result));
            console.log(`Ad with placementId ${placementId} finished with result "${result}".`);
        });

        UnityAds.addEventListener('Error', (error, message) => {
            console.log(error);
            console.log(message);
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <Text onPress={() => this._updateDefaultPlacementState()}>Tap to get default ad's state: { this.state.defaultPlacementState }</Text>
            <Text onPress={() => this._showDefaultPlacementAd()} style={styles.text}>Tap here to start playing default ad.</Text>
            </View>
        );
    }

    _updateDefaultPlacementState() {
        UnityAds.getPlacementState(defaultPlacementState => {
            this.setState({
                defaultPlacementState: defaultPlacementState
            });
        });
    }

    _showDefaultPlacementAd() {
        UnityAds.show();
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

