/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
// 加入iframe
import iframeAdd from './lib/iframe/iframeAdd';
// 遍历dom可点击节点
import ergodicDomTree from './lib/nodeOperation/ergodicDomTree';
// postMessage事件监听
import iframeEventListener from './lib/iframe/iframeEventListener';
// 获取访问者浏览器版本信息
import getVisitorInfo from './lib/visitor/getVisitorInfo';
// 引入全局变量模块
import global from './lib/globalData/globalData';
// 封装的ajax请求
import ajax from './utils/request';
// 引入mock
require('./mock/index.js');

// 引入jq  待定
// var $ = require("jquery");

// 初始化函数  param:{ projectId  projectName singlePage }
export const init = (function (param = {}) {
    iframeAdd();
    // 设定全局变量
    global = {
        ...param,
    };
    console.log(global);
    // 所有可点击元素以及唯一标识
    const clickableNode = ergodicDomTree();
    console.log(clickableNode);
    // 监听message信息以及判断元素是否可点击
    iframeEventListener(clickableNode);
    if (true) {
        normalVisit();
    }
}(window.fear.param));

function normalVisit() {
    const visitorInfo = getVisitorInfo();
    console.log(visitorInfo);
    // 发送用户信息接口
    ajax({
        url: 'http://localhost:8001/user/info',
        methods: 'POST',
        async: true,
        data: {
            projectName: global.projectName,
            projectId: global.projectId,
            data: 'visitorInfo',
        },
        success(res) {
            console.log(res);
        },
    });
}
