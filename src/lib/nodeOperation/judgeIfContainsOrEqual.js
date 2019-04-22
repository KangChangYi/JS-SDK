/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
// judge If Contains OR Equal
export default function (_nodeData, _event) {
    // 遍历所有可点击的其他元素,判断点击的其他元素是否存在onclick事件
    // 或 被onclick事件元素包含  或者是可点击元素本身
    console.log(_event.target.tagName);
    switch (_event.target.tagName) {
    case 'A':
        return ergodicA(_nodeData, _event);
    case 'INPUT':
        return ergodicInput(_nodeData, _event);
    case 'BUTTON':
        return ergodicButton(_nodeData, _event);
    default:
        return ergodicOther(_nodeData, _event);
    }
}
// 判断other类元素是否有效
function ergodicOther(_nodeData, _event) {
    if (_nodeData.A.tag_a.length !== 0) {
        for (const [index, node] of _nodeData.A.tag_a.entries()) {
            // 判断是否被有效点击元素a包裹
            if (node.contains(_event.target)) {
                return {
                    result: 'yes',
                    nodeId: _nodeData.A.tag_a_level[index],
                    node,
                };
            }
        }
    }
    if (_nodeData.OTHER.tag_other !== 0) {
        for (const [index, node] of _nodeData.OTHER.tag_other.entries()) {
            // 判断是否被有效点击元素other包裹
            if (node.contains(_event.target)) {
                return {
                    result: 'yes',
                    nodeId: _nodeData.OTHER.tag_other_level[index],
                    node,
                };
            }
        }
    }
    // 无效返回no
    return {
        result: 'no',
    };
}

// 判断点击的a是否有效
function ergodicA(_nodeData, _event) {
    if (_nodeData.A.tag_a.length !== 0) {
        for (const [index, node] of _nodeData.A.tag_a.entries()) {
            // 判断是否有效  有效返回yes
            if (node === _event.target) {
                return {
                    result: 'yes',
                    nodeId: _nodeData.A.tag_a_level[index],
                    node,
                };
            }
        }
    }
    // 无效返回no
    return {
        result: 'no',
    };
}
// 判断点击的button是否有效
function ergodicButton(_nodeData, _event) {
    if (_nodeData.BUTTON.tag_button.length !== 0) {
        for (const [index, node] of _nodeData.BUTTON.tag_button.entries()) {
            // 判断是否有效  有效返回yes
            if (node === _event.target) {
                return {
                    result: 'yes',
                    nodeId: _nodeData.BUTTON.tag_button_level[index],
                    node,
                };
            }
        }
    }
    // 无效返回no
    return {
        result: 'no',
    };
}
// 遍历input= submit  reset  判断是否有效
function ergodicInput(_nodeData, _event) {
    if (_nodeData.INPUT.tag_input.length !== 0) {
        for (const [index, node] of _nodeData.INPUT.tag_input.entries()) {
            // 判断是否有效  有效返回yes
            if (node === _event.target) {
                return {
                    result: 'yes',
                    nodeId: _nodeData.INPUT.tag_input_level[index],
                    node,
                };
            }
        }
    }
    // 无效返回no
    return {
        result: 'no',
    };
}
