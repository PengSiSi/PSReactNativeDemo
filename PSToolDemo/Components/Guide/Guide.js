/**
 * http://www.jianshu.com/p/81e414f81291
 */

'use strict';

import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableHighlight
} from 'react-native';

const Util = {
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
};

export default class extends Component {
  constructor() {
      super();

    };

  static defaultProps = {
        imagesArr: [],
        callBack: null
    }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{width: Util.size.width * this.props.imagesArr.length,
      height: Util.size.height}}
        bounces={false}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {this.renderImages()}
      </ScrollView>
    );
  }

  renderImages() {
      var imageViewsArr = [];
      for (var i in this.props.imagesArr) {
          var element = this.props.imagesArr[i];
          console.log('element'+element);
              imageViewsArr.push(
               this.handleImage(i)
            )
      }
      return imageViewsArr;
  }

  handleImage(i) {
      return(
        <TouchableHighlight key = {i} onPress={()=>{this.onPressImage(i)}} style={styles.backgroundImage}>
          <Image source={this.props.imagesArr[i]} style={styles.backgroundImage} />
      </TouchableHighlight>
      )
  }

  onPressImage(i) {
    if (i == this.props.imagesArr.length - 1) {
       if (this.props.callBack == null) {
      return;
    }
    this.props.callBack();
    }
  }
};

var styles = StyleSheet.create({
  // 这里是拿不到图片的个数的,需要使用内联样式即可
    // contentContainer: {
    //   width: Util.size.width,
    //   height: Util.size.height,
    // },
    backgroundImage: {
      width: Util.size.width,
      height: Util.size.height,
    },
});