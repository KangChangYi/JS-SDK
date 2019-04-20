/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
import { addStyleForNode, removeStyleForNode, rememberBuryedNode } from './styleForNode';
// 引入全局变量模块
import global from '../globalData/global';
// css
import '../../css/burying.less';
import '../../css/main.less';

// const global.buriedNodeList = [];
const body = document.getElementsByTagName('body')[0];
//  判断是否已经存在  存在：不添加样式  放入text  不存在  添加样式
export default function (node, nodeId) {
    console.log(node, nodeId);
    const clickedElementNode = node;
    const clickedElementNodeId = nodeId;

    // const { nodeId: _nodeId, node: _node } = NODE_DATA;

    // 记录节点状态  has：表示是否是已埋点元素   index：若是已埋点元素则表示在数据结构中的下标
    const status = { has: false, index: -1 };
    // 已埋点事件列表不为空则判断
    if (global.buriedNodeList.length !== 0) {
        for (const [index, { eventId }] of global.buriedNodeList.entries()) {
            if (eventId === clickedElementNodeId) {
                status.has = true;
                status.index = index;
                break;
            }
        }
    }
    if (!status.has) {
        // 为节点添加样式
        addStyleForNode(clickedElementNode);
    }

    // 获取视口宽高
    const VW = document.documentElement.clientWidth;
    const VH = document.documentElement.clientHeight;

    // 获取点击元素相对位置 x y  top left width height
    const clientRect = clickedElementNode.getBoundingClientRect();

    // 创建弹出框最外层div
    const eventPop = document.createElement('div');
    eventPop.classList.add('eventPop-layout');
    eventPop.onclick = (event) => {
        // 阻止冒泡
        event.stopPropagation();
    };
    // 创建遮罩层
    const cover = document.createElement('div');
    cover.classList.add('cover');
    // 点击遮罩层    关闭弹出框、遮罩层
    cover.onclick = (event) => {
        // 阻止冒泡
        event.stopPropagation();
        if (!status.has) {
            // 移除点击节点的样式
            removeStyleForNode(clickedElementNode);
        }
        // 移除弹出框和遮罩层
        body.removeChild(eventPop);
        body.removeChild(cover);
    };
    // 为弹出框增加元素 构成完整弹出框
    addEventPopSonNode(eventPop, cover, clickedElementNodeId, clickedElementNode, status);

    // 保证弹窗不会超出界面
    if (VW - clientRect.left - clientRect.width < 350) {
        eventPop.style.left = `${clientRect.left - 360}px`;
        eventPop.style.top = `${clientRect.top}px`;
    } else {
        eventPop.style.left = `${clientRect.left}px`;
        eventPop.style.top = `${clientRect.top + clientRect.height + 10}px`;
    }
    if (VH - clientRect.top - clientRect.height < 161) {
        eventPop.style.top = `${clientRect.top - clientRect.height - 161}px`;
    }
    // 在页面中添加 弹窗和遮罩层
    body.appendChild(eventPop);
    body.appendChild(cover);
    console.log(clientRect);
}

// 为弹出框增加元素 构成完整弹出框
function addEventPopSonNode(rootNode, cover, clickedElementNodeId, clickedElementNode, status) {
    // 创建标题 div里放文字  node
    const title = document.createElement('div');
    const titleText = document.createTextNode('创建事件');
    title.appendChild(titleText);
    title.classList.add('head-title');
    // 将标题添加进弹窗
    rootNode.appendChild(title);

    // 内容div
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content-layout');
    // 事件名输入框布局div
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('input-layout');
    // 事件名span
    const eventNameSpan = document.createElement('span');
    eventNameSpan.classList.add('event-name-span');
    eventNameSpan.innerHTML = '事件名：';
    // 事件名输入框  并设置属性
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('input');
    input.setAttribute('placeholder', '输入事件名称');
    // 如果点击的是已经创建好的埋点事件，则将埋件事件名称赋值给 value 显示在页面中
    if (status.has) {
        input.value = global.buriedNodeList[status.index].event;
    }
    // // 添加自定义属性 布局div
    // const inputDiv = document.createElement('div');
    // inputDiv.classList.add('input-layout');

    // 将 事件名输入框、事件名span 加进 输入框布局div
    inputDiv.appendChild(eventNameSpan);
    inputDiv.appendChild(input);
    // 将 事件名输入框布局div 添加进 内容div
    contentDiv.appendChild(inputDiv);

    // 创建保存按钮
    const saveButton = document.createElement('div');
    saveButton.classList.add('saveButton');
    const buttonText = document.createTextNode('定义事件');
    saveButton.appendChild(buttonText);
    // 保存按钮 记录节点
    saveButton.onclick = () => {
        // 第一个和第二个 存在埋点 并且 事件名称没有修改
        if (status.has && input.value === global.buriedNodeList[status.index].event) {
            // 第一个 if 这里不需要重新修改事件名称
        } else if (status.has) {
            // 修改了事件名称   （这里写修改事件名称接口）
            global.buriedNodeList[status.index].event = input.value;
            // 为已埋点节点设置自定义data属性     待考虑
            // clickedElementNode.dataset.trackBurying = input.value;
        } else {
            // ↓埋点不存在，（这里写添加埋点事件接口），并且将埋点事件信息添加至全局变量模块
            global.buriedNodeList.push({ eventId: clickedElementNodeId, event: input.value });
            // 待考虑
            // clickedElementNode.dataset.trackBurying = input.value;
            // 保持已埋点元素的样式
            rememberBuryedNode(clickedElementNode);
        }
        // 发送相应关联数据给后台形成配置表
        console.log(global.buriedNodeList);
        // 移除 遮罩层，弹出框
        body.removeChild(rootNode);
        body.removeChild(cover);
    };
    // 将保存按钮 添加至内容div
    contentDiv.appendChild(saveButton);
    // 将内容div 添加进弹窗
    rootNode.appendChild(contentDiv);
}
