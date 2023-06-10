const responseContainer = document.getElementById('responseContainer');

document.getElementById('getTokenButton').addEventListener('click', function() {
    fetch('/db/token')
        .then(response => response.text())
        .then(token => {
            responseContainer.innerText = `获取到的Token: ${token}`;
        })
        .catch(error => {
            responseContainer.innerText = `获取Token失败: ${error}`;
        });
});

document.getElementById('startWebSocketButton').addEventListener('click', function() {
    fetch('/db/start')
        .then(response => {
            if (response.ok) {
                responseContainer.innerText = 'WebSocket连接已开启';
            } else {
                throw new Error('无法开启WebSocket连接');
            }
        })
        .catch(error => {
            responseContainer.innerText = `开启WebSocket连接失败: ${error}`;
        });
});

document.getElementById('stopWebSocketButton').addEventListener('click', function() {
    fetch('/db/stop')
        .then(response => {
            if (response.ok) {
                responseContainer.innerText = 'WebSocket连接已关闭';
            } else {
                throw new Error('无法关闭WebSocket连接');
            }
        })
        .catch(error => {
            responseContainer.innerText = `关闭WebSocket连接失败: ${error}`;
        });
});