// script.js

// Validações do formulário

function validarFormulario() {

    // Implemente as validações aqui (exemplo com nome)
  
    let nome = document.getElementById("nome").value;
  
    if (nome === "") {
  
      alert("Por favor, preencha o nome.");
  
      return false;
  
    }
  
    // Outras validações (telefone, apartamento, bloco, etc.)
  
    return true; // Retorna true se tudo estiver válido
  
  }