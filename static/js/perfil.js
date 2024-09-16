document.getElementById('user-data-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    
    alert('Senha alterada com sucesso!');
    // Aqui você pode adicionar a lógica para alterar a senha no servidor
});
