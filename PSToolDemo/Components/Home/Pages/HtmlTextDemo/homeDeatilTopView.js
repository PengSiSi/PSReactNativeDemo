/*
  详情顶部标题栏
*/
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class HomeDetailTopView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.titleTextStyle} numberOfLines={0}>{this.props.title}</Text>
                <View style = {styles.bottomViewStyle}>
                    <Text style = {{color:'gray'}}>{this.props.author}</Text>
                    <Text style = {{color:'gray'}}>{this.props.time}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        backgroundColor: 'white',
    },

    titleTextStyle: {
        marginLeft: 18,
        marginRight: 20,
        marginTop: 40,
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },

    bottomViewStyle: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});