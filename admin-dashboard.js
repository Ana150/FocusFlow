// Dados dos funcionários
const employeeData = {
    'Alexandre Henrique Monteiro da Silva': {
        heartRate: [70, 72, 68, 74, 71, 73, 69],
        bloodPressure: [120, 122, 118, 124, 119, 121, 123],
        bodyTemperature: [36.5, 36.6, 36.7, 36.8, 36.6, 36.7, 36.8],
        breakFrequency: [2, 3, 2, 4, 3, 2, 3],
        attendance: [
            { day: 'Segunda', entry: '08:00', exit: '17:00' },
            { day: 'Terça', entry: '08:15', exit: '17:15' },
            { day: 'Quarta', entry: '08:00', exit: '17:00' },
            { day: 'Quinta', entry: '08:10', exit: '17:05' },
            { day: 'Sexta', entry: '08:00', exit: '17:00' },
            { day: 'Sábado', entry: '09:00', exit: '14:00' },
            { day: 'Domingo', entry: '09:00', exit: '14:00' }
        ]
    },
    'Isabella Catarina Almeida de Oliveira': {
        heartRate: [75, 78, 74, 76, 77, 79, 74],
        bloodPressure: [125, 127, 123, 128, 126, 130, 124],
        bodyTemperature: [36.6, 36.7, 36.8, 36.9, 37.0, 36.8, 36.7],
        breakFrequency: [3, 4, 3, 5, 4, 3, 4],
        attendance: [
            { day: 'Segunda', entry: '08:05', exit: '17:05' },
            { day: 'Terça', entry: '08:20', exit: '17:10' },
            { day: 'Quarta', entry: '08:05', exit: '17:05' },
            { day: 'Quinta', entry: '08:15', exit: '17:00' },
            { day: 'Sexta', entry: '08:10', exit: '17:10' },
            { day: 'Sábado', entry: '09:15', exit: '14:15' },
            { day: 'Domingo', entry: '09:10', exit: '14:10' }
        ]
    },
    'Clarissa Maria dos Santos Carvalho': {
        heartRate: [70, 72, 68, 74, 71, 73, 69],
        bloodPressure: [120, 122, 118, 124, 119, 121, 123],
        bodyTemperature: [36.5, 36.6, 36.7, 36.8, 36.6, 36.7, 36.8],
        breakFrequency: [2, 3, 2, 4, 3, 2, 3],
        attendance: [
            { day: 'Segunda', entry: '08:00', exit: '17:00' },
            { day: 'Terça', entry: '08:00', exit: '17:00' },
            { day: 'Quarta', entry: '08:00', exit: '17:00' },
            { day: 'Quinta', entry: '08:00', exit: '17:00' },
            { day: 'Sexta', entry: '08:00', exit: '17:00' },
            { day: 'Sábado', entry: '09:00', exit: '14:00' },
            { day: 'Domingo', entry: '09:00', exit: '14:00' }
        ]
    },
    'Eduardo Augusto Almeida Pereira': {
        heartRate: [75, 78, 74, 76, 77, 79, 74],
        bloodPressure: [125, 127, 123, 128, 126, 130, 124],
        bodyTemperature: [36.6, 36.7, 36.8, 36.9, 37.0, 36.8, 36.7],
        breakFrequency: [3, 4, 3, 5, 4, 3, 4],
        attendance: [
            { day: 'Segunda', entry: '08:10', exit: '17:00' },
            { day: 'Terça', entry: '08:20', exit: '17:05' },
            { day: 'Quarta', entry: '08:15', exit: '17:00' },
            { day: 'Quinta', entry: '08:20', exit: '17:10' },
            { day: 'Sexta', entry: '08:15', exit: '17:00' },
            { day: 'Sábado', entry: '09:10', exit: '14:10' },
            { day: 'Domingo', entry: '09:05', exit: '14:00' }
        ]
    }
};

// Cores de status
const statusColors = {
    green: 'green',
    yellow: 'yellow',
    red: 'red'
};

// Função para determinar o status de saúde
function getHealthStatus(employeeData) {
    const averageHeartRate = employeeData.heartRate.reduce((a, b) => a + b) / employeeData.heartRate.length;
    const averageBloodPressure = employeeData.bloodPressure.reduce((a, b) => a + b) / employeeData.bloodPressure.length;

    if (averageHeartRate > 100 || averageBloodPressure > 140) {
        return 'red';
    } else if (averageHeartRate > 80 || averageBloodPressure > 120) {
        return 'yellow';
    } else {
        return 'green';
    }
}

// Função para calcular as médias
function calculateAverages(data) {
    const averages = {
        heartRate: [],
        bloodPressure: [],
        bodyTemperature: [],
        breakFrequency: []
    };

    const numEmployees = Object.keys(data).length;

    for (const metric in averages) {
        for (let i = 0; i < data[Object.keys(data)[0]][metric].length; i++) {
            let sum = 0;
            for (const employee in data) {
                sum += data[employee][metric][i];
            }
            averages[metric].push(sum / numEmployees);
        }
    }
    return averages;
}

