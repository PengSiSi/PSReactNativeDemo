/**
 * 参考博客: http://blog.csdn.net/it_talk/article/details/53020068
 */

import React from 'react';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var database_name = "sisi.db";
var database_version = "1.0";
var database_displayname = "MySQLite";
var database_size = -1;
var db;
const Collection_TABLE_NAME = "Collection";//收藏表

const SQLite = React.createClass({

    render(){
        return null;
    },
    componentWillUnmount(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
    },
    open(){
        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            ()=>{
                this._successCB('open');
            },
            (err)=>{
                this._errorCB('open',err);
            });
    },
    createTable(){
        if (!db) {
            open();
        }
        //创建收藏表
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + Collection_TABLE_NAME + '(' +
                'id INTEGER PRIMARY KEY NOT NULL,' +
                'title VARCHAR,' +
                'author VARCHAR,' +
                'time VARCHAR,' +
                ');'
                , [], ()=> {
                    this._successCB('executeSql');
                }, (err)=> {
                    this._errorCB('executeSql', err);
                });
        }, (err)=> {
            this._errorCB('transaction', err);
        }, ()=> {
            this._successCB('transaction');
        })
    },
    close(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
        db = null;
    },
    _successCB(name){
        console.log("SQLiteStorage "+name+" success");
    },
    _errorCB(name, err){
        console.log("SQLiteStorage "+name+" error:"+err);
    },

    // 新增
    saveCollection(movie){//保存收藏记录
    return new Promise((resolve, reject)=>{
        if(db){
            db.executeSql(
                'INSERT INTO '+Collection_TABLE_NAME+' (title,author,time) VALUES(?,?,?)',
                [movie.getTitle(),movie.getAuthor(),movie.getTime()],
                ()=>{
                    this._successCB('saveCollection');
                    resolve();
                },
                (err)=>{
                    this._errorCB('saveCollection',err);
                    reject();
                })
        }else {
            reject('db not open');
        }
    });
},

    // 查找
    findCollectionByName(name){//通过影片名称获取对应收藏记录
    return new Promise((resolve, reject)=>{
        if(db){
            db.executeSql('SELECT * FROM '+Collection_TABLE_NAME +' WHERE title=? LIMIT 1',[title],
                (results)=>{
                    console.log(results);
                    if(results.rows.length > 0){
                        resolve(results.rows.item(0));
                    }else {
                        reject('not find item');
                    }

                    this._successCB('findCollectionByName')
                },(err)=>{
                    reject(err);
                    this._errorCB('findCollectionByName',err)
                });
        }else {
            reject('db not open');
        }
    });
},

    // 删除
    deleteCollectionByName(title){//通过影片名称删除对应收藏记录
    return new Promise((resolve, reject)=>{
        if(db){
            db.executeSql('DELETE FROM '+Collection_TABLE_NAME +' WHERE title=?',[title],
                ()=>{
                    resolve();
                    this._successCB('deleteCollectionByName');
                },(err)=>{
                    reject(err);
                    this._errorCB('deleteCollectionByName',err);
                });
        }else {
            reject('db not open');
        }
    });
},

    // 查找
    listCollection(pageSize,index){//获取收藏记录列表
    return new Promise((resolve, reject)=>{
        if(db){
            db.executeSql('SELECT * FROM '+Collection_TABLE_NAME +' LIMIT '+pageSize+' OFFSET '+((index-1)*pageSize),[],
                (results)=>{
                    var len = results.rows.length;
                    var datas = [];
                    for(let i=0;i<len;i++){
                        datas.push(results.rows.item(i));
                    }
                    resolve(datas);
                    this._successCB('listCollection');
                },(err)=>{
                    reject(err);
                    this._errorCB('listCollection',err);
                });
        }else {
            reject('db not open');
        }
    });
}
});

module.exports = SQLite;