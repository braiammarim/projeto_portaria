// script.js

// Validações do formulário de login
function validarFormulario() {
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

    // Simulação de autenticação (substitua por autenticação real depois)
    if (isValid) {
        // Exemplo de usuário válido
        const usuarioValido = {
            email: "admin@portariatech.com.br",
            senha: "123456"
        };
        if (email !== usuarioValido.email || senha !== usuarioValido.senha) {
            mostrarErroLogin("E-mail e/ou senha incorretos.");
            return false;
        } else {
            // Login bem-sucedido, redireciona para a próxima tela com transição suave
            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 300);
            return false;
        }
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
    const erroDiv = document.createElement("div");
    erroDiv.className = "erro-mensagem";
    erroDiv.textContent = mensagem;
    campo.classList.add("campo-invalido");
    campo.parentNode.appendChild(erroDiv);
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
}

function removerErroLogin() {
    const erroLogin = document.getElementById("erro-login");
    if (erroLogin) {
        erroLogin.remove();
    }
}