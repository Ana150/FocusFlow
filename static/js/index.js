function fetchData() {
    const heartRate = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
    const bloodPressure = `${Math.floor(Math.random() * (140 - 90 + 1)) + 90}/${Math.floor(Math.random() * (90 - 60 + 1)) + 60}`;
    const bodyTemperature = (Math.random() * (38 - 36) + 36).toFixed(1);
    const stepCounter = Math.floor(Math.random() * 10000); // Simulando até 10.000 passos
    const breakFrequency = Math.floor(Math.random() * 10); // Simulando de 0 a 9 pausas
    const clockIn = `${String(Math.floor(Math.random() * 12)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
    const clockOut = `${String(Math.floor(Math.random() * 12) + 12).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;

    document.getElementById('heart-rate').textContent = `${heartRate} bpm`;
    document.getElementById('blood-pressure').textContent = bloodPressure;
    document.getElementById('body-temperature').textContent = `${bodyTemperature} °C`;
    document.getElementById('step-counter').textContent = `${stepCounter} passos`;
    document.getElementById('break-frequency').textContent = `${breakFrequency} pausas`;
    document.getElementById('clock-in').textContent = clockIn;
    document.getElementById('clock-out').textContent = clockOut;

    // Atualizar o gráfico com novos dados
    updateFeedbackChart(heartRate, bloodPressure, bodyTemperature, stepCounter);
}

function updateFeedbackChart(heartRate, bloodPressure, bodyTemperature, stepCounter) {
    // Atualizando o dataset do gráfico com novos valores
    feedbackChart.data.datasets[0].data.push(heartRate);
    feedbackChart.data.datasets[0].data.shift();
    feedbackChart.data.datasets[1].data.push(parseInt(bloodPressure.split('/')[0]));
    feedbackChart.data.datasets[1].data.shift();
    feedbackChart.data.datasets[2].data.push(parseFloat(bodyTemperature));
    feedbackChart.data.datasets[2].data.shift();
    feedbackChart.data.datasets[3].data.push(stepCounter / 1000); // Convertendo passos para milhar
    feedbackChart.data.datasets[3].data.shift();
    
    feedbackChart.update();
}

// Configuração inicial do gráfico
const ctx = document.getElementById('feedbackChart').getContext('2d');
const feedbackChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        datasets: [
            {
                label: 'Batimento Cardíaco (bpm)',
                data: [70, 75, 72, 78, 80], // Valores iniciais fictícios
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
            {
                label: 'Pressão Arterial (mmHg)',
                data: [120, 118, 122, 125, 123], // Valores iniciais fictícios
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
            {
                label: 'Temperatura Corporal (°C)',
                data: [36.5, 36.6, 36.4, 36.7, 36.8], // Valores iniciais fictícios
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Passos (mil)',
                data: [8, 7.5, 9, 10, 8.5], // Valores iniciais fictícios
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                fill: true,
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Resumo de Saúde do Funcionário - Semana'
            }
        },
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

// Atualizar os dados a cada 5 segundos
setInterval(fetchData, 5000);

// Chamada inicial para preencher os dados
fetchData();

// Função para mostrar o gráfico correto
// Função para mostrar o gráfico correto entre os dois novos gráficos
function showChart(chartId) {
    const chartIds = ['healthPatternsChart', 'productivityWellbeingChart']; // IDs dos dois novos gráficos

    chartIds.forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas && canvas.id === chartId) {
            canvas.parentElement.style.display = 'block';
        } else if (canvas) {
            canvas.parentElement.style.display = 'none';
        }
    });
}

// Configuração inicial dos gráficos
const healthCtx = document.getElementById('healthPatternsChart').getContext('2d');
const productivityCtx = document.getElementById('productivityWellbeingChart').getContext('2d');

// Gráfico de Análise Preditiva de Padrões de Saúde
const healthPatternsChart = new Chart(healthCtx, {
    type: 'line',
    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        datasets: [
            {
                label: 'Nível de Caminhada Diária (%)',
                data: [85, 80, 78, 82, 79], // Valores fictícios
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Nível de Estresse Cardíaco (%)',
                data: [60, 62, 58, 55, 65], // Valores fictícios
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Análise Preditiva de Padrões de Saúde'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Gráfico de Análise da Produtividade vs. Bem-Estar
const productivityWellbeingChart = new Chart(productivityCtx, {
    type: 'bar',
    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        datasets: [
            {
                label: 'Produtividade (Tarefas Completas)',
                data: [45, 15, 10, 13, 14], // Valores fictícios
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Bem-Estar Geral (%)',
                data: [20, 72, 68, 75, 71], // Valores fictícios
                backgroundColor: 'rgba(255, 206, 86, 0.7)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Análise da Produtividade vs. Bem-Estar'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Função para atualizar o texto da notificação
function updateNotification(statusMessage) {
    const notificationElement = document.getElementById('notificationText');
    notificationElement.textContent = statusMessage;
}
// Dados de status do funcionário
const statusMessages = [
    { color: 'status-green', message: 'Funcionário Bem' },
    { color: 'status-yellow', message: 'Funcionário com Desconforto Cardíaco' },
    { color: 'status-red', message: 'Funcionário Prestes a ter um Infarto. Providêncie ajuda imediatamente!' }
];

let currentStatusIndex = 0;

// Função para atualizar a notificação de status
function updateStatusNotification() {
    const notificationElement = document.getElementById('statusNotification');
    const status = statusMessages[currentStatusIndex];

    notificationElement.className = `status-notification ${status.color}`;
    notificationElement.textContent = status.message;

    // Alternar para a próxima mensagem
    currentStatusIndex = (currentStatusIndex + 1) % statusMessages.length;
}

// Atualiza a notificação a cada 5 segundos
setInterval(updateStatusNotification, 5000);

// Atualiza a notificação imediatamente na carga da página
updateStatusNotification();
