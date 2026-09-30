# Estudo de Arquétipo de Marca

Quiz de 60 afirmações (escala de 1 a 5) que identifica o arquétipo principal, o secundário e o terciário da marca de um cliente.

- **Página:** `arquetipos/index.html` (as fichas dos 12 arquétipos e as fontes ficam em `arquetipos/perfis.js`), publicada pelo GitHub Pages em `https://rprramos.github.io/3psproducoes.com/arquetipos/`
- **Backend:** `apps-script/Codigo.gs`, um Google Apps Script ligado a uma planilha. Ele guarda cada resposta na planilha e envia o resultado por e-mail para o cliente e para o dono da planilha.

## Configuração (uma vez, uns 10 minutos)

### 1. Criar a planilha e o script
1. Entre em <https://sheets.new> com a sua conta Google e dê um nome à planilha, por exemplo "Estudo de Arquétipo – Respostas".
2. No menu, vá em **Extensões → Apps Script**.
3. Apague o conteúdo do arquivo `Código.gs` e cole todo o conteúdo de [`apps-script/Codigo.gs`](apps-script/Codigo.gs).
4. Clique em **Salvar** (ícone de disquete).

### 2. Autorizar e testar
1. Na barra de cima do editor, escolha a função **`testar`** e clique em **Executar**.
2. O Google pede autorização. Vá em **Revisar permissões**, escolha sua conta, clique em **Avançado → Acessar (não seguro)** e depois em **Permitir**. O aviso aparece porque o script é seu e não passou por verificação do Google.
3. Confira que chegaram **2 e-mails** na sua caixa (o do cliente e o seu) e que apareceu uma linha na aba **Respostas** da planilha.

### 3. Publicar como App da Web
1. Clique em **Implantar → Nova implantação**.
2. Na engrenagem de "Selecionar tipo", escolha **App da Web**.
3. Preencha assim:
   - **Executar como:** Eu (sua conta)
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em **Implantar** e copie a **URL do app da Web**. Ela termina em `/exec`.

### 4. Ligar a página ao script
Abra `arquetipos/index.html` e cole a URL na linha:

```js
const SCRIPT_URL = "";
```

Salve e faça o commit. Um ou dois minutos depois do push, a página publicada começa a enviar os resultados.

> Quando você mudar o `Codigo.gs` no futuro, use **Implantar → Gerenciar implantações → editar (lápis) → Nova versão**. Assim a URL continua a mesma.

## O que cada um recebe

| Quem | O que chega |
|---|---|
| **Cliente** | E-mail "Seu arquétipo de marca: X" com os três primeiros arquétipos, a ficha do principal, a pontuação completa e o botão para agendar a devolutiva |
| **Você** | E-mail "Arquétipo · Nome → X" com os dados de contato, a pontuação, os alertas de qualidade, as 60 respostas brutas e o link da planilha. Se você responder esse e-mail, a resposta vai direto para o cliente. |
| **Planilha** | Uma linha por resposta: data, contato, ranking, pontos dos 12 arquétipos, desempate, alertas e respostas brutas |

## Limites e cuidados
- **Cota de e-mails:** uma conta Gmail gratuita envia cerca de 100 e-mails por dia pelo Apps Script, e cada resposta usa 2. Uma conta Google Workspace envia 1.500 por dia.
- **LGPD:** a página pede autorização explícita antes de coletar o nome e o e-mail. A planilha fica só na sua conta Google.
- **Robôs:** um campo invisível filtra robôs simples, e envios repetidos da mesma pessoa em até 10 minutos são ignorados.
- **Validação:** as 60 respostas brutas ficam na planilha. Com 20 a 30 respostas já dá para calcular a consistência de cada arquétipo (alfa de Cronbach) e ajustar as afirmações que não funcionarem bem.
