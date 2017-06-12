/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Root from './Components/Root/root';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class PSToolDemo extends Component {
  render() {
    return (
      <Root/>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('PSToolDemo', () => PSToolDemo);
