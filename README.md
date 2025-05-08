# Site VIP - Plataforma de Conteúdo Exclusivo

[![Netlify Status](https://api.netlify.com/api/v1/badges/0ec76364-c381-4ffb-93ff-f65730231cb3/deploy-status)](https://app.netlify.com/sites/paulinhaazv/deploys)

Plataforma de conteúdo exclusivo com sistema de assinatura e pagamentos.

## Tecnologias Utilizadas

- React + TypeScript
- Vite
- TailwindCSS
- Supabase (Banco de dados)
- OpenPix (Processamento de pagamentos via Pix)
- Netlify (Hospedagem)

## Funcionalidades

- Autenticação de usuários
- Sistema de pagamentos via Pix
- Área administrativa
- Feed de conteúdo
- Sistema de likes
- Perfil do usuário
- Histórico de atividades

## Planos e Pagamentos

### Acesso Básico – Conteúdo Paula

- Valor: R$ 29,90
- [Link de Pagamento](https://openpix.com.br/pay/dca7fd01-bd6e-4a2d-bb7c-16f3ad07e8b2)

### Acesso VIP – Conteúdo Exclusivo

- Valor: R$ 59,90
- [Link de Pagamento](https://openpix.com.br/pay/19b39aee-9a21-4568-bc59-2432a0b1912e)

## Configuração do Ambiente

1. Clone o repositório:

```bash
git clone https://github.com/kauntdewn1/pl_fine.git
```

2.Instale as dependências:

```bash
npm install
```

3.Crie um arquivo .env com as seguintes variáveis:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

4.Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Deploy

O site está configurado para deploy automático no Netlify. Qualquer push para a branch main irá disparar um novo deploy.

## Estrutura do Projeto

```plaintext
src/
  ├── components/     # Componentes reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── lib/           # Utilitários e serviços
  ├── store/         # Gerenciamento de estado
  └── types/         # Definições de tipos TypeScript
```

## Aviso Legal

© 2024 Todos os direitos reservados.

Este projeto é privado e protegido por direitos autorais. Qualquer uso não autorizado, cópia, distribuição ou modificação do código-fonte é estritamente proibido e sujeito a ações legais.

O código-fonte deste projeto é confidencial e não deve ser compartilhado, copiado ou distribuído sem autorização expressa por escrito.

Violações dos direitos autorais serão perseguidas legalmente.

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
