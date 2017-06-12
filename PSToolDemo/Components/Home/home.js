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
  PixelRatio
} from 'react-native';

import RN_pullDemo from './../Home/Pages/PullListDemo/rn_pullDemo';
import WebViewDemo from './Pages/WebViewDemo/webViewDemo';
import ToastDemo from './../Home/Pages/ToastDemo/toastDemo';
import ListViewDemo from './Pages/ListViewDemo/ListViewDemo';

export default class Home extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        '1.下拉刷新的使用', '2.HTML文本显示', '3.WebView的使用', '4.Toast的使用', '5.HtmlView的使用', '6.ListView使用', 'Julie', 'Devin'
      ])
    };
    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
      return(
          <View style = {styles.cellStyle}>
            <Text style = {styles.cellTextStyle} 
                  onPress = {this.pushToNextPage.bind(this,rowData, sectionID,rowID, highlightRow)}>{rowData}
            </Text>
          </View>
      )
  }
  // push操作
  pushToNextPage(rowData, sectionID, rowID, highlightRow) {
    console.log(rowID);
    // 下拉刷新,上拉加载的使用
    if (rowID == 0) {
      const { navigate } = this.props.navigation;
      navigate('RN_pullDemoScreen');
    }
    // 显示html文本的使用
    if (rowID == 1) {
      const { navigate } = this.props.navigation;
      navigate('RN_htmlTextDemoScreen');
    }
    // webView使用
    if (rowID == 2) {
      const { navigate } = this.props.navigation;
      navigate('WebViewDemoScreen');
    }
    // Toast的使用
    if (rowID == 3) {
      const { navigate } = this.props.navigation;
      navigate('ToastDemoScreen');
    }
    if (rowID == 4) {
      const {navigate} = this.props.navigation;
      navigate('HtmlViewScreen');
    }
    if (rowID == 5) {
     const {navigate} = this.props.navigation;
      navigate('ListViewScreen');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  // cell
  cellStyle: {
    borderBottomWidth: 1/PixelRatio.get(),
    borderBottomColor: '#666',
    flexDirection: 'row',
    padding: 10
},
  cellTextStyle: {
      fontSize: 17,
      textAlign: 'center'
}
});
