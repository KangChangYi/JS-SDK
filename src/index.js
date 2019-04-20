/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
// 加入iframe
import iframeAdd from './lib/iframeAdd';
// 遍历dom可点击节点
import ergodicDomTree from './lib/ergodicDomTree';
// postMessage事件监听
import eventListener from './lib/eventListener';

// 获取访问者浏览器版本信息
import getBrowserInfo from './lib/getVisitorInfo/browsersInfo';

// 引入jq  待定
// var $ = require("jquery");

// 初始化函数  param:{ project_name  appKey singlePage }
export const init = (function (param = {}) {
    console.log(param);
    iframeAdd();
    // 所有可点击元素以及唯一标识
    const NODE_DATA = ergodicDomTree();
    console.log(NODE_DATA);
    // 监听message信息以及判断元素是否可点击
    eventListener(NODE_DATA);

    normalVisit();
}(window.fear.param));

function normalVisit() {
    const BROWSER_INFO = getBrowserInfo();
    console.log(BROWSER_INFO);
}
