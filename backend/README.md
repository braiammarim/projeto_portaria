# Backend do Sistema de Portaria

Este é o backend do Sistema de Portaria, desenvolvido em Laravel. O sistema gerencia visitantes e entregas em um ambiente de portaria.

## Tecnologias Utilizadas

- PHP 8.x
- Laravel Framework
- MySQL/MariaDB
- Composer (Gerenciador de dependências PHP)

## Funcionalidades Principais

### Gestão de Visitantes
- Cadastro de visitantes
- Listagem de visitantes
- Visualização detalhada de visitante
- Edição de informações de visitantes
- Remoção de visitantes

### Gestão de Entregas
- Registro de entregas
- Listagem de entregas
- Visualização detalhada de entrega
- Edição de informações de entrega
- Remoção de entregas

## Estrutura do Projeto

```
backend/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── VisitanteController.php
│   │       └── EntregaController.php
├── routes/
│   └── web.php
├── database/
│   └── migrations/
├── config/
└── ...
```

## Endpoints da API

### Visitantes
- `GET /visitantes` - Lista todos os visitantes
- `POST /visitantes` - Cria um novo visitante
- `GET /visitantes/{id}` - Mostra detalhes de um visitante específico
- `PUT /visitantes/{id}` - Atualiza informações de um visitante
- `DELETE /visitantes/{id}` - Remove um visitante

### Entregas
- `GET /entregas` - Lista todas as entregas
- `POST /entregas` - Registra uma nova entrega
- `GET /entregas/{id}` - Mostra detalhes de uma entrega específica
- `PUT /entregas/{id}` - Atualiza informações de uma entrega
- `DELETE /entregas/{id}` - Remove uma entrega

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   composer install
   ```
3. Configure o arquivo `.env` com suas credenciais de banco de dados
4. Execute as migrações:
   ```bash
   php artisan migrate
   ```
5. Inicie o servidor:
   ```bash
   php artisan serve
   ```

## Requisitos do Sistema

- PHP >= 8.0
- Composer
- MySQL/MariaDB
- Extensões PHP necessárias:
  - BCMath
  - Ctype
  - Fileinfo
  - JSON
  - Mbstring
  - OpenSSL
  - PDO
  - Tokenizer
  - XML

## Desenvolvimento

Para contribuir com o desenvolvimento:

1. Crie uma branch para sua feature
2. Faça suas alterações
3. Envie um pull request

## Segurança

- Todas as rotas são protegidas por autenticação
- Validação de dados em todas as entradas
- Sanitização de dados para prevenir injeção SQL
- Proteção contra CSRF em todos os formulários

## Suporte

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento.
