# Fluxo de Pagamento

## Visão Geral

O sistema de pagamento utiliza o Gumroad para processar assinaturas. O fluxo é o seguinte:

1. Usuário seleciona um plano na página `/planos`
2. É redirecionado para a página de pagamento do Gumroad
3. Após o pagamento, é redirecionado para a página de confirmação
4. Escolhe o canal de entrega (Telegram, WhatsApp ou Email)
5. O webhook registra a venda no Supabase

## Endpoints

### `/api/webhook`

- Processa eventos do Gumroad
- Registra vendas no Supabase
- Atualiza status de assinaturas

## Tabelas do Supabase

### `clientes_vip`

- `email`: Email do cliente
- `plano`: 'basico' ou 'vip'
- `status`: 'pago' ou 'pendente'
- `canal_entrega`: 'telegram', 'whatsapp' ou 'email'
- `data_compra`: Data da compra
- `preco`: Valor pago

## Tratamento de Erros

- Validação de dados em todas as etapas
- Mensagens de erro amigáveis para o usuário
- Logs detalhados para debugging
- Fallback para pagamentos falhos

## Segurança

- Tokens armazenados em variáveis de ambiente
- Validação de sessão em todas as rotas protegidas
- Sanitização de inputs
- Rate limiting em endpoints críticos

## Testes Recomendados

1. Fluxo de compra completo
2. Tratamento de erros
3. Validação de dados
4. Webhooks
5. Integração com canais de entrega
