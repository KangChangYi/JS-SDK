import Mock from 'mockjs';

const pushUserInfo = Mock.mock({
    msg: '添加用户信息成功',
    code: '200',
});

const updateEvent = Mock.mock({
    msg: '修改事件成功',
    code: '200',
});
const addEvent = Mock.mock({
    msg: '添加事件成功',
    code: '200',
});
export { pushUserInfo, updateEvent, addEvent };
