/* eslint-disable no-use-before-define */
import '../../css/viewEvent.less';
import iconc from '../../img/search-icon.png';
// 查看时间弹框
export default function viewEventPopOver(isPopOver) {
    if (isPopOver) {
        createPopOver();
    } else {
        closePopOver();
    }
}
const body = document.getElementsByTagName('body')[0];
const data = {
    event: ['去问问', '趣味请问', '的撒', '贡嘎山', '撒自行车', '67'],
};
// 创建弹框
function createPopOver() {
    const viewEventDiv = document.createElement('div');
    viewEventDiv.classList.add('viewEventDiv-layout');
    // 搜索框
    const searchBox = document.createElement('div');
    searchBox.classList.add('search-box');
    const search = document.createElement('input');
    // 添加icon
    const icon = document.createElement('img');
    icon.setAttribute('src', '../../img/search-icon.png');
    icon.classList.add('search');
    searchBox.appendChild(icon);

    search.setAttribute('type', 'text');
    search.setAttribute('placeholder', '输入事件名称');
    search.classList.add('search');
    searchBox.appendChild(search);
    // 创建列表
    const eventListBox = document.createElement('div');
    eventListBox.classList.add('eventList');
    // 创建列表项
    const itemList = [];
    for (let i = 0; i <= data.event.length; i += 1) {
        itemList[i] = document.createElement('div');
        itemList[i].classList.add('list-item');
        const itemText = document.createElement('span');
        itemText.innerHTML = data.event[i];
        const itemButton = document.createElement('button');
        itemButton.innerHTML = '取消采集';
        itemButton.classList.add('item-button');
        itemList[i].appendChild(itemText);
        itemList[i].appendChild(itemButton);
    }
    // const listItem = document.createElement('div');
    // listItem.classList.add('list-item');
    // const itemText = document.createElement('span');
    // itemText.innerHTML = '事件';
    // const itemButton = document.createElement('button');
    // itemButton.innerHTML = '取消采集';
    // itemButton.classList.add('item-button');
    // listItem.appendChild(itemText);
    // listItem.appendChild(itemButton);
    // 循环添加列表项
    for (let i = 0; i <= data.event.length; i += 1) {
        eventListBox.appendChild(itemList[i]);
    }

    // 弹框根节点 添加至 body
    viewEventDiv.appendChild(searchBox);
    viewEventDiv.appendChild(eventListBox);
    body.appendChild(viewEventDiv);
}
// 关闭弹框
function closePopOver() {
    const viewEventDiv = document.getElementsByClassName('viewEventDiv-layout')[0];
    body.removeChild(viewEventDiv);
}
