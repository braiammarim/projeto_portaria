// script.js

// Configurações
const CONFIG = {
    maxLoginAttempts: 3,
    lockoutDuration: 15 * 60 * 1000, // 15 minutos em milissegundos
    debounceTime: 300
};

// Estado da aplicação
let loginAttempts = 0;
let lockoutEndTime = 0;

// Validações do formulário de login
function validarFormulario() {
    if (isLockedOut()) {
        mostrarErroLogin(`Muitas tentativas. Tente novamente em ${getRemainingLockoutTime()} minutos.`);
        return false;
    }

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    limparErros();
    removerErroLogin();

    let isValid = true;

    // Validação do email
    if (email === "") {
        mostrarErro("email", "Por favor, preencha o email.");
        isValid = false;
    } else if (!validarEmail(email)) {
        mostrarErro("email", "Por favor, insira um email válido.");
        isValid = false;
    }

    // Validação da senha
    if (senha === "") {
        mostrarErro("senha", "Por favor, preencha a senha.");
        isValid = false;
    }

    if (isValid) {
        mostrarLoading();
        // Simulação de autenticação (substitua por autenticação real depois)
        const usuarioValido = {
            email: "admin@portariatech.com.br",
            senha: "123456"
        };

        // Simula uma chamada de API
        setTimeout(() => {
            if (email !== usuarioValido.email || senha !== usuarioValido.senha) {
                loginAttempts++;
                if (loginAttempts >= CONFIG.maxLoginAttempts) {
                    lockoutEndTime = Date.now() + CONFIG.lockoutDuration;
                }
                mostrarErroLogin("E-mail e/ou senha incorretos.");
                esconderLoading();
            } else {
                // Login bem-sucedido
                loginAttempts = 0;
                window.location.href = "dashboard.html";
            }
        }, 1000);
    }
    return false;
}

// Função para validar email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para mostrar mensagem de erro
function mostrarErro(campoId, mensagem) {
    const campo = document.getElementById(campoId);
    // Verifica se já existe uma mensagem de erro para este campo
    let erroDiv = campo.parentNode.querySelector('.erro-mensagem');
    if (!erroDiv) {
        erroDiv = document.createElement("div");
        erroDiv.className = "erro-mensagem";
        campo.parentNode.appendChild(erroDiv);
    }
    erroDiv.textContent = mensagem;
    campo.classList.add("campo-invalido");
    // Adiciona animação de shake
    campo.classList.add("shake");
    setTimeout(() => campo.classList.remove("shake"), 500);
}

// Função para limpar mensagens de erro
function limparErros() {
    const erros = document.querySelectorAll(".erro-mensagem");
    erros.forEach(erro => erro.remove());
    const camposInvalidos = document.querySelectorAll(".campo-invalido");
    camposInvalidos.forEach(campo => campo.classList.remove("campo-invalido"));
}

function mostrarErroLogin(mensagem) {
    let erroLogin = document.getElementById("erro-login");
    if (!erroLogin) {
        erroLogin = document.createElement("div");
        erroLogin.id = "erro-login";
        erroLogin.className = "erro-mensagem erro-login";
        const form = document.getElementById("loginForm");
        form.parentNode.insertBefore(erroLogin, form.nextSibling);
    }
    erroLogin.textContent = mensagem;
    erroLogin.classList.add("fade-in");
}

function removerErroLogin() {
    const erroLogin = document.getElementById("erro-login");
    if (erroLogin) {
        erroLogin.remove();
    }
}

// Funções de loading
function mostrarLoading() {
    const button = document.querySelector('.btn-primary');
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Entrando...';
}

function esconderLoading() {
    const button = document.querySelector('.btn-primary');
    button.disabled = false;
    button.innerHTML = 'Entrar';
}

// Funções de segurança
function isLockedOut() {
    return loginAttempts >= CONFIG.maxLoginAttempts && Date.now() < lockoutEndTime;
}

function getRemainingLockoutTime() {
    return Math.ceil((lockoutEndTime - Date.now()) / (60 * 1000));
}

// Validação em tempo real
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    
    let emailTimeout;
    let senhaTimeout;

    emailInput.addEventListener('input', () => {
        clearTimeout(emailTimeout);
        emailTimeout = setTimeout(() => {
            const email = emailInput.value.trim();
            if (email && !validarEmail(email)) {
                mostrarErro("email", "Por favor, insira um email válido.");
            } else {
                limparErros();
            }
        }, CONFIG.debounceTime);
    });

    senhaInput.addEventListener('input', () => {
        clearTimeout(senhaTimeout);
        senhaTimeout = setTimeout(() => {
            const senha = senhaInput.value.trim();
            if (senha && senha.length < 6) {
                mostrarErro("senha", "A senha deve ter pelo menos 6 caracteres.");
            } else {
                limparErros();
            }
        }, CONFIG.debounceTime);
    });
});