/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-use-before-define */
// 封装ajax
export default function (options) {
    const ajax = new XMLHttpRequest();
    const params = formsParams(options.data);
    if (options.methods === 'GET') {
        ajax.open(options.type, `${options.url}?${params}`, options.async);
        ajax.send(null);
    } else if (options.methods === 'POST') {
        ajax.open(options.type, options.url, options.async);
        ajax.send(params);
    }
    ajax.onreadystatechange = () => {
        if (ajax.readyState === 4 && ajax.status === 200) {
            options.success(JSON.parse(ajax.responseText));
        }
    };
    function formsParams(data) {
        const arr = [];
        for (const i in data) {
            arr.push(`${i}=${data[i]}`);
        }
        return arr.join('&');
    }
}

// 例
// ajax({
//     url: 'http://localhost:8001/user',
//     methods: 'GET',
//     async: true,
//     data: {
//         event: '1',
//     },
//     success(res) {
//         console.log(res);
//     },
// });
