/**
 * Created by xzh on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import HTMLView from 'react-native-htmlview';

export default class extends Component {
    render() {
    const htmlContent = `<p><a href="http://jsdf.co">&hearts; nice job!</a>
    </p><img src="http://pic78.huitu.com/res/20160604/1029007_20160604114552332126_1.jpg" width="100" height="100"/>
    <p style="font-size: 30px;">Hello world<b>world</b>
     <i>foo</i> bar hahh</p>
     <br/><hr/>
     <a href="http://jsdf.co">点击跳转</a>
     <br/>
     <ol><li>aaa</li><li>bbb</li><li>ccc</li></ol>
     <img src="https://i.redd.it/1101wjsv22my.jpg" width="100" height="100"/>
     <p>Hello world<b>world</b> <i>foo</i> bar hahh</p>
     <br/><hr/>
     <a href="http://jsdf.co">点击跳转</a>
     <br/>
     <ol><li>aaa</li><li>bbb</li><li>ccc</li></ol>
     <img src="https://i.redd.it/1101wjsv22my.jpg" width="100" height="100"/>
     <p>Hello world<b>world</b> <i>foo</i> bar hahh</p>
     <br/>
     <hr/>
     <a href="http://jsdf.co">点击跳转</a>
     <br/>
     <ol><li>aaa</li><li>bbb</li><li>ccc</li></ol>`;

    return (
      <View style = {styles.bgViewStyle}>
      <View style = {styles.container}>
      <HTMLView
        value={htmlContent}
        stylesheet={styles}
      />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

bgViewStyle: {
    backgroundColor: 'white',
    flex: 1,
},
 container: {
        
        backgroundColor: 'white',
        margin: 10
    },
  a: {
    fontWeight: '300',
    color: '#F18F0F', // make links coloured pink
  },
  img: {
    textAlign:'center',
    marginBottom:10
  }
});