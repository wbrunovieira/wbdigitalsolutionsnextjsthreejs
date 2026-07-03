---
name: test-pages
description: Testa visualmente as páginas do site com Playwright: mede overflow horizontal (bug clássico do "mobile espremido"), renderiza screenshots em qualquer viewport/device nos engines Chromium e WebKit (≈Safari), e recorta faixas de páginas longas para inspeção. Use quando o usuário reportar página quebrada/estranha em mobile ou desktop, para validar mudanças de layout/animação, ou para conferir uma seção específica sem depender de descrição verbal.
---

# Test Pages (Playwright)

Testa páginas do site renderizando de verdade em Chromium e WebKit, com relatório de overflow horizontal + screenshot. Nasceu do diagnóstico real do bug "página dev quebrada no mobile" (que era meta viewport sem `initial-scale` — só apareceu comparando engines e o HTML servido).

## Setup (uma vez por máquina)

O script resolve `playwright` do `node_modules` local do skill:

```bash
npm i playwright@1.61 --prefix .claude/skills/test-pages --no-save --no-fund --no-audit
npx playwright install chromium webkit   # browsers ficam em cache global (~/Library/Caches/ms-playwright)
```

Pré-requisito: o dev server do usuário rodando (confira com `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/dev`). **NUNCA rode `pnpm build`** (regra do projeto: corrompe o `.next` do dev server).

## Uso

```bash
node .claude/skills/test-pages/scripts/page-check.mjs <url> [opções]
```

Receitas comuns:

```bash
# Mobile Chromium 390px (default) — overflow + screenshot da dobra
node .claude/skills/test-pages/scripts/page-check.mjs http://localhost:3000/dev --out=/tmp/dev-mobile.png

# Safari-like (WebKit) com device descriptor real
node .claude/skills/test-pages/scripts/page-check.mjs http://localhost:3000/vendas --engine=webkit --device="iPhone 14" --out=/tmp/vendas-iphone.png

# Página inteira (cuidado: CV tem ~15k px de altura)
node ... http://localhost:3000/dev --full --out=/tmp/dev-full.png

# Só uma seção (faixa vertical em CSS px: TOP,ALTURA) — ex.: a timeline
node ... http://localhost:3000/dev --clip=2400,1200 --out=/tmp/timeline.png

# Viewport custom (ex.: descobrir em que largura algo quebra)
node ... http://localhost:3000/dev --width=320 --height=700
node ... http://localhost:3000/dev --width=1694 --height=900
```

Depois **leia o PNG com a ferramenta Read** para inspecionar visualmente.

## Interpretando o relatório

- `overflow=0px` → o layout mede certo NESSE engine/viewport. Se o usuário ainda vê quebrado: teste o outro engine, e compare o `<meta name="viewport">` servido entre a página quebrada e uma que funciona (`curl -s URL | grep -o '<meta name="viewport"[^>]*>'`) — falta de `initial-scale=1` faz o Safari renderizar em zoom-out.
- `offenders` listados → elementos além da borda; o mais largo geralmente é o culpado. Elementos dentro de um ancestral `overflow-hidden` aparecem na lista mas NÃO causam scroll (ex.: o watermark `</>` do hero dev passa 8px e é inofensivo).

## Armadilhas conhecidas deste projeto

- **fullPage screenshot não dispara `whileInView`**: seções abaixo da dobra saem com opacity 0 (parecem vazias). Para ver uma seção real, use `--clip` OU aumente `--wait` e role antes (ou aceite verificar estrutura, não reveals).
- Screenshots saem em `deviceScaleFactor: 2` (retina): coordenadas de imagem = 2× CSS px.
- Páginas do CV: hero tem animações contínuas (cursor piscando, letreiro rotativo a 2.8s) — o frame capturado pode pegar o letreiro em transição; re-rode se sair semitransparente.
- Outputs vão no diretório atual — prefira o scratchpad da sessão ou `/tmp`, nunca a raiz do repo.
