// Configurações do Sistema PortariaTech SPA

const CONFIG = {
    // URLs da API
    API_BASE_URL: 'http://localhost:8000/api',
    
    // Endpoints da API
    ENDPOINTS: {
        LOGIN: '/login',
        MORADORES: '/moradores',
        VISITANTES: '/visitantes',
        ENTREGAS: '/entregas',
        USUARIOS: '/usuarios'
    },
    
    // Configurações da aplicação
    APP: {
        NAME: 'PortariaTech',
        VERSION: '1.0.0',
        DESCRIPTION: 'Sistema de Gerenciamento de Portaria'
    },
    
    // Configurações de autenticação
    AUTH: {
        TOKEN_KEY: 'portariatech_token',
        SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 horas em ms
        REFRESH_INTERVAL: 5 * 60 * 1000 // 5 minutos em ms
    },
    
    // Configurações de validação
    VALIDATION: {
        CPF_PATTERN: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        PHONE_PATTERN: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        APARTMENT_PATTERN: /^\d{1,4}[A-Za-z]?$/
    },
    
    // Configurações de máscaras
    MASKS: {
        CPF: '000.000.000-00',
        PHONE: '(00) 00000-0000',
        DATE: '00/00/0000',
        TIME: '00:00'
    },
    
    // Configurações de paginação
    PAGINATION: {
        ITEMS_PER_PAGE: 10,
        MAX_PAGES_SHOWN: 5
    },
    
    // Configurações de notificações
    NOTIFICATIONS: {
        SUCCESS_DURATION: 5000,
        ERROR_DURATION: 8000,
        INFO_DURATION: 6000
    },
    
    // Configurações de loading
    LOADING: {
        MIN_DURATION: 500, // Tempo mínimo de exibição do loading
        TIMEOUT: 30000 // Timeout máximo para requisições
    },
    
    // Configurações de cache
    CACHE: {
        ENABLED: true,
        DURATION: 5 * 60 * 1000, // 5 minutos
        MAX_ITEMS: 100
    }
};

// Funções utilitárias de configuração
const ConfigUtils = {
    // Obter URL completa da API
    getApiUrl: (endpoint) => {
        return CONFIG.API_BASE_URL + endpoint;
    },
    
    // Verificar se está em desenvolvimento
    isDevelopment: () => {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1';
    },
    
    // Obter configuração de ambiente
    getEnvironment: () => {
        return ConfigUtils.isDevelopment() ? 'development' : 'production';
    },
    
    // Log de desenvolvimento
    log: (message, data = null) => {
        if (ConfigUtils.isDevelopment()) {
            console.log(`[PortariaTech] ${message}`, data);
        }
    },
    
    // Log de erro
    error: (message, error = null) => {
        if (ConfigUtils.isDevelopment()) {
            console.error(`[PortariaTech] ${message}`, error);
        }
    }
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, ConfigUtils };
} else {
    window.CONFIG = CONFIG;
    window.ConfigUtils = ConfigUtils;
} 