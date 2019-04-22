/* eslint-disable no-use-before-define */

// 判断页面点击的元素是否有效的被包含与可点击元素
import judgeIfContainsOrEqual from '../nodeOperation/judgeIfContainsOrEqual';

// 埋点弹框 以及 被点击元素的样式添加
import showDialog from '../buryingPointDialog/showDialog';

// 查看事件的弹框
import viewEventPopOver from '../viewEventPopOver/popOver';

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
        iframe.onmouseleave = null;
        iframe.onmouseenter = null;
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

// 禁止元素默认行为
function preventDefault(event) {
    event.preventDefault();
}

// 开启事件模式
function openMode(_NODE_DATA) {
    body.addEventListener('click', preventDefault);
    openBodyOnclick(_NODE_DATA);
    // 先将事件保存  然后赋值null   button
    _NODE_DATA.BUTTON.tag_button.forEach((val, key) => {
        buttonHistoryClickEvent[key] = val.onclick;
        val.onclick = null;
    });
    // other
    _NODE_DATA.OTHER.tag_other.forEach((val, key) => {
        otherHistoryClickEvent[key] = val.onclick;
        val.onclick = null;
    });
}

// 关闭事件模式
function closeMode(_NODE_DATA) {
    body.removeEventListener('click', preventDefault);
    closeBodyOnclick();
    // 将click事件还给button
    _NODE_DATA.BUTTON.tag_button.forEach((val, key) => {
        val.onclick = buttonHistoryClickEvent[key];
    });
    // other
    _NODE_DATA.OTHER.tag_other.forEach((val, key) => {
        val.onclick = otherHistoryClickEvent[key];
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
            // 埋点弹框
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

// 切换查看事件
function switcingViewEvent(postData) {
    console.log(postData.isViewEvent);
    if (postData.isViewEvent) {
        viewEventPopOver(true);
    } else {
        viewEventPopOver(false);
    }
}


export { iframeAutoHide, switcingCreateEventMode, switcingViewEvent };
