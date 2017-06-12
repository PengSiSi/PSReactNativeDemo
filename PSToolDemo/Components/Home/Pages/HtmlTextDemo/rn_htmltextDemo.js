/**
 * Created by xzh on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
   ScrollView
} from 'react-native';

import HtmlText from './../../../Util/HtmlTextUtil/HtmlText';
import TopView from './homeDeatilTopView';
import FileListView from './fileList';
import NoReadListView from './noReadList';
import Loading from './../../../Common/loading';

var fileListArr =[{fileName: "附件列表1"},
                    {fileName: "附件列表2"},
                    {fileName: "附件列表3"},
                    {fileName: "附件列表4"}];
var readList = '思思,思思,思思,思思,思思,思思,思思';
var noReadList = '12u84thhugihg5ggthththt';

export default class  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            html: '<img src="http://pic78.huitu.com/res/20160604/1029007_20160604114552332126_1.jpg" width="100" height="100"/><p style="font-size: 30px;">Hello world<b>world</b> <i>foo</i> bar hahh</p><br/><hr/><a href="http://jsdf.co">点击跳转</a><br/><ol><li>aaa</li><li>bbb</li><li>ccc</li></ol><img src="https://i.redd.it/1101wjsv22my.jpg" width="100" height="100"/><p>Hello world<b>world</b> <i>foo</i> bar hahh</p><br/><hr/><a href="http://jsdf.co">点击跳转</a><br/><ol><li>aaa</li><li>bbb</li><li>ccc</li></ol><img src="https://i.redd.it/1101wjsv22my.jpg" width="100" height="100"/><p>Hello world<b>world</b> <i>foo</i> bar hahh</p><br/><hr/><a href="http://jsdf.co">点击跳转</a><br/><ol><li>aaa</li><li>bbb</li><li>ccc</li></ol>'
        };
    }

    render() {
        return (
            <View style = {styles.container}>
            <ScrollView>
                <TopView title = '我是标题' author = '作者:思思' time = '时间:2017-03-45'></TopView>
                <HtmlText html={this.state.html} style = {styles.htmlStyle}>
                </HtmlText>
                <FileListView fileListData = {fileListArr} 
                              pressFileCallBack = {(fileName)=>{this.pressFileDownLoad(fileName)}}>
                </FileListView>
                <NoReadListView readList = {readList} noReadList = {noReadList} ></NoReadListView>
            </ScrollView>
            <Loading isShow={true}/>
            </View>
        );
    }

    pressFileDownLoad(fileName) {
        alert(fileName);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    htmlStyle: {
        marginTop: 10
    }
});