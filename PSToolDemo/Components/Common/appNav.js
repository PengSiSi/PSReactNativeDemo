
/*
  导航
*/
import React, { Component } from 'react';

import {
  Text,
  Image,
  StyleSheet,
  Platform
} from 'react-native';

import {
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';

import Home from './../Home/home';
import RN_pullDemo from './../Home/Pages/PullListDemo/rn_pullDemo';
import RN_htmlTextDemo from './../Home/Pages/HtmlTextDemo/rn_htmltextDemo';
import WebViewDemo from './../../Components/Home/Pages/WebViewDemo/webViewDemo';
import ToastDemo from './../Home/Pages/ToastDemo/toastDemo';
import HtmlViewDemo from './../Home/Pages/HtmlViewDemo/htmlViewDemo';
import ListViewDemo from './../Home/Pages/ListViewDemo/ListViewDemo';
import Drawer from 'react-native-drawer'
import Side from './../Home/sidePage';

const AppNav = StackNavigator({
  HomeScreen: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: '首页',
      headerLeft: <Text>侧滑</Text>,
      // 设置导航栏样式
      headerStyle: {
        backgroundColor: 'green',
    },
    // 设置安卓标题居中问题,仍然偏差40
    // https://github.com/react-community/react-navigation/issues/1728
    headerTitleStyle: {
      alignSelf: 'center',
      marginLeft: 40,
      marginRight: 80
    }
    }),
  },
   RN_pullDemoScreen: {
    screen: RN_pullDemo,
    navigationOptions: ({ navigation }) => ({
      title: '下拉刷新Demo',
    // 设置导航栏样式
    headerStyle: {
      backgroundColor: 'white',
    },
    }),
  },
  RN_htmlTextDemoScreen: {
    screen: RN_htmlTextDemo,
    navigationOptions: ({ navigation }) => ({
      title: 'HTML文本显示Demo',
    // 设置导航栏样式
    headerStyle: {
      backgroundColor: 'white',
    },
    }),
  },
  WebViewDemoScreen: {
    screen: WebViewDemo,
    navigationOptions: ({ navigation }) => ({
      title: 'WebView的使用',
    headerStyle: {
      backgroundColor: 'white',
    },
    }),
  },
  ToastDemoScreen: {
    screen: ToastDemo,
    navigationOptions: ({ navigation }) => ({
      title: 'Toast的使用',
    headerStyle: {
      backgroundColor: 'white',
    },
    }),
  },
  HtmlViewScreen: {
    screen: HtmlViewDemo,
    navigationOptions: ({ navigation }) => ({
      title: 'HtmlView的使用',
    headerStyle: {
      backgroundColor: 'white',
    },
    }),
  },
  ListViewScreen: {
    screen: ListViewDemo,
    navigationOptions: ({ navigation }) => ({
      title: 'ListView的使用',
    headerStyle: {
      backgroundColor: 'white',
    },
    }),
  },
});

 class Main extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
  }

  render() {
    <Drawer
      type="static"
      content={<Side />}
      openDrawerOffset={100}
      styles={drawerStyles}
      tweenHandler={Drawer.tweenPresets.parallax}
      >
    <Home />
</Drawer>
  }
}
const styles = StyleSheet.create({
    leftItemStyle: {
        width: Platform.OS === 'ios'? 30: 40,
        height: Platform.OS === 'ios'? 30: 40,
        marginLeft: 10
    }
});

export default AppNav;