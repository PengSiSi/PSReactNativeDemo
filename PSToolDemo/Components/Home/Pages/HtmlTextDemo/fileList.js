/**
 * Created by xzh on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';


export default class FileList extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.fileListData);
        this.state = {
        };
    };

    static defaultProps = {
        fileListData: [],  // 文件列表
        pressFileCallBack: null  // 点击文件的回调
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textTipStyle}>
                    附件列表: 
                </Text>
                <View style = {styles.fileListContainerStyle}>
                    {this.renderFileListView()}
                </View>
            </View>
        );
    }

    renderFileListView() {

        var fileListArr = [];
        for (var i = 0; i < this.props.fileListData.length; i++) {
            var fileList = this.props.fileListData[i];
            fileListArr.push(
                <TouchableOpacity onPress = {this.onPressFileList.bind(this,fileList.fileName)}>
                <Text style={styles.textStyle}>
                        {fileList.fileName}
                </Text>
                </TouchableOpacity>
            )
        }
        return fileListArr;
    }

    onPressFileList(fileName) {
        // alert(fileName);
        if (this.props.pressFileCallBack == null) {
            return;
        }
        this.props.pressFileCallBack(fileName);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'flex-start'
    },
    fileListContainerStyle: {
        marginRight: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10
    },
    textTipStyle: {
        fontSize: 17,
        textAlign: 'center',
        color: 'red'
    },
    textStyle: {
        fontSize: 15,
        textAlign: 'left',
        marginRight: 10,
        color: 'blue',
        textDecorationLine: 'underline'  // 设置文本下划线
    }
});