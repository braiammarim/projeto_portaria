# PortariaTech Backend

Backend do sistema PortariaTech desenvolvido em Laravel, fornecendo uma API RESTful para gerenciamento de portaria.

## 🚀 Tecnologias

- PHP 8.1+
- Laravel 10.x
- MySQL 5.7+
- JWT Authentication
- WhatsApp API Integration

## 📋 Pré-requisitos

- PHP 8.1 ou superior
- Composer
- MySQL 5.7 ou superior
- Node.js e NPM
- Extensões PHP:
  - BCMath
  - Ctype
  - Fileinfo
  - JSON
  - Mbstring
  - OpenSSL
  - PDO
  - Tokenizer
  - XML

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/portariatech.git
cd portariatech/backend
```

2. Instale as dependências do PHP
```bash
composer install
```

3. Configure o ambiente
```bash
cp .env.example .env
php artisan key:generate
```

4. Configure o banco de dados no arquivo `.env`
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portariatech
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

5. Execute as migrações e seeders
```bash
php artisan migrate --seed
```

6. Inicie o servidor
```bash
php artisan serve
```

## 📁 Estrutura do Projeto

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/    # Controladores da aplicação
│   │   └── Middleware/     # Middlewares de autenticação e validação
│   │   
│   ├── Models/             # Modelos Eloquent
│   └── Services/           # Serviços e lógica de negócio
├── database/
│   ├── migrations/         # Migrações do banco de dados
│   └── seeders/           # Seeders para dados iniciais
├── routes/
│   ├── api.php            # Rotas da API
│   └── web.php            # Rotas web
└── resources/
    └── views/             # Views Blade
```

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos, inclua o token no header:

```
Authorization: Bearer {seu_token}
```

### Endpoints de Autenticação

```
POST /api/login
Body: {
    "email": "seu@email.com",
    "password": "sua_senha"
}

POST /api/logout
Header: Authorization: Bearer {token}
```

## 📡 API Endpoints

### Moradores

```
GET    /api/moradores          # Lista todos os moradores
POST   /api/moradores          # Cria novo morador
GET    /api/moradores/{id}     # Obtém morador específico
PUT    /api/moradores/{id}     # Atualiza morador
DELETE /api/moradores/{id}     # Remove morador
```

### Entregas

```
GET    /api/entregas           # Lista todas as entregas
POST   /api/entregas           # Registra nova entrega
GET    /api/entregas/{id}      # Obtém entrega específica
PUT    /api/entregas/{id}      # Atualiza entrega
DELETE /api/entregas/{id}      # Remove entrega
GET    /api/entregas/portaria/{id}  # Lista entregas por portaria
```

### Visitantes

```
GET    /api/visitantes         # Lista todos os visitantes
POST   /api/visitantes         # Registra novo visitante
GET    /api/visitantes/{id}    # Obtém visitante específico
PUT    /api/visitantes/{id}    # Atualiza visitante
DELETE /api/visitantes/{id}    # Remove visitante
```

## 📱 Integração WhatsApp

O sistema integra com a API do WhatsApp para envio de notificações automáticas. Configuração no `.env`:

```env
WHATSAPP_API_KEY=sua_chave
WHATSAPP_PHONE_NUMBER=seu_numero
```

### Templates de Mensagem

- Notificação de Entrega
- Notificação de Visitante
- Lembretes
- Alertas

## 📊 Relatórios

Endpoints para geração de relatórios:

```
GET /api/relatorios/entregas
GET /api/relatorios/visitantes
GET /api/relatorios/portaria/{id}
```

Parâmetros de filtro:
- data_inicio
- data_fim
- status
- tipo

## 🔍 Logs e Monitoramento

- Logs de atividades em `storage/logs`
- Monitoramento de erros
- Rastreamento de requisições

## 🧪 Testes

Execute os testes com:

```bash
php artisan test
```

## 📝 Convenções de Código

- PSR-12 para estilo de código
- Documentação PHPDoc
- Testes unitários e de integração
- Versionamento semântico

## 🔄 CI/CD

O projeto utiliza GitHub Actions para:
- Testes automatizados
- Análise de código
- Deploy automático

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@portariatech.com.br ou abra uma issue no GitHub.
