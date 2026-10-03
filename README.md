# iLife Poá

Preview estático em HTML, CSS e JavaScript, com apresentação da loja, catálogo interativo e página de links para a bio. Sem checkout, pagamento, backend ou dependências de produção.

## Abrir o preview

Abra `index.html` no navegador. Para usar um servidor local:

```sh
python -m http.server 3000
```

Acesse `http://localhost:3000`. A página de bio está em `http://localhost:3000/bio.html`.

## Publicar na Vercel

1. Coloque os arquivos desta pasta na raiz de um repositório Git.
2. Importe o repositório na Vercel.
3. Selecione **Other** como framework, deixe o comando de build vazio e o diretório de saída como `.`.
4. Publique. Se o repositório contiver esta pasta como subdiretório, escolha `ilife-poa` como Root Directory.

A configuração `vercel.json` permite também o endereço `/bio`. Os links internos com `.html` continuam compatíveis com abertura local. Não há instalação de pacotes.

## Informações e contato

Os dados públicos estão em `config.js`. O Instagram confirmado é `@ilife_poa`. A biografia pública do perfil informa iPhones, acessórios, assistência e loja no Centro de Poá ao lado da estação. Não foi presumido endereço completo, horário, número de WhatsApp, preços, estoque ou garantias.

O atendimento funciona pelo Instagram. Para ativar WhatsApp e mensagens pré-preenchidas por modelo, preencha `whatsapp` com o número real (55 + DDD + número, só dígitos). O catálogo também permite copiar a mensagem com modelo, cor e capacidade para enviar no Instagram. Os campos `mapsUrl` e `hours` ficam reservados para informações confirmadas; não geram links ou horários enquanto vazios.

Os modelos e configurações são demonstrativos, sem alegação de estoque. Atualize a lista `products` em `app.js` antes da publicação definitiva. Cores selecionáveis do iPhone 16 têm imagens correspondentes; nos demais aparelhos, a cor exibida é apenas a referência fotografada.

## Imagens

Imagens oficiais de aparelhos usadas para avaliação do conceito. Fontes registradas em `assets/sources.json`. A iLife Poá é apresentada como loja independente. Para a versão definitiva, recomenda-se substituir os materiais por fotografias e imagens autorizadas pela loja.

## Recursos

- Catálogo filtrável por linha, modal acessível com seleção de capacidade e cor.
- Mensagem de interesse copiável e contato externo, sem simulação de compra.
- Link na bio com catálogo, atendimento, Instagram, loja e compartilhamento.
- Menu mobile, FAQ expansível, navegação por teclado e preferência de movimento reduzido.
- Design responsivo e recursos locais para funcionar sem dependência de CDNs.
