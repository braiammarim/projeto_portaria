const { validate } = require('html-validator');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Lista de arquivos HTML para validar
const htmlFiles = [
    'perfil.html',
    'dashboard.html',
    'localizar.html',
    'login.html',
    'index.html',
    'entregas.html',
    'cadastro_mercadorias.html'
];

// Função para validar usando o validador W3C
async function validateWithW3C(html) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'validator.w3.org',
            path: '/nu/?out=json',
            method: 'POST',
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'User-Agent': 'PortariaTech-Validator/1.0'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(html);
        req.end();
    });
}

// Função para validar um arquivo HTML
async function validateHtmlFile(filePath) {
    try {
        const html = fs.readFileSync(filePath, 'utf8');
        const result = await validateWithW3C(html);
        
        console.log(`\n🔍 Validando: ${filePath}`);
        console.log('='.repeat(50));
        
        if (result.messages.length === 0) {
            console.log('✅ HTML válido!');
        } else {
            console.log('❌ HTML inválido!');
            console.log('\nProblemas encontrados:');
            
            const errors = result.messages.filter(msg => msg.type === 'error');
            const warnings = result.messages.filter(msg => msg.type === 'warning');
            
            if (errors.length > 0) {
                console.log('\nErros:');
                errors.forEach((error, index) => {
                    console.log(`\n${index + 1}. ${error.message}`);
                    if (error.extract) {
                        console.log(`   Trecho: ${error.extract}`);
                    }
                    if (error.firstLine) {
                        console.log(`   Linha: ${error.firstLine}, Coluna: ${error.firstColumn}`);
                    }
                });
            }
            
            if (warnings.length > 0) {
                console.log('\nAvisos:');
                warnings.forEach((warning, index) => {
                    console.log(`\n${index + 1}. ${warning.message}`);
                    if (warning.extract) {
                        console.log(`   Trecho: ${warning.extract}`);
                    }
                });
            }
        }
        
        console.log('='.repeat(50));
        return result.messages.length === 0;
    } catch (error) {
        console.error(`❌ Erro ao validar ${filePath}:`, error.message);
        return false;
    }
}

// Função para gerar relatório HTML
function generateHtmlReport(results) {
    const report = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Relatório de Validação HTML - PortariaTech</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .file { margin-bottom: 30px; }
            .valid { color: green; }
            .invalid { color: red; }
            .error { color: red; margin-left: 20px; }
            .warning { color: orange; margin-left: 20px; }
            pre { background: #f5f5f5; padding: 10px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <h1>Relatório de Validação HTML</h1>
        <p>Data: ${new Date().toLocaleString()}</p>
        ${results.map(result => `
            <div class="file">
                <h2>${result.file}</h2>
                <p class="${result.valid ? 'valid' : 'invalid'}">
                    ${result.valid ? '✅ HTML válido!' : '❌ HTML inválido!'}
                </p>
                ${result.messages.map(msg => `
                    <div class="${msg.type}">
                        <p>${msg.message}</p>
                        ${msg.extract ? `<pre>${msg.extract}</pre>` : ''}
                    </div>
                `).join('')}
            </div>
        `).join('')}
    </body>
    </html>
    `;
    
    fs.writeFileSync('validation-report.html', report);
}

// Função principal para validar todos os arquivos
async function validateAllFiles() {
    console.log('🚀 Iniciando validação de arquivos HTML...\n');
    
    const results = [];
    let allValid = true;
    
    for (const file of htmlFiles) {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            const result = await validateHtmlFile(filePath);
            results.push({
                file,
                valid: result,
                messages: result.messages || []
            });
            allValid = allValid && result;
        } else {
            console.log(`❌ Arquivo não encontrado: ${file}`);
            allValid = false;
        }
    }
    
    // Gerar relatório HTML
    generateHtmlReport(results);
    
    if (allValid) {
        console.log('\n✨ Todos os arquivos HTML são válidos!');
    } else {
        console.log('\n⚠️ Alguns arquivos HTML possuem erros. Por favor, corrija-os.');
        console.log('📊 Relatório detalhado gerado em: validation-report.html');
        process.exit(1);
    }
}

// Executar a validação
validateAllFiles(); 