/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 
 * 根文件
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  PixelRatio,
} from 'react-native';

import Nav from './../Common/navigationBar';
import Home from './../Home/home';
import AppNav from './../Common/appNav';

export default class Root extends Component {

  // 构造方法
  constructor(props) {
    super(props);
    
  }
  
  render() {
      return(
    //       <NavigatorIOS
    //         initialRoute={{
    //         component: Home,
    //         title: '首页',
    //         }}
    //         style={{flex: 1}}
    //         barTintColor='green'
    //   />
    <AppNav/>
      )
  }
}

const styles = StyleSheet.create({

});
