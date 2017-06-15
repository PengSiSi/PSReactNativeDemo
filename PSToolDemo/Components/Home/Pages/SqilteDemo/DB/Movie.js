import React from 'react';
var id;
var title = "";
var author = "";
var time = "";

const Movie = React.createClass({
    render(){
        return null;
    }
    ,
    setId(id){
        this.id = id;
    },
    getId(){
        return this.id;
    },
    setTitle(title){
        this.title = title;
    },
    getTitle(){
        return this.title;
    },
    setAuthor(author){
        this.author = author;
    },
    getAuthor(){
        return this.author;
    },
    setTime(time){
        this.time = time;
    },
    getTime(){
        return this.time;
    }
});
module.exports = Movie;