// Função para determinar o status do funcionário
function determineStatus(employee) {
    const index = Object.keys(employeeData).indexOf(employee);
    const statuses = ['green', 'yellow', 'red'];
    return statuses[index % statuses.length];
}

// Função para obter a próxima cor
function getNextColor(currentColor) {
    switch (currentColor) {
        case 'green':
            return 'yellow';
        case 'yellow':
            return 'red';
        case 'red':
        default:
            return 'green';
    }
}

// Função para obter dados de atendimento
function getAttendanceData(data) {
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const entries = [];
    const exits = [];

    for (let i = 0; i < days.length; i++) {
        let entrySum = 0;
        let exitSum = 0;
        let count = 0;

        for (const employee in data) {
            const attendance = data[employee].attendance.find(a => a.day === days[i]);
            if (attendance) {
                entrySum += parseTime(attendance.entry);
                exitSum += parseTime(attendance.exit);
                count++;
            }
        }

        entries.push(count ? entrySum / count : 0);
        exits.push(count ? exitSum / count : 0);
    }

    return { days, entries, exits };
}

// Função para converter tempo para minutos
function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Função para formatar minutos em horas e minutos
function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Função para popular a lista de funcionários
function populateEmployeeList() {
    const employeeList = document.getElementById('employeeList');
    for (const employee in employeeData) {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.position = 'relative';

        // Criar o nome do funcionário em um span
        const employeeName = document.createElement('span');
        employeeName.textContent = employee;

        // Criar um span para a bolinha de status
        const statusIndicator = document.createElement('span');
        statusIndicator.style.width = '10px';
        statusIndicator.style.height = '10px';
        statusIndicator.style.borderRadius = '50%';
        statusIndicator.style.display = 'inline-block';
        statusIndicator.style.marginRight = '10px';
        statusIndicator.style.position = 'absolute';
        statusIndicator.style.right = '0';
        statusIndicator.style.animation = 'blink 1s infinite';

        // Definir a cor inicial com base na lógica
        const status = determineStatus(employee);
        statusIndicator.style.backgroundColor = statusColors[status];

        li.appendChild(employeeName); // Adicionar o nome do funcionário
        li.appendChild(statusIndicator); // Adicionar a bolinha ao <li>

        // Alterar cores para alguns funcionários, se necessário
        if (status === 'red' || status === 'yellow') {
            setInterval(() => {
                const currentColor = statusIndicator.style.backgroundColor;
                statusIndicator.style.backgroundColor = getNextColor(currentColor);
            }, 5000);
        }

        li.onclick = () => {
            localStorage.setItem('selectedEmployee', employee);
            window.location.href = 'funcionario.html';
        };
        employeeList.appendChild(li);
    }
}

// Função para inicializar os gráficos
function initializeCharts() {
    const averages = calculateAverages(employeeData);
    const attendanceData = getAttendanceData(employeeData);

    const ctxHeartRate = document.getElementById('heartRateChart').getContext('2d');
    const ctxBloodPressure = document.getElementById('bloodPressureChart').getContext('2d');
    const ctxBodyTemperature = document.getElementById('bodyTemperatureChart').getContext('2d');
    const ctxBreakFrequency = document.getElementById('breakFrequencyChart').getContext('2d');
    const ctxAttendance = document.getElementById('attendanceChart').getContext('2d');

    new Chart(ctxHeartRate, {
        type: 'line',
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Média de Batimento Cardíaco',
                data: averages.heartRate,
                borderColor: '#58af9b',
                backgroundColor: 'rgba(29, 38, 91, 0.2)',
                fill: false
            }]
        }
    });

    new Chart(ctxBloodPressure, {
        type: 'line',
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Média de Pressão Arterial',
                data: averages.bloodPressure,
                borderColor: '#58af9b',
                backgroundColor: 'rgba(29, 38, 91, 0.2)',
                fill: false
            }]
        }
    });

    new Chart(ctxBodyTemperature, {
        type: 'line',
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Média de Temperatura Corporal',
                data: averages.bodyTemperature,
                borderColor: '#58af9b',
                backgroundColor: 'rgba(29, 38, 91, 0.2)',
                fill: false
            }]
        }
    });

    new Chart(ctxBreakFrequency, {
        type: 'line',
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Média de Frequência de Pausas',
                data: averages.breakFrequency,
                borderColor: '#58af9b',
                backgroundColor: 'rgba(29, 38, 91, 0.2)',
                fill: false
            }]
        }
    });

    new Chart(ctxAttendance, {
        type: 'bar',
        data: {
            labels: attendanceData.days,
            datasets: [
                {
                    label: 'Horário de Entrada',
                    data: attendanceData.entries,
                    borderColor: '#58af9b',
                    backgroundColor: 'rgba(29, 38, 91, 0.5)',
                    borderWidth: 1,
                    stack: true
                },
                {
                    label: 'Horário de Saída',
                    data: attendanceData.exits,
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.5)',
                    borderWidth: 1,
                    stack: true
                }
            ]
        },
        options: {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    ticks: {
                        callback: function(value) {
                            return formatTime(value);
                        }
                    }
                }
            }
        }
    });
}

// Inicializar gráficos e lista de funcionários após o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    populateEmployeeList();
});
