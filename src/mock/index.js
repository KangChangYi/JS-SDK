import Mock from 'mockjs';
import { pushUserInfo, updateEvent, addEvent } from './user';


// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
    timeout: 1000,
});

// ?data=visitorInfo
// ?event=eventInfo
// ?event=eventInfo

// 接口
Mock.mock('http://localhost:8001/user/info', pushUserInfo);
Mock.mock('http://localhost:8001/event/update', updateEvent);
Mock.mock('http://localhost:8001/event/add', addEvent);
export default Mock;
