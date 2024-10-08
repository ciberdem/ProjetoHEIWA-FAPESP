# projeto-heiwa
## Como Utilizar o Sistema
Este sistema foi projetado para ser intuitivo e fácil de usar. Aqui estão as instruções passo a passo para gerar dados aleatórios e visualizá-los em um gráfico de alianças e confrontos.

Gerar Autores: No campo “Nº de autores”, insira a quantidade desejada de autores para a geração de dados aleatórios. Em seguida, clique no botão “Gerar Autores”.
Gerar Falas: No campo “Nº de falas”, insira a quantidade de falas que você deseja gerar. Clique no botão “Gerar Falas” para prosseguir.
Gerar Links: No campo “Nº de links”, insira a quantidade de links que serão gerados entre as falas dos autores. Clique no botão “Gerar Links” para continuar.
Gerar Vértices: Clique no botão “Gerar Vértices” para criar os vértices com base nos dados gerados anteriormente.
Gerar Arestas: Clique no botão “Gerar Arestas” para criar as arestas que conectam os vértices.
Gerar Arquivos JSON: Após a geração de todas as informações necessárias, clique em “Gerar Arquivos JSON”. Isso transformará os dados gerados em arquivos JSON.
Executar Visualização: Por fim, clique em “Executar Visualização” para gerar o gráfico de alianças e confrontos com os dados gerados e inseridos nos arquivos JSON.

O gráfico é composto por nós e arestas que representam os autores e suas interações, respectivamente.

Nós: Cada autor de uma fala é representado por um círculo preto, chamado de nó.
Arestas: As interações entre os autores são representadas por linhas, chamadas de arestas, que conectam os nós. A presença de uma aresta entre dois nós indica que houve uma troca de falas entre esses autores.
As arestas são coloridas para indicar a natureza da interação:

Vermelho: Se a aresta é vermelha, isso indica que a troca de falas entre os autores foi majoritariamente contra o assunto em discussão.
Verde: Se a aresta é verde, isso sugere que a troca de falas entre os autores foi majoritariamente a favor do assunto em discussão.
Cinza: Se a aresta é cinza, isso significa que a discussão entre os autores foi neutra.
Essa visualização fornece uma representação gráfica intuitiva das interações entre os autores e a natureza de suas discussões.


## Funções de Geração de Dados

### gerarNome()
Gera um nome fictício para um autor. Os nomes são escolhidos aleatoriamente de uma lista predefinida e um sobrenome é gerado como uma sequência de 5 números aleatórios.

### gerarLoremIpsum(min, max)
Gera um trecho de texto "Lorem Ipsum" com um comprimento aleatório dentro do intervalo especificado.

### gerarTopico()
Retorna um tópico global gerado anteriormente.

### gerarData()
Gera uma data aleatória no passado.

### gerarHora()
Gera uma hora aleatória.

### gerarConteudo()
Gera um conteúdo de fala. Há uma chance de 50% de o conteúdo ser a string "Curtiu". Caso contrário, um trecho de "Lorem Ipsum" é gerado.

## Funções de Geração de Entidades

### gerarAutores()
Gera um número especificado de autores. Cada autor tem um ID e um nome gerado pela função `gerarNome()`.

### gerarFalas()
Gera um número especificado de falas. Cada fala tem um ID, data, hora, conteúdo, tópico e autor associados.

### gerarLinks()
Gera um número especificado de links. Cada link tem um destinatário, remetente, posição, espessura e cor associados.

### gerarVertices()
Gera vértices com base nos autores e falas gerados anteriormente.

### gerarArestas()
Gera arestas com base nos autores e links gerados anteriormente.

## Função de Geração de Arquivos

### gerarArquivos()
Gera arquivos JSON para autores, falas, links, vértices e arestas usando a biblioteca FileSaver.js.

## Função de Geração de Gráfico

### gerarGrafico()
Cria uma visualização de dados usando a biblioteca D3.js. A visualização é baseada nos dados gerados pelas funções anteriores.