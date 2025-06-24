#!/bin/bash

echo "🚀 Iniciando servidor local para PortariaTech SPA..."
echo "📁 Diretório: $(pwd)"
echo "🌐 URL: http://localhost:3000"
echo "📱 Acesse: http://localhost:3000/app.html"
echo ""
echo "Para parar o servidor, pressione Ctrl+C"
echo ""

# Verificar se Python está disponível
if command -v python3 &> /dev/null; then
    python3 -m http.server 3000
elif command -v python &> /dev/null; then
    python -m http.server 3000
else
    echo "❌ Python não encontrado. Instalando servidor alternativo..."
    
    # Verificar se Node.js está disponível
    if command -v node &> /dev/null; then
        echo "✅ Node.js encontrado. Instalando serve..."
        npx serve . -p 3000
    else
        echo "❌ Nenhum servidor encontrado. Por favor, instale Python ou Node.js."
        exit 1
    fi
fi 