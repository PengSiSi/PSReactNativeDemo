/**
 * Created by pengsi on 17/5/7.
 * 首页详情页面
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

export default class extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    source={{uri: 'https://www.baidu.com'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});