/* eslint-disable no-use-before-define */
// 判断页面点击的元素是否被包含与可点击元素
import judgeIfContainsOrEqual from './judgeIfContainsOrEqual';
// 弹框 以及 被点击元素的样式添加
import showDialog from './styleOperation/showDialog';

/* eslint-disable default-case */
export default function (nodeData) {
    // 可点击元素的节点和唯一标识
    const NODE_DATA = Object.assign({}, nodeData);

    // 存放在服务器中的 可视化埋点界面
    const serverUrl = 'http://localhost:8080';

    // 监听
    window.addEventListener('message', receiveMessage, false);

    function receiveMessage(event) {
        // 安全问题  只接受来自可视化埋点服务器的通信
        if (event.origin !== serverUrl) {
            return;
        }
        switch (event.data.name) {
        case 'isAutoHide':
            iframeAutoHide(event.data);
            break;
        case 'isCreatingEvent':
            switcingCreateEventMode(event.data, NODE_DATA);
            break;
        }
    }

    // 假设你已经验证了所受到信息的origin (任何时候你都应该这样做), 一个很方便的方式就是把enent.source
    // 作为回信的对象，并且把event.origin作为targetOrigin
}
// iframe自动隐藏
function iframeAutoHide(postData) {
    const iframe = document.getElementById('iframe');
    if (postData.isAutoHide) {
        iframe.onmouseleave = () => {
            iframe.style.top = '-52px';
        };
        iframe.onmouseenter = () => {
            iframe.style.top = '0';
        };
    } else {
        iframe.onmouseleave = () => { };
        iframe.onmouseenter = () => { };
        iframe.style.top = '0';
    }
    console.log(postData.isAutoHide);
}
// 创建事件模式
function switcingCreateEventMode(postData, _NODE_DATA) {
    console.log(postData.isCreatingEvent);
    if (postData.isCreatingEvent) {
        openMode(_NODE_DATA);
        // openBodyOnclick(_NODE_DATA);
    } else {
        closeMode(_NODE_DATA);
        // closeBodyOnclick();
    }
}
// 保存原先的点击事件
const buttonHistoryClickEvent = [];
const otherHistoryClickEvent = [];

const body = document.getElementsByTagName('body')[0];
// 元素默认行为
function preventDefault(event) {
    event.preventDefault();
}

// 开启事件模式
function openMode(_NODE_DATA) {
    body.addEventListener('click', preventDefault);
    openBodyOnclick(_NODE_DATA);
    // 先将事件保存  然后赋值null   button
    _NODE_DATA.BUTTON.tag_button.forEach((item, key) => {
        buttonHistoryClickEvent[key] = item.onclick;
        item.onclick = null;
    });
    // other
    _NODE_DATA.OTHER.tag_other.forEach((item, key) => {
        otherHistoryClickEvent[key] = item.onclick;
        item.onclick = null;
    });
}

// 关闭事件模式
function closeMode(_NODE_DATA) {
    body.removeEventListener('click', preventDefault);
    closeBodyOnclick();
    // 将click事件还给button
    _NODE_DATA.BUTTON.tag_button.forEach((item, key) => {
        item.onclick = buttonHistoryClickEvent[key];
    });
    // other
    _NODE_DATA.OTHER.tag_other.forEach((item, key) => {
        item.onclick = otherHistoryClickEvent[key];
    });
}

// 给body添加点击事件,使页面所有点击事件冒泡至该事件
// 当点击的元素可埋点  给它添加事件并弹窗  弹窗
function openBodyOnclick(_NODE_DATA) {
    body.onclick = (event) => {
        // 判断点击的元素是否 （是可点击元素）或（有效的被可点击元素包含）
        // 对象属性：result, nodeId, node
        const isContains = judgeIfContainsOrEqual(_NODE_DATA, event);
        // 包含 ? 弹窗 ：不弹
        if (isContains.result === 'yes') {
            // 弹框
            const { node, nodeId } = isContains;
            showDialog(node, nodeId);
        }
        console.log(isContains.result);
    };
}
// 关闭 body 的事件捕获
function closeBodyOnclick() {
    body.onclick = null;
}
