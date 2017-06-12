/**
 * Created by Watson on 2017/4/21.
 * 这个类是非常规节点渲染工具函数类
 *
 */

/**
 *
 * @param node
 * @param index
 * @returns {XML}
 */

import React from 'react';
import {
    Linking,
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default function renderNode(node, index) {
    /*if (node.nodeName == 'iframe') {
        return (
            <View key={index} style={{width: 200, height: 200}}>
                <Text>{node.attrs.find((n) => n.name =='src').value}</Text>
            </View>
        );
    }
    if (node.nodeName == '#comment') {
        return (
            null
        );
    }*/

    switch (node.nodeName){
        case  'iframe':
            return (
                <View key={index} style={{width: 200, height: 200}}>
                    <Text>{node.attrs.find((n) => n.name =='src').value}</Text>
                </View>
            );
        case '#comment':
            return (
                null
            );
        default :
            return (
                <View key={index}>
                    <Text>unsupported node: {node.nodeName}</Text>
                </View>
            );
    }
}
