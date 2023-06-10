// let intervalId; // 用于存储定时器的 ID
//
// function startWebSocket() {
//     sendStartRequest();//增加点击后立即接收数据功能
//     // 启动定时器，并将 ID 存储在 intervalId 变量中
//     intervalId = setInterval(sendStartRequest, 24 * 60 * 60 * 1000); // 设置定时器，每24小时发送一次请求
// }
// function stopWebSocket() {
//     // 停止定时器
//     clearInterval(intervalId);
//     sendStopRequest();//增加点击后立即停止接收数据功能
// }
//
// function sendStartRequest() {
//     // 使用XMLHttpRequest或者fetch发送GET请求到后端接口
//     fetch('/db/start')
//         .then(response => {
//             if (response.ok) {
//                 return response.text();
//             }
//             throw new Error('Request failed.');
//         })
//         .then(data => {
//             console.log(data); // 在控制台输出后端返回的数据
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }
//
// function sendStopRequest() {
//     // 使用XMLHttpRequest或者fetch发送GET请求到后端接口
//     fetch('/db/stop')
//         .then(response => {
//             if (response.ok) {
//                 return response.text();
//             }
//             throw new Error('Request failed.');
//         })
//         .then(data => {
//             console.log(data); // 在控制台输出后端返回的数据
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }
//
// // 添加按钮
// document.getElementById('startButton').addEventListener('click', startWebSocket);
// // startWebSocket(); // 启动定时发送请求的功能
// document.getElementById('stopButton').addEventListener('click', stopWebSocket);
// // 在需要停止定时器的地方调用 stopWebSocket()
// // stopWebSocket();