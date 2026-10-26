# Multi Viagens

Site estático acadêmico em HTML, CSS e JavaScript, preparado para publicação no GitHub Pages.

## Estrutura

- index.html: entrada na raiz do repositório, redireciona para a página inicial.
- html/: páginas do site.
- assets/css/site.css: estilos compartilhados.
- assets/js/site.js: navegação e interações demonstrativas.
- assets/images/: imagens do projeto.

## Abrir localmente

Na pasta do projeto, execute:

    python -m http.server 8000

Acesse http://localhost:8000. A página inicial da aplicação fica em /html/.

## Publicar no GitHub Pages

1. Crie um repositório público vazio, por exemplo multi-viagens.
2. Na pasta deste projeto, conecte o remoto e envie a branch main:

    git remote add origin https://github.com/Willian-Cruz/multi-viagens.git
    git push -u origin main

3. No GitHub, abra Settings > Pages, escolha Deploy from a branch, branch main e pasta /(root).
4. Aguarde a publicação. Com esse nome de repositório, o endereço será [https://willian-cruz.github.io/multi-viagens/](https://willian-cruz.github.io/multi-viagens/html/index.html).

O index.html da raiz permite que o GitHub Pages encontre a página de entrada. Os links são relativos e funcionam no subdiretório do endereço de projeto.

## Observação

Hotéis, resorts, cruzeiros, passagens e contato são demonstrações acadêmicas. O site não consulta disponibilidade ou preços e não envia formulários a um servidor.
