document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const signupButton = document.getElementById('signupButton');
    const loginButton = document.getElementById('loginButton');
    const showLoginForm = document.getElementById('showLoginForm');
    const showSignupForm = document.getElementById('showSignupForm');
    const signupMessage = document.getElementById('signupMessage');
    const loginMessage = document.getElementById('loginMessage');

    showLoginForm.addEventListener('click', function() {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    showSignupForm.addEventListener('click', function() {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    signupButton.addEventListener('click', function() {
        const username = document.getElementById('signupUsername').value.trim();
        const password = document.getElementById('signupPassword').value;

        if (username && password) {
            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username]) {
                signupMessage.textContent = "Nom d'utilisateur déjà utilisé.";
            } else {
                users[username] = { password };
                localStorage.setItem('users', JSON.stringify(users));
                signupMessage.textContent = "Inscription réussie. Vous pouvez maintenant vous connecter.";
                setTimeout(() => {
                    loginForm.classList.remove('hidden');
                    signupForm.classList.add('hidden');
                }, 2000);
            }
        } else {
            signupMessage.textContent = "Veuillez remplir tous les champs.";
        }
    });

    loginButton.addEventListener('click', function() {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (username && password) {
            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username] && users[username].password === password) {
                loginMessage.textContent = "Connexion réussie. Redirection...";
                setTimeout(() => {
                    window.location.href = 'content.html'; // Redirection vers la page de contenu
                }, 2000);
            } else {
                loginMessage.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
            }
        } else {
            loginMessage.textContent = "Veuillez remplir tous les champs.";
        }
    });
});
