function authenticateUser(username, password) {
    const users = {
        'alexandre@cix.com': '12345', 
        'ana@ia.com': '12345'        
    };

    return users[username] === password;
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (authenticateUser(username, password)) {
        if (username === 'ana@ia.com') {
            // Redireciona para a rota Flask da dashboard admin
            window.location.href = '/admin'; 
        } else {
            // Redireciona para a rota Flask do perfil do funcionário
            window.location.href = '/perfil-funcionario';
        }
    } else {
        document.getElementById('error-message').classList.remove('hidden');
    }
});
