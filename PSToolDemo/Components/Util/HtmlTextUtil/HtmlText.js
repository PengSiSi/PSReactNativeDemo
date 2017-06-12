const parse5 = require('parse5');
import React, {Component, PropTypes} from 'react';
import {AppRegistry, StyleSheet, View, Text, Linking,} from 'react-native';
import unNode from './HtmlRenDerUnconventionalNode';
import AutoSizedImage from './AutoSizedImage';

const BLOCK_ELEMENTS = ["blockquote", "div", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "ol", "p", "pre", "ul", "li"]
const INLINE_ELEMENTS = ["b", "i", "em", "strong", "a", "br", "q", "span", "sub", "sup", "img"]

const LINE_BREAK = '\n';
const PARAGRAPH_BREAK = '\n\n';
const BULLET = '\u2022 ';

const boldStyle = {fontWeight: '500'};
const italicStyle = {fontStyle: 'italic'};
const codeStyle = {fontFamily: 'Menlo'};

var addLineBreaks;
var linkHandler;
var customRenderer;

var DEFAULT_STYLES = StyleSheet.create({
    h1: {fontWeight: '500', fontSize: 36},
    h2: {fontWeight: '500', fontSize: 30},
    h3: {fontWeight: '500', fontSize: 24},
    h4: {fontWeight: '500', fontSize: 18},
    h5: {fontWeight: '500', fontSize: 14},
    h6: {fontWeight: '500', fontSize: 12},
    strong: boldStyle,
    i: italicStyle,
    em: italicStyle,
    pre: codeStyle,
    code: codeStyle,
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
    b: {
        fontWeight: 'bold'
    },
    blockquote: {
        paddingLeft: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#cccccc',
        marginBottom: 12
    },
    br: {},
    div: {},
    em: {
        fontStyle: 'italic'
    },
    i: {
        fontStyle: 'italic'
    },
    p: {
        marginBottom: 8,
    },
    q: {},
    span: {},
    sub: {},
    sup: {},
    ol: {
        marginLeft: 24,
    },
    ul: {
        marginLeft: 24,
    },
    default: {}
});


const Img = props => {

    const width = Number(props.attribs.find((n) => n.name == 'width').value) || Number(props.attribs.find((n) => n.name == 'data-width').value) || 0;
    const height = Number(props.attribs.find((n) => n.name == 'height').value) || Number(props.attribs.find((n) => n.name == 'data-height').value) || 0;

    const imgStyle = {
        width,
        height,
    };
    const source = {
        uri: props.attribs.find((n) => n.name == 'src').value,
        width,
        height,
    };
    return (
        <AutoSizedImage source={source} style={imgStyle}/>
    );
};

function isText(tagName): Boolean {
    return tagName === "#text"
}

function isBlockElement(tagName): Boolean {
    return BLOCK_ELEMENTS.indexOf(tagName) != -1
}

function isInlineElement(tagName): Boolean {
    return INLINE_ELEMENTS.indexOf(tagName) != -1
}

function styleForTag(tagName) {
    var style = DEFAULT_STYLES[tagName] ? DEFAULT_STYLES[tagName] : DEFAULT_STYLES["default"]
    return style
}
/**
 * 将参数定义样式与默认样式组合
 * @param stylesheet
 */
function initConfigs(stylesheet, addLineBreaks, onLinkPress, renderNode) {
    DEFAULT_STYLES = Object.assign({}, DEFAULT_STYLES, stylesheet);
    addLineBreaks = addLineBreaks;
    linkHandler = onLinkPress;
    customRenderer = renderNode;
}


