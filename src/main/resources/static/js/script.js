


document.addEventListener('DOMContentLoaded', function() {
    const targetIdForm = document.getElementById('targetIdForm');
    const searchForm = document.getElementById('searchForm');
    const latLonForm = document.getElementById('latLonForm');
    const typeForm = document.getElementById('typeForm');
    const timeForm = document.getElementById('timeForm');
    const stateForm = document.getElementById('stateForm');
    const lengthForm = document.getElementById('lengthForm');
    const speedForm = document.getElementById('speedForm');
    const mmsiListForm = document.getElementById('mmsiListForm');
    const shipList = document.getElementById('shipList');
    const lengthRangeForm = document.getElementById('lengthRangeForm');
    const LongitudeRangeForm = document.getElementById('LongitudeRangeForm');
    const LatitudeRangeForm = document.getElementById('LatitudeRangeForm');
    const combinedSearchForm = document.getElementById('combinedSearchForm');
    const exportCSVButton = document.getElementById("exportCSVButton");
    const exportExcelButton = document.getElementById("exportExcelButton");

    exportExcelButton.addEventListener("click", exportToExcel);

    exportCSVButton.addEventListener("click", exportToCSV);

    targetIdForm.addEventListener('submit', function (event){
        event.preventDefault();

        const targetId = document.getElementById('targetIdInput').value;
        getShipsBytargetId(targetId);
    })


    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const mmsi = document.getElementById('mmsiInput').value;
        getShipsByMmsi(mmsi);
    });

    latLonForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const startLat = document.getElementById('startLatInput').value;
        const endLat = document.getElementById('endLatInput').value;
        const startLon = document.getElementById('startLonInput').value;
        const endLon = document.getElementById('endLonInput').value;
        getShipsByLatitudeAndLongitudeRange(startLat, endLat, startLon, endLon);
    });

    typeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const type = document.getElementById('typeInput').value;
        getShipsByType(type);
    });

    timeForm.addEventListener('submit', function(event) {
        event.preventDefault();// 阻止表单地默认提交行为
        // 获取用户输入的具体时间
        const startTimeInput = document.getElementById('startTimeInput');
        const endTimeInput = document.getElementById('endTimeInput');
        const startDateTimeString = startTimeInput.value;
        const endDateTimeString = endTimeInput.value;
        // 将具体时间转换为时间戳
        const startTimestamp = Date.parse(startDateTimeString);
        const endTimestamp = Date.parse(endDateTimeString);
        // 执行查询操作，使用转换后的时间戳进行查询
        getShipsByTimestampRange(startTimestamp, endTimestamp)
    });

    stateForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const state = document.getElementById('stateInput').value;
        getShipsByState(state)

    });


    lengthForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const length = document.getElementById('lengthInput').value;
        getShipsByLength(length);
    });

    speedForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const minSpeed = document.getElementById('minSpeedInput').value;
        const maxSpeed = document.getElementById('maxSpeedInput').value;
        getShipsBySpeedRange(minSpeed, maxSpeed);
    });

    lengthRangeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const minLength = document.getElementById('minLength').value;
        const maxLength = document.getElementById('maxLength').value;
        getShipsByLengthRange(minLength, maxLength);
    });


    LongitudeRangeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const LongitudeStart = document.getElementById('LongitudeStart').value;
        const LongitudeEnd = document.getElementById('LongitudeEnd').value;
        getShipsByLongitudeRange(LongitudeStart, LongitudeEnd);
    });

    LatitudeRangeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const LatitudeStart = document.getElementById('LatitudeStart').value;
        const LatitudeEnd = document.getElementById('LatitudeEnd').value;
        getShipsByLatitudeRange(LatitudeStart, LatitudeEnd);
    });

    LongitudeRangeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const LongitudeStart = document.getElementById('LatitudeStart').value;
        const LongitudeEnd = document.getElementById('LongitudetEnd').value;
        getShipsByLongitudeRange(LongitudeStart, LongitudeEnd);
    });

    mmsiListForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // 去除空格和非数字字符
        // const sanitizedMmsiList = mmsiList.replace(/\s/g, '').replace(/[^0-9,]/g, '');
        // // 将逗号分隔的数字字符串转换为数字数组
        // const mmsiArray = sanitizedMmsiList.split(',').map(Number);
        const mmsiList = document.getElementById('mmsiListInput').value;
        const mmsiArray = mmsiList.split(',').map(Number);
        getShipsByMmsiList(mmsiArray);
    });

    combinedSearchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const state = document.getElementById('stateInputCombined').value;
        const type = document.getElementById('typeInputCombined').value;
        const minLength = document.getElementById('minLengthInput').value;
        const maxLength = document.getElementById('maxLengthInput').value;
        const startLat = document.getElementById('startLatInputCombined').value;
        const endLat = document.getElementById('endLatInputCombined').value;
        const startLon = document.getElementById('startLonInputCombined').value;
        const endLon = document.getElementById('endLonInputCombined').value;
        const startTimestamp = document.getElementById('startTimestampInputCombined').value;
        const endTimestamp = document.getElementById('endTimestampInputCombined').value;
        const minSpeed = document.getElementById('minSpeedInputCombined').value;
        const maxSpeed = document.getElementById('maxSpeedInputCombined').value;

        getShipsByCombinedSearch(state, type, minLength, maxLength, startLat, endLat, startLon, endLon, startTimestamp, endTimestamp, minSpeed, maxSpeed);
    });


    function getShipsByCombinedSearch(state, type, minLength, maxLength, startLat, endLat, startLon, endLon, startTimestamp, endTimestamp, minSpeed, maxSpeed) {
        // 构造请求参数对象
        const params = {
            state: state,
            type: type,
            minLength: minLength,
            maxLength: maxLength,
            startLat: startLat,
            endLat: endLat,
            startLon: startLon,
            endLon: endLon,
            startTimestamp: startTimestamp,
            endTimestamp: endTimestamp,
            minSpeed: minSpeed,
            maxSpeed: maxSpeed
        };

        // 构造查询字符串
        const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');

        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/search?${queryString}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
            <thead>
                <tr>
                    <th>targetId</th>
                    <th>mmsi</th>
                    <th>heading</th>
                    <th>latitude</th>
                    <th>longitude</th>
                    <th>course</th>
                    <th>type</th>
                    <th>state</th>
                    <th>length</th>
                    <th>speed</th>
                    <th>time</th>
                    <th>fixed</th>
                </tr>
            </thead>
            `;

                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${ship.targetId}</td>
                    <td>${ship.mmsi}</td>
                    <td>${ship.heading}</td>
                    <td>${ship.latitude}</td>
                    <td>${ship.longitude}</td>
                    <td>${ship.course}</td>
                    <td>${ship.type}</td>
                    <td>${ship.state}</td>
                    <td>${ship.length}</td>
                    <td>${ship.speed}</td>
                    <td>${formatTimestamp(ship.timestamp)}</td>
                    <td>${ship.fixed}</td>
                `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }


    function getShipsBytargetId(targetId) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/targetId/${targetId}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素

                const table = document.createElement('table');
                // const table = document.createElement('table');
                table.innerHTML = `
        <thead>
          <tr>
            <th>targetId</th>
            <th>mmsi</th>
            <th>heading</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>course</th>
            <th>type</th>
            <th>state</th>
            <th>length</th>
            <th>speed</th>
            <th>time</th>
            <th>fixed</th>
          </tr>
        </thead>
      `;
                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
          <td>${ship.targetId}</td>
          <td>${ship.mmsi}</td>
          <td>${ship.heading}</td>
          <td>${ship.latitude}</td>
          <td>${ship.longitude}</td>
          <td>${ship.course}</td>
          <td>${ship.type}</td>
          <td>${ship.state}</td>
          <td>${ship.length}</td>
          <td>${ship.speed}</td>
          <td>${formatTimestamp(ship.timestamp)}</td>
          <td>${ship.fixed}</td>
        `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }

    function getShipsByMmsi(mmsi) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/mmsi/${mmsi}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素

                const table = document.createElement('table');
                // const table = document.createElement('table');
                table.innerHTML = `
        <thead>
          <tr>
            <th>targetId</th>
            <th>mmsi</th>
            <th>heading</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>course</th>
            <th>type</th>
            <th>state</th>
            <th>length</th>
            <th>speed</th>
            <th>time</th>
            <th>fixed</th>
          </tr>
        </thead>
      `;
                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
          <td>${ship.targetId}</td>
          <td>${ship.mmsi}</td>
          <td>${ship.heading}</td>
          <td>${ship.latitude}</td>
          <td>${ship.longitude}</td>
          <td>${ship.course}</td>
          <td>${ship.type}</td>
          <td>${ship.state}</td>
          <td>${ship.length}</td>
          <td>${ship.speed}</td>
          <td>${formatTimestamp(ship.timestamp)}</td>
          <td>${ship.fixed}</td>
        `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }

    function getShipsByLatitudeAndLongitudeRange(startLat, endLat, startLon, endLon) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/latitude/${startLat}/${endLat}/longitude/${startLon}/${endLon}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
        <thead>
          <tr>
            <th>targetId</th>
            <th>mmsi</th>
            <th>heading</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>course</th>
            <th>type</th>
            <th>state</th>
            <th>length</th>
            <th>speed</th>
            <th>time</th>
            <th>fixed</th>
          </tr>
        </thead>
      `;

                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
          <td>${ship.targetId}</td>
          <td>${ship.mmsi}</td>
          <td>${ship.heading}</td>
          <td>${ship.latitude}</td>
          <td>${ship.longitude}</td>
          <td>${ship.course}</td>
          <td>${ship.type}</td>
          <td>${ship.state}</td>
          <td>${ship.length}</td>
          <td>${ship.speed}</td>
          <td>${formatTimestamp(ship.timestamp)}</td>
          <td>${ship.fixed}</td>
        `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }


    function getShipsByType(type) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/type/${type}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }
                // 分批加载数据
                const batchSize = 20; // 每批加载的数量
                let currentBatch = 0; // 当前已加载的批次数

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
        <thead>
          <tr>
          <tr>
            <th>targetId</th>
            <th>mmsi</th>
            <th>heading</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>course</th>
            <th>type</th>
            <th>state</th>
            <th>length</th>
            <th>speed</th>
            <th>time</th>
            <th>fixed</th>
          </tr>
        </thead>
      `;

                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
          <td>${ship.targetId}</td>
          <td>${ship.mmsi}</td>
          <td>${ship.heading}</td>
          <td>${ship.latitude}</td>
          <td>${ship.longitude}</td>
          <td>${ship.course}</td>
          <td>${ship.type}</td>
          <td>${ship.state}</td>
          <td>${ship.length}</td>
          <td>${ship.speed}</td>
          <td>${formatTimestamp(ship.timestamp)}</td>
          <td>${ship.fixed}</td>
        `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }


    function getShipsByTimestampRange(startTimestamp, endTimestamp) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/timestamp/${startTimestamp}/${endTimestamp}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
        <thead>
           <tr>
            <th>targetId</th>
            <th>mmsi</th>
            <th>heading</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>course</th>
            <th>type</th>
            <th>state</th>
            <th>length</th>
            <th>speed</th>
            <th>time</th>
            <th>fixed</th>
          </tr>
        </thead>
      `;

                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
          <td>${ship.targetId}</td>
          <td>${ship.mmsi}</td>
          <td>${ship.heading}</td>
          <td>${ship.latitude}</td>
          <td>${ship.longitude}</td>
          <td>${ship.course}</td>
          <td>${ship.type}</td>
          <td>${ship.state}</td>
          <td>${ship.length}</td>
          <td>${ship.speed}</td>
          <td>${formatTimestamp(ship.timestamp)}</td>
          <td>${ship.fixed}</td>
        `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }

    // 数据分段加载
    function getShipsByState(state) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/state/${state}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 分批加载数据
                const batchSize = 20; // 每批加载的数量
                let currentBatch = 0; // 当前已加载的批次数

                function renderBatch() {
                    // 创建文档片段
                    const fragment = document.createDocumentFragment();

                    // 加载当前批次的数据
                    const startIndex = currentBatch * batchSize;
                    const endIndex = Math.min(startIndex + batchSize, data.length);
                    for (let i = startIndex; i < endIndex; i++) {
                        const ship = data[i];
                        console.log(ship)

                        // 创建表格行
                        const row = document.createElement('tr');
                        row.innerHTML = `
            <td>${ship.targetId}</td>
            <td>${ship.mmsi}</td>
            <td>${ship.heading}</td>
            <td>${ship.latitude}</td>
            <td>${ship.longitude}</td>
            <td>${ship.course}</td>
            <td>${ship.type}</td>
            <td>${ship.state}</td>
            <td>${ship.length}</td>
            <td>${ship.speed}</td>
            <td>${formatTimestamp(ship.timestamp)}</td>
            <td>${ship.fixed}</td>
          `;

                        // 将表格行添加到文档片段中
                        fragment.appendChild(row);
                    }

                    // 将文档片段一次性插入到表格中
                    table.appendChild(fragment);

                    // 更新当前已加载的批次数
                    currentBatch++;

                    // 判断是否还有未加载的数据
                    if (currentBatch * batchSize < data.length) {
                        // 请求下一帧执行加载下一批数据
                        window.requestAnimationFrame(renderBatch);
                    }
                }

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
        <thead>
          <tr>
            <th>targetId</th>
            <th>mmsi</th>
            <th>heading</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>course</th>
            <th>type</th>
            <th>state</th>
            <th>length</th>
            <th>speed</th>
            <th>time</th>
            <th>fixed</th>
          </tr>
        </thead>
      `;

                // 将表格添加到shipList div中
                shipList.appendChild(table);

                // 开始渲染第一批数据
                renderBatch();
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }



    // function getShipsByState(state) {
    //     // 发起AJAX请求，获取船舶数据
    //     fetch(`/api/ship/state/${state}`)
    //         .then(response => response.json()) // 将响应数据转换为JSON格式
    //         .then(data => {
    //             // 清空shipList div的内容
    //             shipList.innerHTML = '';
    //
    //             // 检查船舶数据是否为空
    //             if (data.length === 0) {
    //                 shipList.innerHTML = '<p>No ships found.</p>';
    //                 return;
    //             }
    //
    //             // 创建表格元素
    //             const table = document.createElement('table');
    //             table.innerHTML = `
    //     <thead>
    //       <tr>
    //         <th>targetId</th>
    //         <th>mmsi</th>
    //         <th>heading</th>
    //         <th>latitude</th>
    //         <th>longitude</th>
    //         <th>course</th>
    //         <th>type</th>
    //         <th>state</th>
    //         <th>length</th>
    //         <th>speed</th>
    //         <th>time</th>
    //         <th>fixed</th>
    //       </tr>
    //     </thead>
    //   `;
    //
    //             // 遍历船舶数据，并添加到表格中
    //             data.forEach(ship => {
    //                 const row = document.createElement('tr');
    //                 row.innerHTML = `
    //       <td>${ship.targetId}</td>
    //       <td>${ship.mmsi}</td>
    //       <td>${ship.heading}</td>
    //       <td>${ship.latitude}</td>
    //       <td>${ship.longitude}</td>
    //       <td>${ship.course}</td>
    //       <td>${ship.type}</td>
    //       <td>${ship.state}</td>
    //       <td>${ship.length}</td>
    //       <td>${ship.speed}</td>
    //       <td>${formatTimestamp(ship.timestamp)}</td>
    //       <td>${ship.fixed}</td>
    //     `;
    //                 table.appendChild(row);
    //             });
    //
    //             // 将表格添加到shipList div中
    //             shipList.appendChild(table);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
    //         });
    // }

    function getShipsByLength(length) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/length/${length}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
        <thead>
          <tr>
            <th>targetId</th>
            <th>mmsi</th>
            <th>heading</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>course</th>
            <th>type</th>
            <th>state</th>
            <th>length</th>
            <th>speed</th>
            <th>time</th>
            <th>fixed</th>
          </tr>
        </thead>
      `;

                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
          <td>${ship.targetId}</td>
          <td>${ship.mmsi}</td>
          <td>${ship.heading}</td>
          <td>${ship.latitude}</td>
          <td>${ship.longitude}</td>
          <td>${ship.course}</td>
          <td>${ship.type}</td>
          <td>${ship.state}</td>
          <td>${ship.length}</td>
          <td>${ship.speed}</td>
          <td>${formatTimestamp(ship.timestamp)}</td>
          <td>${ship.fixed}</td>
        `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }

    function getShipsByLengthRange(minLength, maxLength) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/length/${minLength}/${maxLength}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
        <thead>
          <tr>
            <th>targetId</th>
            <th>mmsi</th>
            <th>heading</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>course</th>
            <th>type</th>
            <th>state</th>
            <th>length</th>
            <th>speed</th>
            <th>time</th>
            <th>fixed</th>
          </tr>
        </thead>
      `;

                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
          <td>${ship.targetId}</td>
          <td>${ship.mmsi}</td>
          <td>${ship.heading}</td>
          <td>${ship.latitude}</td>
          <td>${ship.longitude}</td>
          <td>${ship.course}</td>
          <td>${ship.type}</td>
          <td>${ship.state}</td>
          <td>${ship.length}</td>
          <td>${ship.speed}</td>
          <td>${formatTimestamp(ship.timestamp)}</td>
          <td>${ship.fixed}</td>
        `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }
    function getShipsByLatitudeRange(LatitudeStart, LatitudeEnd) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/latitude/${LatitudeStart}/${LatitudeEnd}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
            <thead>
              <tr>
                <th>targetId</th>
                <th>mmsi</th>
                <th>heading</th>
                <th>latitude</th>
                <th>longitude</th>
                <th>course</th>
                <th>type</th>
                <th>state</th>
                <th>length</th>
                <th>speed</th>
                <th>time</th>
                <th>fixed</th>
              </tr>
            </thead>
          `;

                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
              <td>${ship.targetId}</td>
              <td>${ship.mmsi}</td>
              <td>${ship.heading}</td>
              <td>${ship.latitude}</td>
              <td>${ship.longitude}</td>
              <td>${ship.course}</td>
              <td>${ship.type}</td>
              <td>${ship.state}</td>
              <td>${ship.length}</td>
              <td>${ship.speed}</td>
              <td>${formatTimestamp(ship.timestamp)}</td>
              <td>${ship.fixed}</td>
            `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }
    function getShipsByLongitudeRange(LongitudeStart, LongitudeEnd) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/longitude/${LongitudeStart}/${LongitudeEnd}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
            <thead>
              <tr>
                <th>targetId</th>
                <th>mmsi</th>
                <th>heading</th>
                <th>latitude</th>
                <th>longitude</th>
                <th>course</th>
                <th>type</th>
                <th>state</th>
                <th>length</th>
                <th>speed</th>
                <th>time</th>
                <th>fixed</th>
              </tr>
            </thead>
          `;

                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
              <td>${ship.targetId}</td>
              <td>${ship.mmsi}</td>
              <td>${ship.heading}</td>
              <td>${ship.latitude}</td>
              <td>${ship.longitude}</td>
              <td>${ship.course}</td>
              <td>${ship.type}</td>
              <td>${ship.state}</td>
              <td>${ship.length}</td>
              <td>${ship.speed}</td>
              <td>${formatTimestamp(ship.timestamp)}</td>
              <td>${ship.fixed}</td>
            `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }
    function getShipsBySpeedRange(minSpeed, maxSpeed) {
        // 发起AJAX请求，获取船舶数据
        fetch(`/api/ship/speed/${minSpeed}/${maxSpeed}`)
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';

                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
        <thead>
          <tr>
            <th>targetId</th>
            <th>mmsi</th>
            <th>heading</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>course</th>
            <th>type</th>
            <th>state</th>
            <th>length</th>
            <th>speed</th>
            <th>time</th>
            <th>fixed</th>
          </tr>
        </thead>
      `;

                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
          <td>${ship.targetId}</td>
          <td>${ship.mmsi}</td>
          <td>${ship.heading}</td>
          <td>${ship.latitude}</td>
          <td>${ship.longitude}</td>
          <td>${ship.course}</td>
          <td>${ship.type}</td>
          <td>${ship.state}</td>
          <td>${ship.length}</td>
          <td>${ship.speed}</td>
          <td>${formatTimestamp(ship.timestamp)}</td>
          <td>${ship.fixed}</td>
        `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }


    // function getShipsByMmsiList(mmsiList) {
    //     mmsiList.forEach((mmsi) => {
    //         const requestBody = { mmsi: mmsi }; // Create the request body object with the current mmsi value
    //
    //         fetch('/api/ship/mmsione', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(requestBody)
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 shipList.innerHTML += JSON.stringify(data); // Append the data to the shipList div
    //             })
    //             .catch(error => {
    //                 console.log('Error:', error);
    //             });
    //     });
    // }

    function getShipsByMmsiList(mmsiList) {
        // 构造请求体对象
        const requestBody = {
            mmsiList: mmsiList
        };
        // console.log(mmsiList)

        // 发起AJAX请求，获取船舶数据
        fetch('/api/ship/mmsiList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody) // 将请求体对象转换为JSON格式
        })
            .then(response => response.json()) // 将响应数据转换为JSON格式
            .then(data => {
                // 清空shipList div的内容
                shipList.innerHTML = '';
                console.log(data)
                // 检查船舶数据是否为空
                if (data.length === 0) {
                    shipList.innerHTML = '<p>No ships found.</p>';
                    return;
                }

                // 创建表格元素
                const table = document.createElement('table');
                table.innerHTML = `
        <thead>
          <tr>
            <th>targetId</th>
            <th>mmsi</th>
            <th>heading</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>course</th>
            <th>type</th>
            <th>state</th>
            <th>length</th>
            <th>speed</th>
            <th>time</th>
            <th>fixed</th>
          </tr>
        </thead>
      `;

                // 遍历船舶数据，并添加到表格中
                data.forEach(ship => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
          <td>${ship.targetId}</td>
          <td>${ship.mmsi}</td>
          <td>${ship.heading}</td>
          <td>${ship.latitude}</td>
          <td>${ship.longitude}</td>
          <td>${ship.course}</td>
          <td>${ship.type}</td>
          <td>${ship.state}</td>
          <td>${ship.length}</td>
          <td>${ship.speed}</td>
          <td>${formatTimestamp(ship.timestamp)}</td>
          <td>${ship.fixed}</td>
        `;
                    table.appendChild(row);
                });

                // 将表格添加到shipList div中
                shipList.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                shipList.innerHTML = '<p>An error occurred while retrieving ships.</p>';
            });
    }


    function exportToCSV() {
        const csvRows = [];// 创建一个空数组，用于存储 CSV 的每一行数据
        const headers = Array.from(document.querySelectorAll("#shipList thead tr th")).map(header => header.textContent.trim());
        // 获取表格头部的每一列标题，并使用 map 函数进行处理，去除标题中的多余空白字符
        csvRows.push(headers.join(","));
        // 将处理后的标题行转换为逗号分隔的字符串，并添加到 csvRows 数组中作为 CSV 的第一行
        // 获取表格中的所有行数据（包括表头和数据行）
        const rows = Array.from(document.querySelectorAll("#shipList tr")); //这有bug, 导出数据多了一空行，因为多读取了一个tr
        rows.forEach(row => {
            // 判断是否是表头行，如果是则跳过该行
            if (row.parentElement.tagName === 'THEAD') {
                return;
            }
            // 遍历每一行，获取行中的每个单元格数据，并使用 map 函数进行处理，去除单元格数据中的多余空白字符
            const rowData = Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.trim());
            csvRows.push(rowData.join(","));
            // 将处理后的行数据转换为逗号分隔的字符串，并添加到 csvRows 数组中，形成 CSV 的数据行
        });

        const csvContent = csvRows.join("\n");
        // 将 csvRows 数组中的每一行数据使用换行符连接成一个完整的 CSV 内容字符串
        const blob = new Blob([csvContent], { type: "text/csv" });
        // 创建 Blob 对象，用于存储 CSV 内容
        const url = URL.createObjectURL(blob);
        // 通过 URL.createObjectURL() 方法创建一个包含 CSV 内容的 URL
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "ship_data.csv");
        // 创建一个 <a> 元素，设置其 href 属性为包含 CSV 内容的 URL，设置 download 属性为文件名 "ship_data.csv"
        link.style.display = "none";
        document.body.appendChild(link);
        // 将 <a> 元素添加到文档中的 body 中
        link.click();
        // 模拟用户点击 <a> 元素，触发下载操作
        document.body.removeChild(link);
        // 下载完成后，从文档中移除 <a> 元素
    }



    function exportToExcel() {
        // const table = document.getElementById("shipList table");
        const table = document.querySelector("#shipList table");
        // const rows = Array.from(table.querySelectorAll("tbody tr"));//没用
        // console.log(rows);
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.table_to_sheet(table);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Ship Data");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "ship_data.xlsx");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }



});
