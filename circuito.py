import serial
import requests
import csv
import time
import re

# Configuração da porta serial (Bluetooth HC-05)
bluetooth = serial.Serial('/dev/tty.HC-05-SPPDev', 9600)  # Altere para sua porta correta
bluetooth.flush()

# URL do localhost para onde os dados serão enviados
url = "http://localhost:5000/api/dados"

# Função para salvar os dados em um arquivo CSV
def salvar_dados_csv(temperature, humidity, ldr_value):
    with open('dados_sensores.csv', mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([time.strftime("%Y-%m-%d %H:%M:%S"), temperature, humidity, ldr_value])

# Função para enviar os dados ao localhost
def enviar_dados_para_localhost(temperature, humidity, ldr_value):
    payload = {
        "temperature": temperature,
        "humidity": humidity,
        "ldr_value": ldr_value
    }
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("Dados enviados para o localhost com sucesso!")
        else:
            print(f"Erro ao enviar dados: {response.status_code}")
    except Exception as e:
        print(f"Erro na conexão com o localhost: {e}")

# Função para extrair números de uma string
def extrair_valor_de_string(data_string):
    return re.findall(r"[-+]?\d*\.\d+|\d+", data_string)

# Loop principal para ler os dados do HC-05
while True:
    if bluetooth.in_waiting > 0:
        # Ler dados da porta serial
        data = bluetooth.readline().decode('utf-8').strip()
        print(f"Dados recebidos: {data}")

        # Processar os dados (assumindo que os valores chegam em várias strings)
        try:
            if "Umidade:" in data and "Temperatura:" in data:
                # Exemplo: "Umidade: 50.0 %  Temperatura: 22.5 *C"
                valores = extrair_valor_de_string(data)
                humidity = float(valores[0])  # Primeiro valor é a umidade
                temperature = float(valores[1])  # Segundo valor é a temperatura

            elif "Luminosidade" in data:
                # Exemplo: "Luminosidade (LDR): 300"
                valores = extrair_valor_de_string(data)
                ldr_value = int(valores[0])  # Valor da luminosidade

                # Salvar os dados localmente (em CSV)
                salvar_dados_csv(temperature, humidity, ldr_value)

                # Enviar os dados para o localhost
                enviar_dados_para_localhost(temperature, humidity, ldr_value)

        except (IndexError, ValueError) as e:
            print(f"Erro ao processar dados: {e}")
    
    time.sleep(2)  # Atraso para esperar a próxima leitura
