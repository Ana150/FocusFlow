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
            window.location.href = 'admin-dashboard.html'; 
        } else {
            window.location.href = 'user_funcionario.html';
        }
    } else {
        document.getElementById('error-message').classList.remove('hidden');
    }
});
