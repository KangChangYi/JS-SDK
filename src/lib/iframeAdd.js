/* eslint-disable func-names */
/* eslint-disable consistent-return */
// css
import '../css/iframe.less';

export default function () {
    const iframe = document.createElement('iframe');
    const body = document.getElementsByTagName('body')[0];

    iframe.src = 'http://localhost:8080/other/MDview/index.html';
    iframe.id = 'iframe';
    iframe.classList.toggle('iframe-style-base');
    iframe.marginWidth = '0';
    iframe.marginHeight = '0';
    iframe.hspace = '0';
    iframe.vspace = '0';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';

    iframe.onreadystatechange = function () {
        if (iframe.readyState !== 'complete') {
            return false;
        }
    };

    // 加载成功触发
    // iframe.onload = loadCallback;

    // 插入iframe
    body.parentNode.insertBefore(iframe, body);
    // body.appendChild(iframe);
}
