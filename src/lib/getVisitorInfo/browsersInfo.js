/* eslint-disable no-use-before-define */

export default function getBrowserInfo() {
    const { userAgent } = navigator || window.navigator;
    const browserInfo = getBrowserAndEdition(userAgent.toLowerCase());
    const language = getLanguage() || '未知';
    const systemInfo = getOperatingSystem(userAgent.toLowerCase());
    const sourceDomain = getSourceDomain();
    const screenSize = getScreenSize();
    return {
        browserInfo,
        language,
        systemInfo,
        sourceDomain,
        screenSize,
    };
}
//  获取窗口大小
function getScreenSize() {
    const screenWidth = window.outerWidth;
    const screenHeight = window.outerHeight;
    return { screenWidth, screenHeight };
}
// 电脑端 语言类型
function getLanguage() {
    return navigator.language;
}
// 获取来源域名
function getSourceDomain() {
    const source = document.referrer;
    if (source.startsWith('https')) {
        return source.substring(8).split('/')[0];
    }
    if (source.startsWith('http')) {
        return source.substring(7).split('/')[0];
    }
    return 'www.baidu.com';
}
// 操作系统类型
function getOperatingSystem(userAgent) {
    let machineType = '手机端';
    // 移动端判断
    if (/MicroMessenger/i.test(userAgent)) { // 微信端
        return {
            machineType,
            system: 'WeChat',
        };
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) { // 苹果家族
        return {
            machineType,
            system: 'IOS',
        };
    }
    if (/(android|nexus)/i.test(userAgent)) { // 安卓家族
        return {
            machineType,
            system: 'Android',
        };
    }
    // 电脑端判断
    machineType = '电脑端';
    const system = navigator.platform;
    if (system.includes('Win')) {
        return {
            machineType,
            system: 'Windows',
        };
    }
    if (system.includes('Mac')) {
        return {
            machineType,
            system: 'Mac',
        };
    }
    if (system.includes('Linux')) {
        return {
            machineType,
            system: 'Linux',
        };
    }
    return {
        machineType,
        system: '未知',
    };
}
// 电脑端 浏览器类型 和版本号
function getBrowserAndEdition(userAgent) {
    if (userAgent.includes('msie') && !userAgent.includes('360se')) {
        const edition = userAgent.substring(userAgent.indexOf('msie')).split(';')[0].split(' ')[1] || '未知';
        return {
            browser: 'IE',
            edition,
        };
    }
    if (userAgent.includes('chrome')) {
        const edition = userAgent.substring(userAgent.indexOf('chrome')).split(' ')[0].split('/')[1] || '未知';
        return {
            browser: 'Chrome',
            edition,
        };
    }
    if (userAgent.includes('firefox')) {
        const edition = userAgent.substring(userAgent.indexOf('firefox')).split('/')[1] || '未知';
        return {
            browser: 'Firefox',
            edition,
        };
    }
    if (userAgent.includes('opera')) {
        const edition = userAgent.substring(userAgent.indexOf('opera')).split(' ')[0].split('/')[1] || '未知';
        return {
            browser: 'Opera',
            edition,
        };
    }
    if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        const edition = userAgent.substring(userAgent.indexOf('safari')).split('/')[1] || '未知';
        return {
            browser: 'Safari',
            edition,
        };
    }
    if (userAgent.includes('ucweb')) {
        const edition = userAgent.substring(userAgent.indexOf('ucweb')).split('/')[0].substring(5) || '未知';
        return {
            browser: 'UC',
            edition,
        };
    }
    if (userAgent.includes('360se')) {
        // const [browser = '未知', edition = '未知'] =
        // userAgent.substring(userAgent.indexOf('360SE')).substring(0, 5);
        return {
            browser: '360',
            edition: '未知',
        };
    }
    if (userAgent.includes('MetaSr')) {
        return {
            browser: '搜狗',
            edition: '未知',
        };
    }
    if (userAgent.includes('TencentTraveler')) {
        return {
            browser: 'QQ',
            edition: '未知',
        };
    }
    return {
        browser: '未知',
        edition: '未知',
    };
}
