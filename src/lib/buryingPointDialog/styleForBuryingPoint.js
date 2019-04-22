/* eslint-disable no-restricted-syntax */
// css
import '../../css/burying.less';
// 为节点暂时添加样式
export function addStyle(_node) {
    _node.style.position = 'relative';
    _node.classList.add('buried-style-temporary');
}

export function removeStyle(_node) {
    _node.style.position = 'unset';
    _node.classList.remove('buried-style-temporary');
}

export function rememberStyle(_node) {
    _node.style.position = 'relative';
    _node.classList.add('buried-style-temporary', 'buried-style-normal');
}
