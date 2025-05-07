# Fluxo de Pagamento

O sistema de pagamento utiliza o OpenPix para processar pagamentos via Pix. O fluxo é o seguinte:

1. Usuário seleciona um plano
2. É redirecionado para a página de pagamento do OpenPix
3. Realiza o pagamento via Pix
4. Após a confirmação do pagamento, o acesso é liberado automaticamente

## Componentes do Sistema

- Frontend: Interface de seleção de planos
- OpenPix: Processamento de pagamentos
- Webhook: Recebe notificações de pagamento
- Banco de Dados: Armazena informações de assinatura

## Integrações

- OpenPix API
- Webhook para notificações de pagamento
- Sistema de autenticação
- Banco de dados para armazenamento

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
