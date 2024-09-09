function authenticateUser(username, password) {
    const users = {
        'funcionario': 'senha123', 
        'admin': 'admin123'        
    };

    return users[username] === password;
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (authenticateUser(username, password)) {

        if (username === 'admin') {
            window.location.href = 'admin-dashboard.html'; 
        } else {
            window.location.href = 'user_funcionario.html';
        }
    } else {
        document.getElementById('error-message').classList.remove('hidden');
    }
});
