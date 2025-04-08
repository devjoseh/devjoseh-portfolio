# 🚀 DevJoseH Portfolio

![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Um portfólio moderno e responsivo para desenvolvedores, com painel administrativo para gerenciar projetos, experiências, hackathons e links sociais. Construído com Next.js, TypeScript, Tailwind CSS e Supabase.

![Preview do Projeto](https://imgur.com/pGU5Vmk.png)

## ✨ Funcionalidades

- 🎨 Design moderno e responsivo
- 🌙 Modo escuro/claro
- 🔐 Painel administrativo protegido
- 📊 Gerenciamento de projetos
- 🏆 Gerenciamento de hackathons
- 💼 Gerenciamento de experiências profissionais
- 🔗 Gerenciamento de links sociais
- 🔄 Animações suaves com Framer Motion
- 🌐 Página de links personalizada (estilo Linktree)
- 📱 Totalmente responsivo para dispositivos móveis

## 🛠️ Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Supabase**: Backend como serviço (BaaS) para banco de dados e autenticação
- **Framer Motion**: Biblioteca para animações
- **Lucide React**: Ícones modernos
- **Shadcn/UI**: Componentes de UI reutilizáveis

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- Conta no [Supabase](https://supabase.com)
- Conta no [Vercel](https://vercel.com) ou [Netlify](https://www.netlify.com/) (para deploy)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Supabase CLI](https://supabase.com/docs/reference/cli/install)

No seu projeto supabase, obtenha o seguinte:

- Supabase URL (`NEXT_PUBLIC_SUPABASE_URL`)
- Supabase Anon Key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/devjoseh/devjoseh-portfolio.git
cd portfolio
```

### 2. Instale as dependências

```bash
npm install # ou yarn install
```

### 3. Configurar variáveis de ambiente

Renomeie o ficheiro .env.exampe no diretório raiz para .env.local e adicione o seguinte, substituindo os espaços pelas suas credenciais Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 4. Configurar o Supabase

Será necessário criar as tabelas e os storages corretos para o banco de dados funcionar. Vá para aba de SQL Editor do supabase e rode os seguintes códigos sql:

#### 4.1. Tabela experiences
```sql
-- Criar a tabela de experiências
CREATE TABLE public.experiences (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar RLS
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Permite todas as operações para usuários autenticados
CREATE POLICY "Acesso total para autenticados"
ON experiences
FOR ALL
TO authenticated 
USING (true)
WITH CHECK (true);

-- Permite SELECT para qualquer pessoa (autenticada ou não)
CREATE POLICY "Permitir SELECT público em experiences"
ON experiences
FOR SELECT
TO public
USING (true);
```

#### 4.2. Tabela links

```sql
-- Criar a tabela de links
CREATE TABLE IF NOT EXISTS public.links (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar índice para ordenação
CREATE INDEX IF NOT EXISTS links_order_index_idx ON public.links (order_index);

-- Configurar RLS
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Permite todas as operações para usuários autenticados
CREATE POLICY "Acesso total para autenticados"
ON links
FOR ALL
TO authenticated 
USING (true)
WITH CHECK (true);

-- Permite SELECT para qualquer pessoa (autenticada ou não)
CREATE POLICY "Permitir SELECT público em links"
ON links
FOR SELECT
TO public
USING (true);
```

#### 4.3. Tabela hackathons

```sql
-- Criar a tabela de hackathons
CREATE TABLE public.hackathons (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    banner_url TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    result TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar RLS
ALTER TABLE public.hackathons ENABLE ROW LEVEL SECURITY;

-- Permite todas as operações para usuários autenticados
CREATE POLICY "Acesso total para autenticados"
ON hackathons
FOR ALL
TO authenticated 
USING (true)
WITH CHECK (true);

-- Permite SELECT para qualquer pessoa (autenticada ou não)
CREATE POLICY "Permitir SELECT público em hackathons"
ON hackathons
FOR SELECT
TO public
USING (true);
```

#### 4.4. Tabela projects

```sql
-- Criar a tabela de projetos
CREATE TABLE public.projects (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}'::text[],
    links jsonb null default '[]'::jsonb,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Permite todas as operações para usuários autenticados
CREATE POLICY "Acesso total para autenticados"
ON projects
FOR ALL
TO authenticated 
USING (true)
WITH CHECK (true);

-- Permite SELECT para qualquer pessoa (autenticada ou não)
CREATE POLICY "Permitir SELECT público em projects"
ON projects
FOR SELECT
TO public
USING (true);
```

#### 4.5. Bucket banners

```sql
-- Cria o bucket 'banners' com acesso público
INSERT INTO storage.buckets (id, name, public)
VALUES ('banners', 'banners', true);

CREATE POLICY "Permitir SELECT público em banners"
ON storage.objects
FOR SELECT
TO public 
USING (bucket_id = 'banners');

CREATE POLICY "Permitir todas as operações no bucket banners para autenticados"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'banners')
WITH CHECK (bucket_id = 'banners');
```

### 5. Gerando arquivo de Tipos

Abra o arquivo `package.json`, procure pelo script `gen:types` e altere o campo `gpygnjpspaxquhpgbhac` para o id do seu projeto supabase. Exemplo: se o link do seu projeto for `https://asrdfhawrsetgizscvbxdy.supabase.co`, o id dele é `asrdfhawrsetgizscvbxdy`

Abra seu terminal e digite `npx supabase login`. Depois de conectar sua conta, crie o arquivo de tipos pelo comando `npm run gen:types`

### 6. Executar o servidor de desenvolvimento

```bash
npm run dev # ou yarn dev
```

Abra seu navegador e navegue até `http://localhost:3000`

### 7. Criando primeiro usuário

Abra seu projeto no supabase, procure por `Authentication` e crie um novo usuário clicando em `Add user` no canto superior direito. Faça login pela página `http://localhost:3000/sign-in` e se desejar criar novos usuários, navegue, enquanto estiver logado, para a página `http://localhost:3000/sign-up`.

## 🧑‍💻 Guia de Uso

### Autenticação
- **Sign-up:** Se você já estiver logado na conta criada pelo painel do supabase e desejar criar novos usuários, navegue até `/sign-up`. O redirecionamento é feito pelo Supabase e aponta para `/auth/callback`. A ação signUp está localizada em `src/utils/actions/auth.ts`.
- **Sign-in:** Navegue até `/sign-in` para iniciar sessão com as suas credenciais. Usa a ação signIn de `src/utils/actions/auth.ts`.
- **Sign-out:** Clique no botão “Desconectar” no painel de administração para sair. Isto utiliza a ação signOut de `src/utils/actions/auth.ts`.
- **Rotas protegidas:**
    - `/admin` Requer autenticação. Redirecciona para `/sign-in` se o usuário não estiver autenticado.
    - `/sign-up` Requer autenticação. Redirecciona para `/sign-in` se o usuário não estiver autenticado.

### Gerir o conteúdo (Painel de administração)
O painel de administração está acessível em `/admin` após o início de sessão. Fornece interfaces para gerir experiências, hackathons, projetos e links.

- **Experiências:**
    - A interface para esta seção é tratada em `src/components/admin/experiences-manager.tsx`. As operações CRUD são tratadas por `src/utils/actions/experience.ts`.
- **Hackathons:**
    - A interface para esta seção é tratada em `src/components/admin/hackathons-manager.tsx`. As operações CRUD são tratadas por `src/utils/actions/hackathon.ts`. Os uploads de imagens são geridos por `src/utils/actions/image-upload.ts` e as imagens são guardadas no Supabase Storage.
- **Projetos:**
    - A interface para esta seção é tratada em `src/components/admin/projects-manager.tsx`. As operações CRUD são tratadas por `src/utils/actions/project.ts`. Os uploads de imagens são geridos por `src/utils/actions/image-upload.ts` e as imagens são guardadas no Supabase Storage.
- **Links:**
    - A interface para esta seção é tratada em `src/components/admin/links-manager.tsx`. As operações CRUD são tratadas por `src/utils/actions/links.ts`.

### Transferência de imagens
O componente `ImageUpload (src/components/admin/image-upload.tsx)` trata dos uploads de imagens para o Supabase Storage. Suporta:

- Seleção de arquivos
- Pré-visualização
- Validação (tipo de imagem, tamanho do ficheiro < 5MB)
- Upload para o Supabase Storage
- Tratamento de erros

As imagens são guardadas no bucket de `banners` do Supabase Storage, dentro de pastas com o nome do tipo de conteúdo (e.g., `hackathons`, `projetos`). A ação `uploadFile` em `src/utils/actions/image-upload.ts` executa o upload.

## 🦾 Contribuição

As contribuições são bem-vindas! Por favor, siga estas regras:

1. Faça o fork do repositório.
2. Crie uma nova branch para a sua funcionalidade ou correção de erros.
3. Faça as suas alterações e submeta-as com mensagens descritivas.
4. Teste as suas alterações.
5. Submeta um pull request.

## 📜 Informações sobre a licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Informações de contato/suporte

Para quaisquer questões ou pedidos de ajuda, entre em contato por e-mail: [contato@devjoseh.com.br](mailto:contato@devjoseh.com.br). Ou por:

- [LinkedIn](https://www.linkedin.com/in/devjoseh/)
- [Instagram](https://www.instagram.com/dev_joseh/)
- [YouTube](https://youtube.com/@devjoseh)
- [GitHub](https://github.com/devjoseh)