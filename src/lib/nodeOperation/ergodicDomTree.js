/* eslint-disable no-script-url */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
export default function () {
    // let clickableNode = [];
    const tag_a = get_a_clickable() || [];
    const tag_button = get_button() || [];
    const tag_input = get_input_clickable() || [];
    const body = document.getElementsByTagName('body')[0];
    const tag_other = [];
    traversal_dom_get_other_clickable(body, tag_other);

    // 唯一标识
    const tag_a_level = createNodeUniqueId(tag_a) || [];
    // console.log(tag_a_level)
    const tag_button_level = createNodeUniqueId(tag_button);
    // console.log(tag_button_level)
    const tag_input_level = createNodeUniqueId(tag_input);
    // console.log(tag_input_level)
    const tag_other_level = createNodeUniqueId(tag_other);
    // console.log(tag_other_level)

    return {
        A: {
            tag_a,
            tag_a_level,
        },
        BUTTON: {
            tag_button,
            tag_button_level,
        },
        INPUT: {
            tag_input,
            tag_input_level,
        },
        OTHER: {
            tag_other,
            tag_other_level,
        },
    };
}
// 给节点创建唯一标识
function createNodeUniqueId(nodeArray) {
    const idArray = [];
    // 在兄弟节点中的位置
    let selfInBrotherPlace = 0;
    // 遍历数组下标
    for (const node of nodeArray) {
        // 获取下标节点的父节点的子节点数组
        const currentNode = node;
        let brotherNodeList = [];
        brotherNodeList = currentNode.parentNode.children;
        selfInBrotherPlace = 0;
        // 遍历子节点
        for (const brother of brotherNodeList) {
            selfInBrotherPlace++;
            if (currentNode === brother) {
                //  ',text:' + currentNode.text +
                idArray.push(`level:${get_level(currentNode)},place:${selfInBrotherPlace
                },className:${currentNode.className},fatherClassName:${currentNode.parentNode.className}`);
                break;
            }
        }
    }
    // 生成其他可点击元素唯一标识
    return idArray;
}

// 元素层级
function get_level(node) {
    let _node = node;
    let nodeLevel = '';
    while (_node.tagName !== 'HTML') {
        nodeLevel += `${_node.tagName}-`;
        _node = _node.parentNode;
    }
    return nodeLevel;
}

// 遍历dom树  拿到其他可点击元素节点
function traversal_dom_get_other_clickable(node, tag_other) {
    if (node && node.nodeType === 1) {
        if (typeof node.onclick === 'function') {
            // 筛选节点
            const unAllow = {
                BODY: false,
                BUTTON: false,
                A: false,
                INPUT: false,
            };
            if (unAllow[node.tagName] === undefined) {
                tag_other.push(node);
            }
        }
    }
    let i = 0; const { childNodes } = node; let item;
    for (; i < childNodes.length; i++) {
        item = childNodes[i];
        if (item.nodeType === 1) {
            // 递归先序遍历子节点
            traversal_dom_get_other_clickable(item, tag_other);
        }
    }
}

// 可点击的a节点
function get_a_clickable() {
    const _A = document.getElementsByTagName('a');
    if (_A.length === 0) {
        return false;
    }
    const aTagClickable = [];
    for (const i of _A) {
        // if (i.href.includes("html") || i.href.includes("http")) {
        // 开发环境用条件
        if (i.href !== '' && i.href !== 'javascript:;' && !i.href.includes('javascript:void(0)')) {
            aTagClickable.push(i);
        }
    }
    return aTagClickable;
}

// 按钮节点
function get_button() {
    const _BUTTON = Array.prototype.slice.call(document.getElementsByTagName('button'));
    if (_BUTTON.length === 0) {
        return false;
    }
    return _BUTTON;
}

// 可点击的input节点
function get_input_clickable() {
    const _INPUT = document.getElementsByTagName('input');
    if (_INPUT.length === 0) {
        return false;
    }
    const intputTagClickable = [];
    const allowInput = {
        button: true,
        reset: true,
        submit: true,
    };
    for (const i of _INPUT) {
        if (allowInput[i.type]) {
            intputTagClickable.push(i);
        }
    }
    return intputTagClickable;
}
