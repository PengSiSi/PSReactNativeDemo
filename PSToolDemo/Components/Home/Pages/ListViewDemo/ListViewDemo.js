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
    RefreshControl,
    InteractionManager
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast';
import LoadMoreFooter from './../../../Common/loadMoreFooter';
import Loading from './../../../Common/loading';
import Swipeout from'react-native-swipeout';

export default class extends Component {

    constructor(props) {
        super(props);

        // this.dataSource = [{
        //     id: 0,
        //     title: `this is the first.`,
        // }];
        rows = [{
            name: 'this is the first'
        },
        {
            name: 'this is the first'
        },
        {
            name: 'this is the first'
        }];
        var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true})
        this.state = {
            
            dataSource: ds.cloneWithRows(rows),
            isRefreshing: true,
            noMore: false,
            showLoading: true
        };
        this.renderRow = this.renderRow.bind(this);
        // this.onRefresh = this.onRefresh.bind(this);
        // this.onEndReached = this.onEndReached.bind(this);
        // this.renderFooter = this.renderFooter.bind(this);
    }

    _updateDataSource(data) {
        console.log('data  ===='+data+'---'+ data[0].active);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        })
}

    _handleSwipeout(sectionID, rowID) {
        for (var i = 0; i < rows.length; i++) {
            if (i != rowID) rows[i].active = false
            else rows[i].active = true
        }
        this._updateDataSource(rows)
    }

    // componentDidMount() {
    //     InteractionManager.runAfterInteractions(()=> {
    //         this.loadData();
    //     });
    // }

    // loadData() {
    //     if (this.dataSource.length > 80) {
    //         this.setState({
    //             noMore: true
    //         });
    //         return;
    //  }
    //     for(var i = 0; i < 10; i++) {
    //         this.dataSource.push({
    //             id: i + 1,
    //             title: `this is ${i}`,
    //         });
    //     }
    //     this.setState({
    //             showLoading: false,
    //             dataSource: this.state.dataSource.cloneWithRows(this.dataSource),
    //             isRefreshing: false
    //         });
    // }

    render() {
        return (
            <View style={styles.container}>
               <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    // renderFooter={this.renderFooter}
                    // enableEmptySections
                    // initialListSize={3}
                    // onScroll={this._onScroll}
                    // onEndReached={this.onEndReached}
                    // onEndReachedThreshold={30}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.isRefreshing}
                    //         onRefresh={this.onRefresh}
                    //         colors={['rgb(217, 51, 58)']}
                    //     />
                    // }
                />
                {/**
                     <Loading isShow={this.state.showLoading}/>
                <Toast ref={toast => this.toast = toast}/>
                 * 
                 */}
               
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        var swipeoutBtns = [
            {
                text: '删除',
                backgroundColor: 'red',
                onPress: ()=> {
                    this.swipeOutAction(rowID);
                }
            }
        ]
        return(
             <Swipeout 
                right={swipeoutBtns} 
                rowID={rowID}
                backgroundColor = 'red'
                close={!rowData.active}
                onOpen={(sectionID, rowID) => this._handleSwipeout(sectionID, rowID)}
             >
             <View style={{height: 50, backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center'}}>
             <Text onPress = {()=>{this.onPressCell()}}>{rowData.name}</Text>
            </View>
            </Swipeout>
        );
    }

    swipeOutAction(rowID) {
        alert(rowID);
    }

    onRefresh () {
        this.state.isRefreshing = true;
        {this.loadData()};
    };

    onEndReached() {
        {this.loadData()};
    }

    renderFooter() {
        return(
            <LoadMoreFooter isNoMore={this.state.noMore}/>
        );
    }

    onPressCell() {
        alert('111');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});