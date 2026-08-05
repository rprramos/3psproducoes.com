# 🚀 3P's Produções - Site Oficial (GitHub Pages)

Este é o repositório do site oficial da **3P's Produções**, totalmente independente do Wix, leve, otimizado para SEO e construído em código fonte limpo (HTML5, Vanilla CSS3 e JavaScript).

---

## 📌 Guia Passo a Passo para Publicação Gratuita no GitHub Pages

Siga os passos abaixo para publicar o site gratuitamente com seu próprio endereço e suporte a SSL/HTTPS:

### 1. Criar um Repositório no GitHub
1. Acesse [github.com](https://github.com) e faça login na sua conta (se não tiver, crie uma gratuitamente).
2. Clique no botão **"New"** (Novo Repositório).
3. Nomeie o repositório como `3psproducoes` (ou outro nome de sua preferência).
4. Mantenha a opção **Public** (Público) selecionada.
5. Clique em **"Create repository"**.

### 2. Enviar os Arquivos para o Repositório
No terminal na pasta do projeto (`d:\Produtos Digitais`), execute os seguintes comandos:

```bash
git init
git add .
git commit -m "Inicialização do site 3P's Produções para GitHub Pages"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/3psproducoes.git
git push -u origin main
```

*(Substitua `SEU_USUARIO` pelo seu nome de usuário no GitHub).*

### 3. Ativar o GitHub Pages (Totalmente Gratuito)
1. No seu repositório no GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Na seção **Build and deployment**:
   - **Source**: selecione `Deploy from a branch`.
   - **Branch**: selecione `main` e a pasta `/ (root)`.
4. Clique em **Save**.

🎉 **Pronto!** Em cerca de 1 a 2 minutos, o GitHub gerará o link oficial gratuito do seu site (ex: `https://seu-usuario.github.io/3psproducoes`).

---

## 🌐 Conectando um Domínio Próprio (Opcional)
Se você futuramente comprar um domínio próprio como `3psproducoes.com.br` no Registro.br ou GoDaddy:
1. Na mesma aba **Pages** das configurações do GitHub, digite seu domínio na caixa **Custom domain**.
2. Clique em **Save**.
3. Marque a opção **Enforce HTTPS**.

---

## 🛠️ Funcionalidades e Correções Incluídas
- **Hospedagem 100% Gratuita**: Livre de mensalidades do Wix.
- **Navegação com Dropdown de Fotografia**: Abas para Pessoas, Profissões, Estúdio, Gastronomia e Arquitetura.
- **Nova Foto Oficial**: Foto de autoridade do Rodrigo Ramos integrada na seção *Quem Sou*.
- **WhatsApp Corrigido**: Link direto com modelo de orçamento (`https://wa.me/5521979223500`).
- **SEO de Alta Performance**: Tag `<h1>` única, metadados Open Graph para visualização de miniatura ao compartilhar no WhatsApp e redes sociais.
- **Formulário de Orçamento**: Redirecionamento automático e formatado para o WhatsApp da produtora.
