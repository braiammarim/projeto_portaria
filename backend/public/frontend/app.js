// Sistema de Roteamento SPA para PortariaTech (agora em hash mode)
class PortariaTechApp {
    constructor() {
        this.routes = {
            '': 'login',
            '#/': 'login',
            '#/login': 'login',
            '#/dashboard': 'dashboard',
            '#/localizar': 'localizar',
            '#/cadastro-visitantes': 'cadastro-visitantes',
            '#/entregas': 'entregas',
            '#/perfil': 'perfil',
            '#/recuperar-senha': 'recuperar-senha',
            '#/cadastro-mercadorias': 'cadastro-mercadorias'
        };
        
        this.currentPage = null;
        this.isAuthenticated = false;
        
        // Verificar se já está autenticado
        const token = localStorage.getItem('token');
        if (token) {
            this.isAuthenticated = true;
        }
        
        this.init();
    }
    
    init() {
        // Interceptar cliques em links SPA
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="/#"]') || e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                this.navigate(href);
            }
        });
        
        // Navegação por hash
        window.addEventListener('hashchange', () => {
            this.loadPage(window.location.hash || '#/');
        });
        
        // Carregar página inicial
        this.loadPage(window.location.hash || '#/');
    }
    
    navigate(hash) {
        window.location.hash = hash;
    }
    
    async loadPage(hash) {
        console.log('=== LOADPAGE CHAMADA ===', { hash });
        const pageName = this.routes[hash] || 'login';
        console.log('Nome da página:', pageName);
        
        // Verificar autenticação
        if (this.requiresAuth(pageName) && !this.isAuthenticated) {
            console.log('Redirecionando para login (não autenticado)');
            this.navigate('#/login');
            return;
        }
        
        try {
            console.log('Mostrando loading...');
            // Mostrar loading
            this.showLoading();
            
            console.log('Carregando conteúdo da página...');
            // Carregar conteúdo da página
            const content = await this.getPageContent(pageName);
            
            console.log('Atualizando conteúdo...');
            // Atualizar conteúdo
            this.updateContent(content);
            
            console.log('Executando scripts da página...');
            // Executar scripts específicos da página
            this.executePageScripts(pageName);
            
            // Atualizar estado
            this.currentPage = pageName;
            console.log('Página carregada com sucesso:', pageName);
            
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            this.showError('Erro ao carregar página');
        }
    }
    
    requiresAuth(pageName) {
        const publicPages = ['login', 'recuperar-senha'];
        return !publicPages.includes(pageName);
    }
    
    async getPageContent(pageName) {
        const pageContents = {
            'login': this.getLoginContent(),
            'dashboard': this.getDashboardContent(),
            'localizar': this.getLocalizarContent(),
            'cadastro-visitantes': this.getCadastroVisitantesContent(),
            'entregas': this.getEntregasContent(),
            'perfil': this.getPerfilContent(),
            'recuperar-senha': this.getRecuperarSenhaContent(),
            'cadastro-mercadorias': this.getCadastroMercadoriasContent()
        };
        
        return pageContents[pageName] || pageContents['login'];
    }
    
    updateContent(content) {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = content;
        }
    }
    
    showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Carregando...</p>
            </div>
        `;
        loadingDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        document.body.appendChild(loadingDiv);
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.remove();
        }
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            ${message}
        `;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }
    
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ${message}
        `;
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 5000);
    }
    
    executePageScripts(pageName) {
        console.log('=== EXECUTANDO SCRIPTS DA PÁGINA:', pageName, '===');
        
        // Esconder loading
        this.hideLoading();
        
        // Executar scripts específicos de cada página
        switch (pageName) {
            case 'login':
                console.log('Inicializando página de login...');
                this.initLoginPage();
                break;
            case 'dashboard':
                console.log('Inicializando dashboard...');
                this.initDashboardPage();
                break;
            case 'localizar':
                console.log('Inicializando página de localizar...');
                this.initLocalizarPage();
                break;
            case 'cadastro-visitantes':
                console.log('Inicializando cadastro de visitantes...');
                this.initCadastroVisitantesPage();
                break;
            case 'entregas':
                console.log('Inicializando entregas...');
                this.initEntregasPage();
                break;
            case 'perfil':
                console.log('Inicializando perfil...');
                this.initPerfilPage();
                break;
            case 'recuperar-senha':
                console.log('Inicializando recuperar senha...');
                this.initRecuperarSenhaPage();
                break;
            case 'cadastro-mercadorias':
                console.log('Inicializando cadastro de mercadorias...');
                this.initCadastroMercadoriasPage();
                break;
            default:
                console.log('Página não reconhecida:', pageName);
        }
        
        console.log('=== SCRIPTS EXECUTADOS ===');
    }
    
    // Conteúdo das páginas
    getLoginContent() {
        return `
            <div class="login-container">
                <div class="login-header">
                    <h1><i class="fas fa-building"></i> PortariaTech</h1>
                    <p>Sistema de Gerenciamento de Portaria</p>
                </div>
                <form id="loginForm" class="login-form" novalidate>
                    <div class="form-group">
                        <label for="email">E-mail:</label>
                        <input type="email" id="email" name="email" required autocomplete="email" placeholder="seu@email.com">
                    </div>
                    <div class="form-group">
                        <label for="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" required autocomplete="current-password" placeholder="••••••••">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-sign-in-alt"></i> Entrar
                        </button>
                    </div>
                    <div class="form-links">
                        <a href="/recuperar-senha" class="link-secondary">
                            <i class="fas fa-key"></i> Esqueceu sua senha?
                        </a>
                    </div>
                </form>
            </div>
        `;
    }
    
    getDashboardContent() {
        return `
            <div class="dashboard-header">
                <h1><i class="fas fa-tachometer-alt"></i> Dashboard</h1>
                <p>Bem-vindo ao sistema de portaria</p>
                <button onclick="app.logout()" class="btn btn-outline-danger btn-sm">
                    <i class="fas fa-sign-out-alt"></i> Sair
                </button>
            </div>
            <div class="dashboard-options">
                <a href="#/localizar" class="dashboard-option">
                    <i class="fas fa-search"></i>
                    <h3>Localizar Morador</h3>
                    <p>Buscar informações de moradores</p>
                </a>
                <a href="#/cadastro-visitantes" class="dashboard-option">
                    <i class="fas fa-user-plus"></i>
                    <h3>Cadastro de Visitantes</h3>
                    <p>Registrar entrada de visitantes</p>
                </a>
                <a href="#/entregas" class="dashboard-option">
                    <i class="fas fa-box"></i>
                    <h3>Entregas Pendentes</h3>
                    <p>Gerenciar entregas e encomendas</p>
                </a>
                <a href="#/perfil" class="dashboard-option">
                    <i class="fas fa-user-cog"></i>
                    <h3>Perfil</h3>
                    <p>Configurações da conta</p>
                </a>
            </div>
        `;
    }
    
    getLocalizarContent() {
        return `
            <div class="login-container" style="max-width:420px;">
                <button type="button" class="btn-voltar" id="btnVoltar"><i class="fas fa-arrow-left"></i> Voltar</button>
                <h2><i class="fas fa-search"></i> Localizar Morador</h2>
                <form id="formLocalizarMorador" autocomplete="off">
                    <div class="form-group">
                        <label for="telefone">Telefone do morador:</label>
                        <input type="tel" id="telefone" name="telefone" placeholder="(11) 91234-5678" required>
                    </div>
                    <div class="form-group">
                        <label for="apartamento">Número do apartamento:</label>
                        <input type="text" id="apartamento" name="apartamento" placeholder="Ex: 101" required>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-search"></i> Buscar morador
                        </button>
                    </div>
                </form>
                <div id="moradorInfo"></div>
            </div>
        `;
    }
    
    getCadastroVisitantesContent() {
        return `
            <div class="login-container" style="max-width:800px;">
                <a href="#/dashboard" class="btn-voltar">
                    <i class="fas fa-arrow-left"></i> Voltar
                </a>
                <h2><i class="fas fa-user-plus"></i> Cadastro de Visitantes</h2>
                
                <div id="alertMessage" class="alert d-none"></div>

                <form id="visitanteForm" class="needs-validation" novalidate>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="nome" class="form-label required">Nome Completo</label>
                            <input type="text" class="form-control" id="nome" name="nome" required minlength="3" maxlength="100" pattern="[A-Za-zÀ-ÿ\s]+" placeholder="Digite o nome completo">
                            <div class="invalid-feedback">Por favor, informe o nome completo (mínimo 3 caracteres, apenas letras).</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="cpf" class="form-label required">CPF</label>
                            <input type="text" class="form-control" id="cpf" name="cpf" required pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="000.000.000-00">
                            <div class="invalid-feedback">Por favor, informe um CPF válido no formato 000.000.000-00.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="telefone" class="form-label required">Telefone</label>
                            <input type="tel" class="form-control" id="telefone" name="telefone" required pattern="\(\d{2}\)\s\d{4,5}-\d{4}" placeholder="(11) 91234-5678">
                            <div class="invalid-feedback">Por favor, informe um telefone válido no formato (11) 91234-5678.</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="visitante@email.com">
                            <div class="invalid-feedback">Por favor, informe um e-mail válido.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="apartamento_visitado" class="form-label required">Apartamento Visitado</label>
                            <input type="text" class="form-control" id="apartamento_visitado" name="apartamento_visitado" required pattern="\d{1,4}[A-Za-z]?" placeholder="101 ou 101A">
                            <div class="invalid-feedback">Por favor, informe o número do apartamento.</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="motivo_visita" class="form-label">Motivo da Visita</label>
                            <select class="form-select" id="motivo_visita" name="motivo_visita">
                                <option value="">Selecione o motivo</option>
                                <option value="Visita Social">Visita Social</option>
                                <option value="Prestação de Serviços">Prestação de Serviços</option>
                                <option value="Entrega">Entrega</option>
                                <option value="Manutenção">Manutenção</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="data_entrada" class="form-label required">Data de Entrada</label>
                            <input type="date" class="form-control" id="data_entrada" name="data_entrada" required min="">
                            <div class="invalid-feedback">Por favor, informe a data de entrada.</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="hora_entrada" class="form-label required">Hora de Entrada</label>
                            <input type="time" class="form-control" id="hora_entrada" name="hora_entrada" required>
                            <div class="invalid-feedback">Por favor, informe a hora de entrada.</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="observacoes" class="form-label">Observações</label>
                        <textarea class="form-control" id="observacoes" name="observacoes" rows="3" maxlength="500" placeholder="Informações adicionais sobre a visita..."></textarea>
                        <div class="form-text">Máximo 500 caracteres</div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save"></i> Cadastrar Visitante
                        </button>
                    </div>
                </form>

                <hr class="my-4">

                <h3><i class="fas fa-list"></i> Visitantes Cadastrados</h3>
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead class="table-dark">
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th>Morador Visitado</th>
                                <th>Data/Hora Entrada</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="visitantesList">
                            <tr>
                                <td colspan="7" class="text-center text-muted">Carregando visitantes...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    getEntregasContent() {
        return `
            <div class="login-container" style="max-width:520px;">
                <a href="#/dashboard" class="btn-voltar">&larr; Voltar</a>
                <h2>Entregas Pendentes</h2>
                <div class="filtros-bar">
                    <input type="text" id="buscaEntrega" placeholder="Buscar por nome, apto ou telefone...">
                    <select id="filtroStatus">
                        <option value="todas">Todas</option>
                        <option value="pendentes">Pendentes</option>
                        <option value="entregues">Entregues</option>
                    </select>
                </div>
                <div id="entregasLista" class="entregas-lista"></div>
                <div id="msgSucesso" class="msg-sucesso"></div>
            </div>
        `;
    }
    
    getPerfilContent() {
        return `
            <div class="profile-container">
                <a href="#/dashboard" class="btn-voltar" aria-label="Voltar para o dashboard">&larr; Voltar</a>
                <div class="profile-header">
                    <div class="profile-avatar" role="img" aria-label="Avatar do usuário João da Silva">JD</div>
                    <h2>João da Silva</h2>
                    <p>Porteiro - Turno Manhã</p>
                </div>
                <div class="profile-info">
                    <section class="profile-section" aria-labelledby="info-pessoais">
                        <h3 id="info-pessoais">Informações Pessoais</h3>
                        <div class="info-item">
                            <span class="info-label">Nome Completo</span>
                            <span class="info-value">João da Silva</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">E-mail</span>
                            <span class="info-value">joao.silva@portariatech.com</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Telefone</span>
                            <span class="info-value">(11) 98765-4321</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Turno</span>
                            <span class="info-value">Manhã (06h às 14h)</span>
                        </div>
                    </section>
                    <section class="profile-section" aria-labelledby="estatisticas">
                        <h3 id="estatisticas">Estatísticas do Dia</h3>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <span class="stat-icon"><i class="fas fa-box"></i></span>
                                <div class="stat-number">12</div>
                                <div class="stat-label">Entregas</div>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon"><i class="fas fa-user-friends"></i></span>
                                <div class="stat-number">8</div>
                                <div class="stat-label">Visitantes</div>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon"><i class="fas fa-bell"></i></span>
                                <div class="stat-number">15</div>
                                <div class="stat-label">Notificações</div>
                            </div>
                        </div>
                    </section>
                    <section class="profile-section" aria-labelledby="historico">
                        <h3 id="historico">Histórico de Entregas</h3>
                        <div class="delivery-filters">
                            <label for="filterDate" class="sr-only">Filtrar por data</label>
                            <select id="filterDate" name="filterDate" aria-label="Filtrar por data">
                                <option value="all">Todos os dias</option>
                                <option value="today">Hoje</option>
                                <option value="week">Última semana</option>
                                <option value="month">Último mês</option>
                            </select>
                            <label for="filterStatus" class="sr-only">Filtrar por status</label>
                            <select id="filterStatus" name="filterStatus" aria-label="Filtrar por status">
                                <option value="all">Todos os status</option>
                                <option value="entregue">Entregue</option>
                                <option value="pendente">Pendente</option>
                            </select>
                        </div>
                        <div class="delivery-history">
                            <table class="delivery-table" id="deliveryTable">
                                <caption>Histórico de Entregas</caption>
                                <thead>
                                    <tr>
                                        <th scope="col">Data/Hora</th>
                                        <th scope="col">Apartamento</th>
                                        <th scope="col">Morador</th>
                                        <th scope="col">Entregador</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody id="deliveryTableBody">
                                    <!-- Conteúdo dinâmico -->
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section class="profile-section" aria-labelledby="configuracoes">
                        <h3 id="configuracoes">Configurações</h3>
                        <div class="info-item">
                            <span class="info-label">Notificações</span>
                            <button type="button" class="btn-edit" aria-label="Configurar notificações"><i class="fas fa-bell"></i> Configurar</button>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Alterar Senha</span>
                            <button type="button" class="btn-edit" aria-label="Alterar senha"><i class="fas fa-key"></i> Alterar</button>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Preferências</span>
                            <button type="button" class="btn-edit" aria-label="Editar preferências"><i class="fas fa-cog"></i> Editar</button>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
    
    getRecuperarSenhaContent() {
        return `
            <div class="login-container">
                <a href="#/login" class="btn-voltar">
                    <i class="fas fa-arrow-left"></i> Voltar
                </a>
                <h2><i class="fas fa-key"></i> Recuperar Senha</h2>
                <form id="recuperarSenhaForm" novalidate>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required>
                    </div>
                    <button type="submit" class="btn-primary">
                        <i class="fas fa-paper-plane"></i> Enviar Link de Recuperação
                    </button>
                </form>
            </div>
        `;
    }
    
    getCadastroMercadoriasContent() {
        return `
            <div class="login-container" style="max-width:800px;">
                <a href="#/dashboard" class="btn-voltar">
                    <i class="fas fa-arrow-left"></i> Voltar
                </a>
                <h2><i class="fas fa-boxes"></i> Cadastro de Mercadorias</h2>
                <div id="mercadoriasContent">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i>
                        Funcionalidade de mercadorias será implementada em breve.
                    </div>
                </div>
            </div>
        `;
    }
    
    // Inicialização das páginas
    initLoginPage() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value.trim();
                const senha = document.getElementById('senha').value.trim();
                
                try {
                    const response = await fetch('http://localhost:8000/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password: senha })
                    });
                    
                    const data = await response.json();
                    if (data.success) {
                        localStorage.setItem('token', data.token);
                        this.isAuthenticated = true;
                        this.showSuccess('Login realizado com sucesso!');
                        this.navigate('#/dashboard');
                    } else {
                        this.showError(data.message || 'E-mail e/ou senha incorretos.');
                    }
                } catch (err) {
                    this.showError('Erro ao conectar ao servidor.');
                }
            });
        }
    }
    
    initDashboardPage() {
        // Animações do dashboard
        setTimeout(() => {
            const container = document.querySelector('.dashboard-options');
            if (container) {
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }
        }, 100);
    }
    
    initLocalizarPage() {
        console.log('=== INICIANDO PÁGINA LOCALIZAR ===');
        
        // Aguardar um pouco para garantir que o DOM foi atualizado
        setTimeout(() => {
            const form = document.getElementById('formLocalizarMorador');
            console.log('Formulário encontrado:', !!form);
            
            if (form) {
                console.log('Adicionando event listener ao formulário...');
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    console.log('Formulário submetido!');
                    
                    const apartamento = document.getElementById('apartamento').value.trim();
                    const telefone = document.getElementById('telefone').value.trim();
                    
                    console.log('Dados:', { apartamento, telefone });
                    
                    if (!apartamento && !telefone) {
                        this.showError('Por favor, preencha o telefone ou o número do apartamento.');
                        return;
                    }
                    
                    try {
                        const moradorInfo = document.getElementById('moradorInfo');
                        moradorInfo.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Buscando morador...</p></div>';
                        
                        let tipo = 'nome';
                        let query = '';
                        
                        if (apartamento) {
                            tipo = 'apartamento';
                            query = apartamento;
                        } else if (telefone) {
                            tipo = 'telefone';
                            query = telefone;
                        }
                        
                        console.log('Fazendo requisição:', { tipo, query });
                        
                        const response = await fetch(`http://localhost:8000/api/moradores/buscar?q=${encodeURIComponent(query)}&tipo=${tipo}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        
                        console.log('Resposta:', response.status, response.statusText);
                        
                        const data = await response.json();
                        console.log('Dados:', data);
                        
                        if (response.ok) {
                            moradorInfo.innerHTML = `
                                <div class='morador-info'>
                                    <div>Nome do morador: <strong>${data.nome_completo}</strong></div>
                                    <div>Apartamento: <strong>${data.numero_apartamento}</strong></div>
                                    <div>Telefone: <strong>${data.telefone}</strong></div>
                                    <button class='btn-whatsapp' onclick='window.app.notificarWhatsapp("${data.telefone}", "${data.nome_completo}")'>
                                        <i class="fab fa-whatsapp"></i> Notificar via WhatsApp
                                    </button>
                                </div>
                            `;
                            this.showSuccess('Morador encontrado com sucesso!');
                        } else {
                            moradorInfo.innerHTML = `
                                <div class='erro-mensagem'>
                                    <i class="fas fa-exclamation-triangle"></i>
                                    ${data.message || 'Morador não encontrado. Verifique os dados informados.'}
                                </div>
                            `;
                        }
                    } catch (error) {
                        console.error('Erro:', error);
                        this.showError('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
                        
                        const moradorInfo = document.getElementById('moradorInfo');
                        moradorInfo.innerHTML = `
                            <div class='erro-mensagem'>
                                <i class="fas fa-exclamation-circle"></i>
                                Erro ao conectar com o servidor. Verifique se o backend está rodando.
                            </div>
                        `;
                    }
                });
            } else {
                console.error('ERRO: Formulário não encontrado!');
            }
            
            // Botão voltar usa histórico do navegador
            const btnVoltar = document.getElementById('btnVoltar');
            if (btnVoltar) {
                btnVoltar.onclick = () => window.history.back();
            }
            
            // Adicionar máscara no campo de telefone
            const telefoneInput = document.getElementById('telefone');
            if (telefoneInput) {
                telefoneInput.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) {
                        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                    } else {
                        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                    }
                    e.target.value = value;
                });
            }
            
            console.log('=== PÁGINA LOCALIZAR INICIALIZADA ===');
        }, 100); // Aguardar 100ms para garantir que o DOM foi atualizado
    }
    
    // Função para notificar via WhatsApp (adicionada à classe)
    notificarWhatsapp(telefone, nome) {
        const telefoneLimpo = telefone.replace(/\D/g, '');
        const mensagem = encodeURIComponent(`Olá ${nome}, sua encomenda está disponível para retirada na portaria!`);
        const link = `https://wa.me/55${telefoneLimpo}?text=${mensagem}`;
        window.open(link, '_blank');
    }
    
    initCadastroVisitantesPage() {
        // Configurar data mínima
        const dataEntrada = document.getElementById('data_entrada');
        if (dataEntrada) {
            dataEntrada.min = new Date().toISOString().split('T')[0];
        }
        
        // Máscaras
        this.setupMasks();
        
        // Ajustar patterns para aceitar variações comuns
        const nomeInput = document.getElementById('nome');
        if (nomeInput) nomeInput.removeAttribute('pattern'); // Remover pattern HTML5
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) cpfInput.setAttribute('pattern', '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}');
        const telInput = document.getElementById('telefone');
        if (telInput) telInput.setAttribute('pattern', '\\(\\d{2}\\) \\d{4,5}-\\d{4}');
        const aptoInput = document.getElementById('apartamento_visitado');
        if (aptoInput) aptoInput.setAttribute('pattern', '\\d{1,4}[A-Za-z]?');
        const motivoInput = document.getElementById('motivo_visita');
        if (motivoInput) motivoInput.setAttribute('required', 'required');
        
        // Formulário
        const form = document.getElementById('visitanteForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Remover espaços extras dos campos
                if (nomeInput) nomeInput.value = nomeInput.value.trim();
                if (cpfInput) cpfInput.value = cpfInput.value.trim();
                if (telInput) telInput.value = telInput.value.trim();
                if (aptoInput) aptoInput.value = aptoInput.value.trim().toUpperCase();
                if (motivoInput) motivoInput.value = motivoInput.value.trim();
                
                // Validação extra para nome: pelo menos 3 letras (ignorando espaços)
                if (nomeInput) {
                    const letras = nomeInput.value.replace(/[^A-Za-zÀ-ÿ]/g, '');
                    if (letras.length < 3) {
                        nomeInput.setCustomValidity('Por favor, informe o nome completo (mínimo 3 letras).');
                    } else {
                        nomeInput.setCustomValidity('');
                    }
                }
                // Validação extra para motivo da visita
                if (motivoInput && !motivoInput.value) {
                    motivoInput.setCustomValidity('Por favor, selecione o motivo da visita.');
                } else if (motivoInput) {
                    motivoInput.setCustomValidity('');
                }
                
                if (!form.checkValidity()) {
                    e.stopPropagation();
                    form.classList.add('was-validated');
                    return;
                }
                
                // Coletar dados do formulário
                const nome = nomeInput.value;
                const cpf = cpfInput.value;
                const telefone = telInput.value;
                const email = document.getElementById('email').value.trim();
                const apartamento_visitado = aptoInput.value;
                const motivo_visita = motivoInput.value;
                const observacoes = document.getElementById('observacoes').value.trim();
                
                // Verificar se está em modo de edição
                const isEditMode = form.dataset.editMode === 'true';
                const editId = form.dataset.editId;
                
                // Gerar data/hora de entrada atual (apenas para novos registros)
                const dataHoraEntrada = isEditMode ? null : new Date().toISOString();
                
                try {
                    const url = isEditMode 
                        ? `http://localhost:8000/api/visitantes/${editId}`
                        : 'http://localhost:8000/api/visitantes';
                    
                    const method = isEditMode ? 'PUT' : 'POST';
                    
                    const requestBody = {
                        nome,
                        cpf,
                        telefone,
                        email,
                        apartamento_visitado,
                        motivo_visita,
                        observacoes
                    };
                    
                    // Adicionar data_entrada apenas para novos registros
                    if (!isEditMode) {
                        requestBody.data_entrada = dataHoraEntrada;
                    }
                    
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(requestBody)
                    });
                    
                    const data = await response.json();
                    if (response.ok && data.success) {
                        this.showSuccess(isEditMode ? 'Visitante atualizado com sucesso!' : 'Visitante cadastrado com sucesso!');
                        form.reset();
                        form.classList.remove('was-validated');
                        
                        // Se estava editando, cancelar o modo de edição
                        if (isEditMode) {
                            this.cancelEdit();
                        }
                        
                        this.loadVisitantesList();
                    } else {
                        let msg = data.message || (isEditMode ? 'Erro ao atualizar visitante.' : 'Erro ao cadastrar visitante.');
                        if (data.errors) {
                            msg += '<ul>' + Object.values(data.errors).map(e => `<li>${e}</li>`).join('') + '</ul>';
                        }
                        this.showError(msg);
                    }
                } catch (error) {
                    this.showError('Erro ao conectar ao servidor.');
                }
            });
        }
        
        // Carregar lista
        this.loadVisitantesList();
    }
    
    setupMasks() {
        const cpf = document.getElementById('cpf');
        const telefone = document.getElementById('telefone');
        
        if (cpf) {
            cpf.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value;
            });
        }
        
        if (telefone) {
            telefone.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                }
                e.target.value = value;
            });
        }
    }
    
    async loadVisitantesList() {
        try {
            const response = await fetch('http://localhost:8000/api/visitantes');
            const data = await response.json();
            
            const tbody = document.getElementById('visitantesList');
            
            if (tbody) {
                if (data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">Nenhum visitante cadastrado</td></tr>';
                } else {
                    const html = data.map(visitante => `
                        <tr>
                            <td>${visitante.nome}</td>
                            <td>${visitante.cpf}</td>
                            <td>${visitante.telefone}</td>
                            <td>${visitante.apartamento_visitado}</td>
                            <td>${new Date(visitante.data_entrada).toLocaleString('pt-BR')}</td>
                            <td><span class="badge bg-${visitante.status === 'Ativo' ? 'success' : 'secondary'}">${visitante.status || 'Ativo'}</span></td>
                            <td>
                                <button class="btn btn-sm btn-warning edit-btn" data-id="${visitante.id}" title="Editar">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-danger delete-btn" data-id="${visitante.id}" title="Excluir">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('');
                    
                    tbody.innerHTML = html;
                    
                    // Adicionar event listeners aos botões
                    this.setupVisitantesButtons();
                }
            }
        } catch (error) {
            console.error('Erro ao carregar visitantes:', error);
        }
    }
    
    setupVisitantesButtons() {
        // Botões de editar
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const visitanteId = btn.getAttribute('data-id');
                this.editVisitante(visitanteId);
            });
        });
        
        // Botões de excluir
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const visitanteId = btn.getAttribute('data-id');
                this.deleteVisitante(visitanteId);
            });
        });
    }
    
    async editVisitante(visitanteId) {
        try {
            // Buscar dados do visitante
            const response = await fetch(`http://localhost:8000/api/visitantes/${visitanteId}`);
            const visitante = await response.json();
            
            if (!response.ok) {
                this.showError('Erro ao carregar dados do visitante');
                return;
            }
            
            // Preencher formulário com dados do visitante
            document.getElementById('nome').value = visitante.nome;
            document.getElementById('cpf').value = visitante.cpf;
            document.getElementById('telefone').value = visitante.telefone;
            document.getElementById('email').value = visitante.email || '';
            document.getElementById('apartamento_visitado').value = visitante.apartamento_visitado;
            document.getElementById('motivo_visita').value = visitante.motivo_visita;
            document.getElementById('observacoes').value = visitante.observacoes || '';
            
            // Converter data para formato local
            const dataEntrada = new Date(visitante.data_entrada);
            document.getElementById('data_entrada').value = dataEntrada.toISOString().split('T')[0];
            document.getElementById('hora_entrada').value = dataEntrada.toTimeString().slice(0, 5);
            
            // Alterar botão de submit
            const submitBtn = document.querySelector('#visitanteForm button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Atualizar Visitante';
            submitBtn.classList.add('btn-success');
            submitBtn.classList.remove('btn-primary');
            
            // Adicionar botão de cancelar
            if (!document.getElementById('cancelEditBtn')) {
                const cancelBtn = document.createElement('button');
                cancelBtn.type = 'button';
                cancelBtn.id = 'cancelEditBtn';
                cancelBtn.className = 'btn btn-secondary ms-2';
                cancelBtn.innerHTML = '<i class="fas fa-times"></i> Cancelar Edição';
                cancelBtn.onclick = () => this.cancelEdit();
                submitBtn.parentNode.appendChild(cancelBtn);
            }
            
            // Modificar comportamento do formulário para atualizar
            const form = document.getElementById('visitanteForm');
            form.dataset.editMode = 'true';
            form.dataset.editId = visitanteId;
            
            // Scroll para o formulário
            form.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Erro ao editar visitante:', error);
            this.showError('Erro ao carregar dados do visitante');
        }
    }
    
    async deleteVisitante(visitanteId) {
        if (!confirm('Tem certeza que deseja excluir este visitante?')) {
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:8000/api/visitantes/${visitanteId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                this.showSuccess('Visitante excluído com sucesso!');
                this.loadVisitantesList();
            } else {
                const data = await response.json();
                this.showError(data.message || 'Erro ao excluir visitante');
            }
        } catch (error) {
            console.error('Erro ao excluir visitante:', error);
            this.showError('Erro ao conectar ao servidor');
        }
    }
    
    cancelEdit() {
        // Limpar formulário
        document.getElementById('visitanteForm').reset();
        document.getElementById('visitanteForm').classList.remove('was-validated');
        
        // Restaurar botão de submit
        const submitBtn = document.querySelector('#visitanteForm button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Cadastrar Visitante';
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-primary');
        
        // Remover botão de cancelar
        const cancelBtn = document.getElementById('cancelEditBtn');
        if (cancelBtn) {
            cancelBtn.remove();
        }
        
        // Remover modo de edição
        const form = document.getElementById('visitanteForm');
        delete form.dataset.editMode;
        delete form.dataset.editId;
    }
    
    initEntregasPage() {
        // Persistência com localStorage
        const STORAGE_KEY = 'entregas_portariatech';
        function getEntregas() {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) return JSON.parse(data);
            // Dados iniciais
            return [
                { id: 1, nome: 'João Silva', apartamento: '101', telefone: '11991234567', data: '2024-06-01 10:30', entregue: false },
                { id: 2, nome: 'Maria Oliveira', apartamento: '102', telefone: '11999887766', data: '2024-06-01 11:10', entregue: false },
                { id: 3, nome: 'Carlos Souza', apartamento: '201', telefone: '11988776655', data: '2024-06-01 12:00', entregue: false }
            ];
        }
        function setEntregas(arr) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
        }
        let entregas = getEntregas();

        // Busca e filtro
        const buscaEntrega = document.getElementById('buscaEntrega');
        const filtroStatus = document.getElementById('filtroStatus');
        if (buscaEntrega) buscaEntrega.addEventListener('input', renderEntregas);
        if (filtroStatus) filtroStatus.addEventListener('change', renderEntregas);

        function renderEntregas() {
            const lista = document.getElementById('entregasLista');
            const busca = buscaEntrega.value.trim().toLowerCase();
            const filtro = filtroStatus.value;
            let filtradas = entregas.filter(e => {
                let matchBusca =
                    e.nome.toLowerCase().includes(busca) ||
                    e.apartamento.toLowerCase().includes(busca) ||
                    e.telefone.includes(busca.replace(/\D/g, ''));
                let matchStatus =
                    filtro === 'todas' ||
                    (filtro === 'pendentes' && !e.entregue) ||
                    (filtro === 'entregues' && e.entregue);
                return matchBusca && matchStatus;
            });
            lista.innerHTML = '';
            if (filtradas.length === 0) {
                lista.innerHTML = '<div style="text-align:center;color:#888;">Nenhuma entrega encontrada.</div>';
                return;
            }
            filtradas.forEach(entrega => {
                const card = document.createElement('div');
                card.className = 'entrega-card' + (entrega.entregue ? ' entrega-entregue' : '');
                card.innerHTML = `
                    <div class='entrega-info'>
                        <div><strong>${entrega.nome}</strong> - Apt ${entrega.apartamento}</div>
                        <div>Telefone: <a href='https://wa.me/55${entrega.telefone}' target='_blank'>${formatarTelefone(entrega.telefone)}</a></div>
                        <div>Notificado em: ${entrega.data}</div>
                    </div>
                    <div class='entrega-status'>${entrega.entregue ? 'Entregue ao morador' : ''}</div>
                `;
                if (!entrega.entregue) {
                    const btn = document.createElement('button');
                    btn.className = 'btn-confirmar';
                    btn.textContent = 'Confirmar Entrega';
                    btn.onclick = function() { confirmarEntrega(entrega.id); };
                    card.appendChild(btn);
                    // Botão notificar novamente
                    const btnNotif = document.createElement('button');
                    btnNotif.className = 'btn-confirmar';
                    btnNotif.style.background = '#25d366';
                    btnNotif.style.marginLeft = '10px';
                    btnNotif.innerHTML = '<i class="fab fa-whatsapp"></i> Notificar novamente';
                    btnNotif.onclick = function() { notificarWhatsapp(entrega.telefone, entrega.nome); };
                    card.appendChild(btnNotif);
                }
                lista.appendChild(card);
            });
        }

        function formatarTelefone(tel) {
            return `(${tel.substring(0,2)}) ${tel.substring(2,7)}-${tel.substring(7)}`;
        }

        function confirmarEntrega(id) {
            if (confirm('Tem certeza que deseja marcar esta entrega como entregue ao morador?')) {
                entregas = entregas.map(e => e.id === id ? { ...e, entregue: true } : e);
                setEntregas(entregas);
                renderEntregas();
                mostrarSucesso('Entrega confirmada com sucesso!');
            }
        }

        function mostrarSucesso(msg) {
            const el = document.getElementById('msgSucesso');
            el.textContent = msg;
            setTimeout(() => { el.textContent = ''; }, 2000);
        }

        // Inicializa
        renderEntregas();
    }
    
    initPerfilPage() {
        // Dados mockados para o histórico de entregas
        const entregas = [
            { data: '15/03/2024 14:30', apt: '101', morador: 'Maria Silva', entregador: 'Correios', status: 'entregue' },
            { data: '15/03/2024 15:45', apt: '203', morador: 'João Santos', entregador: 'iFood', status: 'entregue' },
            { data: '15/03/2024 16:20', apt: '305', morador: 'Ana Oliveira', entregador: 'Mercado Livre', status: 'pendente' }
        ];
        const tbody = document.getElementById('deliveryTableBody');
        function renderTable() {
            const dateFilter = document.getElementById('filterDate').value;
            const statusFilter = document.getElementById('filterStatus').value;
            let filtradas = entregas.filter(e => {
                let matchStatus = statusFilter === 'all' || e.status === statusFilter;
                // Filtro de data (mock)
                let matchDate = true;
                if (dateFilter === 'today') {
                    matchDate = e.data.startsWith('15/03/2024');
                } else if (dateFilter === 'week') {
                    matchDate = true; // Simulação
                } else if (dateFilter === 'month') {
                    matchDate = true; // Simulação
                }
                return matchStatus && matchDate;
            });
            tbody.innerHTML = filtradas.map(e => `
                <tr>
                    <td>${e.data}</td>
                    <td>${e.apt}</td>
                    <td>${e.morador}</td>
                    <td>${e.entregador}</td>
                    <td><span class="delivery-status status-${e.status}" role="status">${e.status.charAt(0).toUpperCase() + e.status.slice(1)}</span></td>
                </tr>
            `).join('');
        }
        if (tbody) renderTable();
        const filterDate = document.getElementById('filterDate');
        const filterStatus = document.getElementById('filterStatus');
        if (filterDate) filterDate.addEventListener('change', renderTable);
        if (filterStatus) filterStatus.addEventListener('change', renderTable);
    }
    
    initRecuperarSenhaPage() {
        const form = document.getElementById('recuperarSenhaForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                // Lógica de recuperação de senha
                this.showError('Funcionalidade de recuperação será implementada...');
            });
        }
    }
    
    initCadastroMercadoriasPage() {
        // Implementar funcionalidade de mercadorias
    }
    
    logout() {
        localStorage.removeItem('token');
        this.isAuthenticated = false;
        this.navigate('#/login');
        this.showSuccess('Logout realizado com sucesso!');
    }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PortariaTechApp();
}); 