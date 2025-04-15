# Site VIP - Plataforma de Conteúdo Exclusivo

Plataforma de conteúdo exclusivo com sistema de assinatura e pagamentos.

## Tecnologias Utilizadas

- React + TypeScript
- Vite
- TailwindCSS
- Supabase (Banco de dados)
- CCBill (Processamento de pagamentos)
- Netlify (Hospedagem)

## Funcionalidades

- Verificação de idade
- Sistema de assinatura VIP
- Pagamentos via cartão de crédito e criptomoedas
- Área de membros
- Galeria de conteúdo
- Blog

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/kauntdewn1/pl_fine.git
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo .env com as seguintes variáveis:
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
VITE_CCBILL_ACCNUM=seu_numero_de_conta
VITE_CCBILL_SUBACC=seu_subaccount
VITE_CCBILL_FORMNAME=nome_do_formulario
VITE_CCBILL_SALT=seu_salt_secreto
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Deploy

O site está configurado para deploy automático no Netlify. Qualquer push para a branch main irá disparar um novo deploy.

## Estrutura do Projeto

```
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