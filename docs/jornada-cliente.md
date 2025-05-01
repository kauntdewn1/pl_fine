# Jornada do Cliente

```mermaid
graph TD
    A[Entrada] --> C[Home]
    C --> D[Planos]
    D --> E[Processo de Compra]
    E --> F[Gumroad]
    F --> G[Webhook]
    G --> H[Confirmação]
    H --> I[Escolha do Canal]
    I --> J[Área do Cliente]
    J --> K[Feed de Conteúdo]
    J --> L[Sistema de Likes]
    J --> M[Perfil]
    J --> N[Histórico]

    style A fill:#E91E63,stroke:#fff,color:#fff
    style C fill:#1a1a1a,stroke:#E91E63,color:#fff
    style D fill:#1a1a1a,stroke:#E91E63,color:#fff
    style E fill:#1a1a1a,stroke:#E91E63,color:#fff
    style F fill:#1a1a1a,stroke:#E91E63,color:#fff
    style G fill:#1a1a1a,stroke:#E91E63,color:#fff
    style H fill:#1a1a1a,stroke:#E91E63,color:#fff
    style I fill:#1a1a1a,stroke:#E91E63,color:#fff
    style J fill:#1a1a1a,stroke:#E91E63,color:#fff
    style K fill:#1a1a1a,stroke:#E91E63,color:#fff
    style L fill:#1a1a1a,stroke:#E91E63,color:#fff
    style M fill:#1a1a1a,stroke:#E91E63,color:#fff
    style N fill:#1a1a1a,stroke:#E91E63,color:#fff
```

## Detalhamento das Etapas

### 1. Home
- **Componente**: `Home`
- **Funcionalidades**:
  - Apresentação do conteúdo
  - Call-to-action para planos
  - Preview do conteúdo

### 2. Planos
- **Componente**: `Plans`
- **Funcionalidades**:
  - Exibição dos planos disponíveis
  - Comparativo de benefícios
  - Botões de ação para compra

### 3. Processo de Compra
- **Componente**: `PaymentPage`
- **Funcionalidades**:
  - Seleção do plano
  - Redirecionamento para Gumroad
  - Processamento do pagamento

### 4. Webhook e Confirmação
- **Componente**: `webhook.ts`
- **Funcionalidades**:
  - Recebimento de notificações
  - Atualização de status
  - Envio de confirmações

### 5. Escolha do Canal
- **Componente**: `PaymentConfirmation`
- **Funcionalidades**:
  - Seleção do canal preferido
  - Configuração de entrega
  - Confirmação de preferências

### 6. Área do Cliente
- **Componente**: `ClientArea`
- **Funcionalidades**:
  - Dashboard personalizado
  - Acesso ao conteúdo
  - Gerenciamento de conta

### 7. Feed de Conteúdo
- **Componente**: `ContentFeed`
- **Funcionalidades**:
  - Exibição de posts
  - Sistema de filtros
  - Paginação

### 8. Sistema de Likes
- **Componente**: `LikeSystem`
- **Funcionalidades**:
  - Interação com posts
  - Contagem de likes
  - Favoritos

### 9. Perfil
- **Componente**: `Profile`
- **Funcionalidades**:
  - Informações do usuário
  - Configurações
  - Preferências

### 10. Histórico
- **Componente**: `History`
- **Funcionalidades**:
  - Registro de atividades
  - Conteúdo visualizado
  - Interações realizadas

## Fluxo de Dados

```mermaid
sequenceDiagram
    participant C as Cliente
    participant S as Site
    participant G as Gumroad
    participant W as Webhook
    participant DB as Database

    C->>S: Acessa o site
    S->>C: Verifica idade
    C->>S: Confirma idade
    S->>C: Mostra conteúdo
    C->>S: Seleciona plano
    S->>G: Redireciona para pagamento
    G->>W: Confirma pagamento
    W->>DB: Registra cliente
    DB->>S: Atualiza status
    S->>C: Mostra confirmação
    C->>S: Escolhe canal
    S->>C: Acesso ao conteúdo
```

## Integrações

1. **Supabase**
   - Autenticação
   - Banco de dados
   - Storage

2. **Gumroad**
   - Processamento de pagamentos
   - Webhooks
   - Gestão de produtos

3. **Canais de Entrega**
   - Telegram Bot
   - WhatsApp Business API
   - Email Marketing

## Segurança

1. **Verificação de Idade**
   - Modal obrigatório
   - Armazenamento do consentimento
   - Redirecionamento seguro

2. **Rate Limiting**
   - Limite de requisições
   - Proteção contra abusos
   - Monitoramento de IPs

3. **Autenticação**
   - JWT tokens
   - Sessões seguras
   - Proteção de rotas

## Monitoramento

1. **Logs**
   - Acessos
   - Erros
   - Conversões

2. **Métricas**
   - Taxa de conversão
   - Tempo de sessão
   - Engajamento

3. **Alertas**
   - Erros críticos
   - Tentativas de fraude
   - Problemas de performance 