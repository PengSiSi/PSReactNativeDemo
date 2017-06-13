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

import Icon from 'react-native-vector-icons/FontAwesome';

export default class VectorIcon extends Component {
    render() {
        return (
            <View style={styles.container}>
                 <Icon
                    name="umbrella"   
                    size={30}   //图片大小
                    color="red"  //图片颜色
                 />
                 <Icon.Button    //在图片后加文字this
                    name="search"
                    backgroundColor="#3b5998"
                    onPress={this.loginIn.bind(this)} //点击该按钮后触发的方法
                    >
                    登录
                </Icon.Button>
            </View>
        );
    }

    loginIn() {
        alert('登录');
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