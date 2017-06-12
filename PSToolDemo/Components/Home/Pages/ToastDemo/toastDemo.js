/**
 * Created by xzh on 17/5/7.
 * https://github.com/crazycodeboy/react-native-easy-toast
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast';

export default class extends Component {
    render() {
        return (
            <View style={styles.container}>
            <Toast ref="toast" position='center'/>
            <TouchableOpacity onPress = {()=>this.showToast()}>
                <Text style={styles.welcome}>
                    弹出Toast
                </Text>
            </TouchableOpacity>
            </View>
        );
    }

    showToast() {
        // alert('show');
        this.refs.toast.show('用户名或者密码失败...');
        // ToastShort('用户名或者密码失败...');
        return;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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