function processNode(node, parentKey, indexLLi) {
    //默认换行元素 start  还未确认生效
    let linebreakBefore = null;
    let linebreakAfter = null;
    if (addLineBreaks) {
        switch (node.name) {
            case 'pre':
                linebreakBefore = LINE_BREAK;
                break;
            case 'p':
                if (index < list.length - 1) {
                    linebreakAfter = PARAGRAPH_BREAK;
                }
                break;
            case 'br':
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
                linebreakAfter = LINE_BREAK;
                break;
        }
    }
    //默认换行元素 end

    let nodeName = node.nodeName

    if (isText(nodeName)) {
        let listItemPrefix = null;

        //过滤ul ol中多余的换行 start
        if (node.parentNode.nodeName == 'ul' || node.parentNode.nodeName == 'ol') {
            if (node.value.indexOf("\n") ==0) {
                if(node.value.indexOf("\n\n")!=-1){
                    node.value=node.value.replace("\n\n","");
                }else {
                    return null;
                }
            }
        }
        //过滤ul ol中多余的换行 end

        //检测父元素是否是LI，是：添加。前缀 start
        if (node.parentNode.nodeName == 'li') { //检测父元素是否是LI，是：添加。前缀
            if (node.parentNode.parentNode.nodeName == 'ul') {
                listItemPrefix = BULLET;
            } else if (node.parentNode.parentNode.nodeName == 'ol') {
                listItemPrefix = indexLLi + " ";
            }
        }
        //检测父元素是否是LI，是：添加。前缀 end

        let key = `${parentKey}_text`
        return (<Text key={key}>{listItemPrefix}{node.value}</Text>)
    }

    if (isInlineElement(nodeName)) {
        let key = `${parentKey}_${nodeName}`
        let children = []

        //IMG标签 start
        if (nodeName == 'img') {
            return (
                <Img key={key} attribs={node.attrs}/>
            );
        }
        //IMG标签 end

        node.childNodes.forEach((child, index) => {
            if (isInlineElement(child.nodeName) || isText(child.nodeName)) {
                children.push(processNode(child, `${key}_${index}`))
            } else {
                console.error(`Inline element ${nodeName} can only have inline children, ${child} is invalid!`)
            }
        })

        //A标签 start
        let linkPressHandler = null;
        if (nodeName == 'a' && node.attrs && node.attrs.find((n) => n.name == 'href')) {
            linkPressHandler = () => linkHandler(node.attrs.find((n) => n.name == 'href').value);
            return (<Text key={key} style={styleForTag(nodeName)} onPress={linkPressHandler}>{children}</Text>)
        }
        //A标签 end

        return (<Text key={key} style={styleForTag(nodeName)}>{children}{linebreakAfter}</Text>)
    }

    if (isBlockElement(nodeName)) {
        let key = `${parentKey}_${nodeName}`
        let children = []
        let lastInlineNodes = []

        let indexLi = 0;
        node.childNodes.forEach((childNode, index) => {

            //li传值代码块 start
            if (childNode.nodeName == 'li') { //逆归传值到li
                indexLi = indexLi + 1;
            }
            if (childNode.parentNode.nodeName == 'li') { //逆归到li时取之前传入的值
                indexLi = indexLLi;
            }
            //li传值代码块 end

            var child = processNode(childNode, `${key}_${index}`, indexLi)

            if (isInlineElement(childNode.nodeName) || isText(childNode.nodeName)) {
                lastInlineNodes.push(child)

            } else if (isBlockElement(childNode.nodeName)) {
                if (lastInlineNodes.length > 0) {
                    if (childNode.nodeName!="li" || lastInlineNodes[0] != null) {
                        //console.log(lastInlineNodes[0]);
                        children.push(<Text key={`${key}_${index}_inline`}>{lastInlineNodes}</Text>)
                    }
                    lastInlineNodes = []
                }
                children.push(child);
            }
        })

        if (lastInlineNodes.length > 0) {
            children.push((<Text key={`${key}_last_inline`}> {linebreakBefore}{lastInlineNodes}{linebreakAfter}</Text>))
        }
        return (
            <View key={key} style={styleForTag(nodeName)}>
                {children}
            </View>
        )
    }


    //调用者传入非常规元素处理函数
    if (customRenderer) {
        const rendered = customRenderer(node, parentKey);
        if (rendered || rendered === null) {
            return rendered;
        }
    }
    //默认非常规元素处理函数
    const rendered = unNode(node, parentKey);
    if (rendered || rendered === null) {
        return rendered;
    }

    console.warn(`unsupported node: ${nodeName}`)
    return null;
}

class HtmlText extends React.Component {
    parse(html) {
        let parser = new parse5.Parser()
        let fragment = parser.parseFragment(html)
        return fragment
    }

    componentDidMount() {
        this.mounted = true;
        initConfigs(this.props.stylesheet, this.props.addLineBreaks, this.props.onLinkPress, this.props.renderNode);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            /* this.startHtmlRender(nextProps.value);*/
            initConfigs(this.props.stylesheet, this.props.addLineBreaks, this.props.onLinkPress, this.props.renderNode);
        }
    }


    render() {
        let html = this.props.html;
        initConfigs(this.props.stylesheet, this.props.addLineBreaks, this.props.onLinkPress, this.props.renderNode);
        let fragment = this.parse(html);
        let rootKey = "ht_"

        let children = []
        fragment.childNodes.forEach((node, index) => {
            children.push(processNode(node, `${rootKey}_${index}`))
        })

        // console.log(children)
        return (
            <View style={this.props.style}>
                {children}
            </View>
        )
    }
}


HtmlText.propTypes = {
    html: PropTypes.string,
    renderNode: PropTypes.func,
    stylesheet: PropTypes.object,

    addLineBreaks: PropTypes.bool,
    onLinkPress: PropTypes.func,
    onError: PropTypes.func,

    style: View.propTypes.style,

};
HtmlText.defaultProps = {
    addLineBreaks: true,
    onLinkPress: url => Linking.openURL(url),
    onError: console.error.bind(console),
};


module.exports = HtmlText