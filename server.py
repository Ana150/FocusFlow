import csv
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Variáveis globais para armazenar os dados dos sensores
sensor_data = {
    "temperature": None,
    "humidity": None,
    "ldr_value": None
}

# Rota para exibir a página HTML
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/funcionario')
def funcionario():
    return render_template('funcionario.html')

@app.route('/perfil')
def perfil():
    return render_template('perfil.html')

@app.route('/user')
def user():
    return render_template('user_funcionario.html')

@app.route('/admin')
def admin():
    return render_template('admin-dashboard.html')

@app.route('/circuito')
def circuito():
    return render_template('circuito.html')

@app.route('/visao_computacional')
def visao_computacional():
    return render_template('visao-computacional.html')

# Rota para receber dados dos sensores via POST
@app.route('/api/dados', methods=['POST'])
def receber_dados():
    global sensor_data
    data = request.get_json()
    sensor_data["temperature"] = data.get('temperature')
    sensor_data["humidity"] = data.get('humidity')
    sensor_data["ldr_value"] = data.get('ldr_value')

    print(f"Dados recebidos: Temp={sensor_data['temperature']}°C, Umidade={sensor_data['humidity']}%, Luminosidade={sensor_data['ldr_value']}")

    return jsonify({"status": "sucesso", "dados_recebidos": data})

# Rota para enviar os dados para o frontend
@app.route('/api/get_dados', methods=['GET'])
def get_dados():
    return jsonify(sensor_data)

@app.route('/atualizar_tabela')
def atualizar_tabela():
    with open('dados_sensores.csv', 'r') as file:
        reader = csv.DictReader(file)
        dados = list(reader)[-1]  # Pegue a última linha, assumindo que ela tem os dados mais recentes
    return jsonify(dados)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
