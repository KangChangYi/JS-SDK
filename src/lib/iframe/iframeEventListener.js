/* eslint-disable no-use-before-define */

// iframe事件
import { iframeAutoHide, switcingCreateEventMode, switcingViewEvent } from './iframeEvent';

export default function (nodeData) {
    // 可点击元素的节点和唯一标识
    const NODE_DATA = Object.assign({}, nodeData);

    // 存放在服务器中的 可视化埋点界面
    const serverUrl = 'http://localhost:8080';

    // 监听 可视化埋点发送来的 message
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
        case 'isViewEvent':
            switcingViewEvent(event.data);
            break;
        default:
            break;
        }
    }
}
