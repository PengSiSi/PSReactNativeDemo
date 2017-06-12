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


export default class ReadList extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.fileListData);
        this.state = {
        };
    };

    static defaultProps = {
        readList: '',  // 已读
        noReadList: ''  // 未读
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                   教师用户阅读情况一览表 (黑色：表示已阅、绿色：表示未阅)
                </Text>
                <Text style={styles.readTextStyle}>
                   {this.props.readList}
                </Text>
                <Text style={styles.noReadTextStyle}>
                   {this.props.noReadList}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
        margin: 10
    },
    textTipStyle: {
        fontSize: 17,
        textAlign: 'left',
        margin: 10,
    },
    readTextStyle: {
        color: 'black',
        marginTop: 10,
    },
    noReadTextStyle: {
        marginTop: 10,
        color: 'green',
    }
});