/**
 * Created by xzh on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    PixelRatio,
    TouchableOpacity
} from 'react-native';

import MovieJson from './Movie.json';
import Util from './../../../Util/utils';
import Movie from './../SqilteDemo/DB/Movie';
import sqlite from './DB/SQLite';

export default class extends Component {

   static defaultProps = {

    };

    // 构造
    constructor(props) {
    super(props);
    console.log(this.props);
    // 1. 数据源
    var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    // 初始状态
    this.state = {
        dataSource:ds.cloneWithRows(MovieJson),
    };
}

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
        );
    }

    // 具体的每行
    renderRow(rowData) {
        return(
            <TouchableOpacity style={styles.cellStyle} onPress={()=>{alert('点击了cell')}}>
                <View style={styles.containerViewStyle}>
                {/*左边的图片*/}
                  <Image source = {require('./../../../Images/head.png')} style = {styles.avaterImgStyle}>
                  </Image>
                    {/*中间的view*/}
                  <View style={styles.leftViewStyle}>
                        <Text style={{color:'black', fontSize:17}} numberOfLines = {1}>{rowData.title}</Text>
                        <Text style={{color:'#333', fontSize:14,marginTop: 10}}>{rowData.author}</Text>
                  </View>
                    {/*右边的时间view*/}
                  <View style= {styles.rightViewStyle}>
                    <Text style={styles.rightitemStyle}>{rowData.time}</Text>
                    <Text style={styles.rightitemStyle} onPress = {this.didClickCollectAction.bind(this,rowData)}>收藏</Text>
                  </View>
                </View>
            </TouchableOpacity>
        )
    }

    // 收藏
    didClickCollectAction(movie) {
        console.log(movie);
        var coll = new Movie();
        coll.setTitle(movie.title);
        coll.setAuthor(movie.author);
        coll.setTime(movie.time);
        // sqlite.saveCollection(coll).then(()=>{
        //     this.setState({
        //         isCollection:isCollection,
        //     });
        //     console.log('保存成功');
        // }).catch((e)=>{}).done();
    }
}

const styles = StyleSheet.create({

    // cell
    cellStyle: {
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#666',
        flexDirection:'row',
        padding:10
    },

    containerViewStyle: {
        flexDirection:'row'
    },

    avaterImgStyle: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    // 左边view
    leftViewStyle: {
        justifyContent:'space-between',
        width: Util.size.width * 0.35,
        flexDirection:'column',
        marginLeft: 10
    },
     // 右边view
    rightViewStyle: {
        justifyContent:'space-between',
        flexDirection:'column',
        marginLeft: 20
    },

    // 时间
    rightitemStyle: {
        marginLeft: 10,
        fontSize: 15,
        alignSelf: 'center',
        color: 'green',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'green'
    }
});