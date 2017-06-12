
/**
 * 首页详情导航栏
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Util from './../Util/utils';

export default class NavigaionBar extends Component {

    static defaultProps = {
        popToHomeList: null,
        title: ''  // 标题
    };

    render() {
        return (
            <View style={styles.container}>
                    <TouchableOpacity onPress = {()=>{this.popToHomeList()}}>
                    </TouchableOpacity>
                    <Text style = {styles.titleStyle}>{this.props.title}</Text>
            </View>
        );
    }

    popToHomeList() {
        if (this.props.popToHomeList == null) {
            return;
        }
        this.props.popToHomeList();
    }
}

const styles = StyleSheet.create({
    container: {
        // 设置下面的线
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        height: 64,
        backgroundColor: 'green'
    },
    backItemStyle: {
        width: 10, height:15, marginLeft: 10,marginTop: 10,
        alignSelf: 'center' 

    },
    titleStyle: {
        fontSize: 17,
        width: 100,
        marginTop: 10,
        marginLeft: (Util.size.width - 100 - 50) / 2,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
    }
});