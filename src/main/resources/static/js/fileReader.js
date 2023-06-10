document.getElementById('shipsInfoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        console.error('未选择文件');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const contents = e.target.result;
        const shipData = parseFileContents(contents);

        fetchShipInfo(shipData)
            .then(shipInfoArray => {
                displayShipInfo(shipInfoArray);
            })
            .catch(error => {
                console.error('查询船舶信息失败:', error);
            });
    };

    if (file) {
        if (file.name.endsWith('.csv')) {
            reader.readAsText(file);
        } else if (file.name.endsWith('.xlsx')) {
            reader.onload = function(e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: ['targetId', 'mmsi'] });

                const shipData = jsonData.map(({ targetId, mmsi }) => ({
                    targetId: targetId.trim(),
                    mmsi: mmsi.trim(),
                }));

                return fetchShipInfo(shipData);
            };
            reader.readAsArrayBuffer(file);
        } else {
            console.error('不支持的文件类型');
        }
    }
});

function fetchShipInfo(shipData) {
    const requests = shipData.map(({ targetId, mmsi }) => {
        return fetch(`/db/shipDetail/${targetId}/${mmsi}`)
            .then(response => response.json());
    });

    return Promise.all(requests);
}

function displayShipInfo(shipInfoArray) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('ship-info-table');

    const tableHead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.innerHTML = `
        <th>目标ID</th>
        <th>MMSI</th>
        <th>船名</th>
        
        <th>长度</th>
        <th>宽度</th>
        <th>吃水</th>
        
        <th>船的类型</th>
        
        <th>AIS级别</th>
        <th>时间戳</th>
        <th>呼号</th>
        <th>目的港</th>
        <th>国籍</th>
        <th>etaTime</th>
<!--        <th>制造商</th>-->
<!--        <th>AIS IMO</th>-->
        <!-- 其他船舶信息字段... -->
    `;
    tableHead.appendChild(headRow);
    table.appendChild(tableHead);

    const tableBody = document.createElement('tbody');
    shipInfoArray.forEach(shipInfo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${shipInfo.targetId}</td>
            <td>${shipInfo.mmsi}</td>
            <td>${shipInfo.vesselName}</td>
            
            <td>${shipInfo.length}</td>
            <td>${shipInfo.wide}</td>
            <td>${shipInfo.draught}</td>
            
            <td>${shipInfo.shipType}</td>
            <td>${shipInfo.shipClass}</td>
            <td>${shipInfo.timestamp}</td>
            <td>${shipInfo.callSign}</td>
            <td>${shipInfo.destination}</td>
            <td>${shipInfo.nationality}</td>
            <td>${shipInfo.etaTime}</td>

            <!-- 其他船舶信息字段... -->
        `;
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    resultContainer.appendChild(table);
}

function parseFileContents(contents) {
    const lines = contents.split('\n');
    const shipData = lines.map(line => {
        const [targetId, mmsi] = line.split(',');
        return { targetId, mmsi };
    });

    return shipData;
}
