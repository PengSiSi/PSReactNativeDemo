/**
 * Created by xzh on 17/5/7.
 */
'use strict';
import React, {Component} from "react";
import {Dimensions,PixelRatio,ActivityIndicator, 
        Animated, FlatList, ScrollView,
        StyleSheet, Text, View,
        TouchableOpacity
    } from "react-native";
import Loading from './../../../Common/loading';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class FileList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            pageSize: 10,  // 页数
            pageNum: 1,
            refreshing: false,
            noMoreData: false
        };
    };

    static defaultProps = {

    };

    componentDidMount() {
        //请求数据
        this.loadData();
    }

     // 数据请求
    loadData() {
        var URL = 'http://192.168.130.95:8083/notice-work-portlet/NoticeWork/news/'+this.state.pageSize+'/1/0/null/null/null/null/GWAP/getNewsList.json';
        var header = {
                        name: 'admin',
                        handshakePassword: 'PtQOrXNSvE9rgI*rLf7l2nWe30xzzhX98ZdYHQEstus='
                      }
        console.log(URL);
        fetch(URL ,{
                method: 'POST',
                headers: header,
                body: null
            }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }}
        ).then((json) => {
            console.log(json)
            let noMoreFlag = json.list.length < this.state.pageNum * this.state.pageSize ? true: false;
            if (json.code === '000') {
                this.setState({
                dataArray: json.list,
                showLoading: false,
                isLoading: false,
                refreshing: false,
                noMoreData: noMoreFlag
            });
            }
        }, error => {
            this.setState({
                showLoading: false,noMoreData: true
            });       
            this.showToast('请检查您的网络状态');
        });
    }
    //加载等待的view
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    style={[styles.gray, {height: 80}]}
                    color='gray'
                    size="large"
                />
            </View>
        );
    }

     //加载失败view
    renderErrorView(error) {
        return (
            <View style={styles.container}>
                <Text>
                    Fail: {error}
                </Text>
            </View>
        );
    }

     //返回itemView
    renderItemView({item}) {
        return(
            <TouchableOpacity style={styles.cellStyle} onPress={()=>this.pushToHomeDetail((rowData.id))}>
                <View style={styles.containerViewStyle}>
                    {/*左边的view*/}
                    <View style={styles.leftViewStyle}>
                        <Text style={{color:'black', fontSize:17}} numberOfLines = {1}>{item.title}</Text>
                        <Text style={{color:'gray', fontSize:14,marginTop: 10}}>{item.publishTime}</Text>
                    </View>
                    {/*右边的view*/}
                    <View style = {{height:20,alignItems:'flex-end',padding:4,
                                    width: Dimensions.get('window').width * 0.3,
                                    marginRight: 20
                                    }}>
                        <Text style={styles.rightItemStyle}>教务处
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderFooter(){

        if (this.state.noMoreData){
            return (
                <View style={styles.loadMoreStyle}>
                    <Text style={styles.loadMoreTextStyle}>没有更多数据了</Text>
                </View>
            )
        } else {
            return(
            <View style={{height: 100}}>
            <ActivityIndicator
                style={styles.loadMoreStyle}
            />
            </View>
        )
        }
    }

    renderData() {
        return (
            <View style={styles.container}>
                <Loading isShow={this.state.isLoading}/>
                <AnimatedFlatList
                    data={this.state.dataArray}
                    renderItem={this.renderItemView.bind(this)}
                    onEndReached={this.loadMoreData.bind(this)}
                    onRefresh={this.onPullRelease.bind(this)}
                    refreshing={this.state.refreshing}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReachedThreshold={20}
                />
            </View>
        );
    }

    loadMoreData() {
        this.setState({
            pageSize: this.state.pageSize += 10,
            pageNum: 1
        });
       this.loadData()
    }

    onPullRelease() {
        this.setState({
            pageSize: 10,
            pageNum: 1
        });
       this.loadData()
    }

    render() {
        // //第一次加载等待的view
        // if (this.state.isLoading && !this.state.error) {
        //     return this.renderLoadingView();
        // } else if (this.state.error) {
        //     //请求失败view
        //     return this.renderErrorView(this.state.errorInfo);
        // }
        //加载数据
        return this.renderData();
    }
}

const styles = StyleSheet.create({
     container: {
        flex: 1,
    },
    // cell
    cellStyle: {
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: 'gray',
        flexDirection:'row',
        padding:10,
    },
    containerViewStyle: {
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    // 左边view
    leftViewStyle: {
        justifyContent:'space-between',
        width: Dimensions.get('window').width * 0.7,
    },
    // 教务处
    rightItemStyle: {
        fontSize: 15,
        color: 'green',
        borderRadius: 4,borderWidth: 0.5,
        borderColor: '#ccc',
        marginRight: 20
    },
    loadDataStyle: {
        marginVertical:20
    },
    loadMoreStyle:{
        marginVertical:20,
        justifyContent: 'center'
    },
    loadMoreTextStyle: {
        textAlign: 'center'
    }
});