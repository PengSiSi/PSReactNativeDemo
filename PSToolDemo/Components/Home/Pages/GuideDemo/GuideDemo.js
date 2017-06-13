
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

import Guide from './../../../Guide/Guide';

const imagesArr = [require('./../../../Images/guide1.png'),
                   require('./../../../Images/guide2.png'),
                   require('./../../../Images/guide3.png'),
                   require('./../../../Images/guide4.png')
                  ]
export default class extends Component {
    render() {
        return (
            // <View style={styles.container}>
               <Guide imagesArr={imagesArr} callBack = {()=>{this.jumpToHome()}}></Guide>
            // </View>
        );
    }

    jumpToHome() {
        alert('跳转到主页面');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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